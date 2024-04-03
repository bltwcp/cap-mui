import {
    useState, useEffect, useMemo, useCallback,
    forwardRef, useImperativeHandle, Ref, useRef,
} from 'react'
import {
    Box, darken, Menu,
    SxProps, Theme, styled,
} from '@mui/material'

import { Column, Row, useTable, useFlexLayout, useResizeColumns, useSortBy, } from 'react-table'
import { useSticky } from 'react-table-sticky'
import { VariableSizeList, } from 'react-window'
import * as Excel from 'exceljs'
import { nanoid } from 'nanoid'

import { GridRow } from './GridRow'
import { GridTotalPanel } from './GridTotalPanel'
import { GridScrollSnap } from './GridScrollSnap'
import { LoadingTheme } from '../LoadingTheme'
import { DialogColumnSHDialog } from './GridComponent'
import { MenuItem } from '../mui'
import {
    OrderBy, flatten, sortableColumns, genColumns, defaultHeightEstimateFn,
    defaultSortCompareFn, sorter, resizer, fillExcelSheetImp, defaultColumn,
    rowsCheck, addRemoveElement,
} from './utils'
import { defaultValue, triOp, and, conditionValue, } from '../Utils'

export type SortOrder = 'desc' | 'asc' | 'none'

export const gridStyleFactory = (sx: {[key: string]: any}, markedBGColor: string = '#C0FFFF', selectedBGColor: string = '#FFD700'): SxProps<Theme> => {
    const hoverMarkedBGColor = darken(markedBGColor, 0.05)
    const hoverSelectedBGColor = darken(selectedBGColor, 0.05)
    const hoverBGColor = darken('#eee', 0.05)
    let extendSX = {
        '& .marked': { backgroundColor: markedBGColor },
        '& .marked.hovered': { backgroundColor: hoverMarkedBGColor },
        '& .selected': { backgroundColor: selectedBGColor },
        '& .selected.hovered': { backgroundColor: hoverSelectedBGColor },
        '& .hovered': { backgroundColor: hoverBGColor },
        '& .id': { textAlign: 'right', verticalAlign: 'middle', paddingRight: '5px', }
    }

    Object.keys(sx).forEach((key) => {
        const value = sx[key as keyof typeof sx]
        const pureKey = key.replaceAll('&', '').replaceAll('.', '').replaceAll(' ', '')
        extendSX[`& .${pureKey}` as keyof typeof extendSX] = value
        extendSX[`& .${pureKey}.selected` as keyof typeof extendSX] = { ...value, backgroundColor: selectedBGColor }
        extendSX[`& .${pureKey}.selected.hovered` as keyof typeof extendSX] = { ...value, backgroundColor: hoverSelectedBGColor }
        
        if (Object.keys(value).includes('backgroundColor')) {
            const hoverBGColor = darken(value.backgroundColor, 0.05)
            extendSX[`& .${pureKey}.hovered` as keyof typeof extendSX] = { ...value, backgroundColor: hoverBGColor }
        }
    })
    return extendSX
}

export interface GridProps<Type> {
    columns?: Array<Column>
    rows?: Array<Type>
    index?: boolean
    freezeRows?: number
    hierarchyColumns?: string[]
    emptyDisplay?: any
    onHeaderClick?: (field: string) => void
    onCellClick?: (field: string, row: Row, value: any) => void
    cellNameFn?: (field: string, row: any, value: any) => string
    rowHeightEstimateFn?: (index: number, row: any, columnIDs?: string[]) => number
    sx?: SxProps<Theme>
    bottom?: number
    height?: number
    progressSx?: SxProps<Theme>
    detailKey?: string
}

export interface GridRef {
    fillExcelSheet: (sheet: Excel.Worksheet) => void
    hideColumns: (columnIDs: string[]) => void
    showColumns: (columnIDs: string[]) => void
}

const GridBox = styled(Box)`
    width: 100%;
    background-color: #fff;
    & .tr {
        width: max-content;
        min-height: 30px;
        cursor: default;
        &:last-child {
            border-bottom: 0;
        }
    }
    & .td {
        background-color: #fff;
        border-bottom: 1px solid #d6d6d6;
        border-right: 1px solid #d6d6d6;
        padding-left: 4px;
        padding-right: 4px;
        font-size: 13px;
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        &[role=columnheader] {
            font-size: 14px;
        }
    }
    & .thead {
        z-index: 4;
        top: 0;
        width: fit-content;
        position: sticky;
        box-shadow: 0px 3px 3px #ccc;
        & .tr {
            &:first-of-type {
                border-top: 1px solid #d6d6d6;
            }
        }
    }
    & .tbody {
        position: relative;
        z-index: 0;
        box-shadow: 0px 3px 3px #ccc;
    }
    & [data-sticky-td] {
        position: sticky;
    }
    & [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc
    }
`

export const Grid = forwardRef((props: GridProps<any>, ref: Ref<GridRef>) => {
    const theaderRef = useRef<HTMLDivElement>(null)
    const tbodyRef = useRef<HTMLDivElement>(null)
    const tfooterRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<VariableSizeList>(null)
    const [bodyHeight, setBodyHeight] = useState<number>(window.innerHeight)
    const freezedRows = defaultValue(props.freezeRows, 0)

    const {
        columns: propsColumns,
        cellNameFn: propsCellNameFn,
        hierarchyColumns: propsHierarchyColumns,
    } = props
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null)
    const [menuPosition, setMenuPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
    const [displayColumnSHDialog, setDisplayColumnSHDialog] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [expandIDs, setExpandIDs] = useState<number[]>([])
    const [selectedIDs, setSelectedIDs] = useState<Record<string, number[]>>({})
    const [hiddenColumnIDs, setHiddenColumnIDs] = useState<string[]>([])
    const [orderby, setOrderBy] = useState<OrderBy>({ columnId: '', order: 'none' })
    useImperativeHandle(ref, () => ({ fillExcelSheet, hideColumns, showColumns, }))
    const uid = useMemo(() => nanoid(), []) // for uniqe table id in run time
    const flattenColumns = useMemo(() => flatten(propsColumns), [propsColumns])

    const rowHeight = defaultValue(props.height, 38)

    const columns = useMemo(() => {
        return triOp(!rowsCheck(props.rows),
            [],
            genColumns(props, sortableColumns(propsColumns, setOrderBy, orderby), flattenColumns)
        ) as any[]
    }, [flattenColumns, props.rows, props.index, orderby]) // eslint-disable-line react-hooks/exhaustive-deps

    const displayRows = useMemo(() => {
        const propsRows = defaultValue(props.rows, [])
        // handle layer data
        let stackRows = propsRows.filter((row: any) => !row.parentId)
        let newDisplayRows: any[] = []
        while (stackRows.length > 0) {
            const currentRow = stackRows[0]
            const expand = expandIDs.includes(currentRow.id)
            const childRows = propsRows.filter((row: any) => row.parentId === currentRow.id)
                .map((row: any) => ({
                    ...row,
                    __layer: defaultValue(currentRow.__layer, 0) + 1,
                    expand: expand,
                }))
            stackRows = [
                ...triOp(expand, childRows, []),
                ...stackRows.filter((row: any) => row.id !== currentRow.id)
            ]
            newDisplayRows.push({
                ...currentRow,
                __layer: defaultValue(currentRow.__layer, 0),
                __expandable: childRows.length > 0,
                expand: expand,
            })
        }

        // sort
        if (orderby.order !== 'none') {
            const sortFn = columns?.find((column) => defaultValue(column.__originalId, column.id) === orderby.columnId)?.sortFn ?? defaultSortCompareFn
            newDisplayRows.sort((aRow: any, bRow: any) => {
                return sortFn(aRow, bRow, orderby.columnId, orderby.order)
            })
        }

        // re-indexing
        newDisplayRows = newDisplayRows.map((row, index) => ({
            __index: index + 1,
            ...row,
        }))
        return newDisplayRows
    }, [expandIDs, orderby,]) // eslint-disable-line react-hooks/exhaustive-deps

    const { getTableProps, getTableBodyProps, headerGroups, rows, allColumns, prepareRow, } = useTable(
        {
            columns: columns,
            data: displayRows,
            defaultColumn,
            initialState: {
                hiddenColumns: hiddenColumnIDs,
            },
        },
        useFlexLayout,
        useResizeColumns,
        useSticky,
        useSortBy,
    )

    useEffect(() => {
        setHiddenColumnIDs(flattenColumns.filter((col) => col['hidden' as keyof typeof col])
            .map((col) => defaultValue(col.id, col.accessor))
            .filter((id) => and(id !== undefined, typeof id === 'string'))
        )
    }, [flattenColumns])

    useEffect(() => {
        const propsRows = defaultValue(props.rows, []) as any[]
        const handleRowsChange = async () => {
            // get user set expandIDs
            const expandIDs = propsRows.filter((row) => row.expand).map((row) => row.id)
            setExpandIDs(expandIDs)
            setIsLoading(false)
        }

        setIsLoading(true)
        handleRowsChange()
    }, [props.rows])

    const handleScroll = useCallback(() => {
        const x = defaultValue(tbodyRef.current?.scrollLeft, 0)
        const y = 0
        theaderRef.current?.scrollTo(x, y)
    }, [tbodyRef.current, theaderRef.current]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        handleScroll()
        const body = tbodyRef.current
        body?.addEventListener('scroll', handleScroll)
        return () => body?.removeEventListener('scroll', handleScroll)
    }, [handleScroll, tbodyRef.current]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleWindowSizeChange = async () => {
        listRef.current?.resetAfterIndex(0);
        const headerBoundary = theaderRef.current?.getBoundingClientRect()
        const height = triOp(props.height !== undefined,
            (props.height as number) - defaultValue(headerBoundary?.height, 0),
            defaultValue(tfooterRef.current?.getBoundingClientRect()?.top, 0) - defaultValue(headerBoundary?.bottom, 0)
        )
        setBodyHeight(height)
    }

    useEffect(() => {
        defaultValue(
            and(displayRows.length > 0, allColumns.length > 0),
            () => setIsLoading(false),
            () => {}
        )
    }, [displayRows, allColumns]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange)
        return () => window.removeEventListener('resize', handleWindowSizeChange)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        return () => {
            handleWindowSizeChange()
        }
    })

    const fillExcelSheet = (sheet: Excel.Worksheet) => {
        fillExcelSheetImp(sheet, freezedRows,
            headerGroups, allColumns, props
        )
    }

    const handleExpand = (rowID: number) => {
        const newExpandIDs = addRemoveElement(expandIDs, rowID)
        setExpandIDs(newExpandIDs)
    }

    const handleSelect = (rowID: number, key: string) => {
        const { [key]: currentSelection = [] } = selectedIDs
        const updatedSelection = addRemoveElement(currentSelection, rowID)
        setSelectedIDs({
            ...selectedIDs,
            [key]: updatedSelection,
        })
    }

    const cellNameFn = (field: string, row: any, value: any): string => {
        return triOp(field === '__id',
            'id',
            (propsCellNameFn && propsCellNameFn(field, row, value)) || ''
        )
    }

    const hideColumns = (columnIDs: string[]) => {
        allColumns.filter((column) => columnIDs.includes(column.id))
            .forEach((column) => column.toggleHidden(true))
        setHiddenColumnIDs(hiddenColumnIDs.concat(
            columnIDs.filter((id) => allColumns.some((col) => col.id === id))
        ).filter((c, index, cs) => index === cs.indexOf(c)))
    }

    const showColumns = (columnIDs: string[]) => {
        allColumns.filter((column) => columnIDs.includes(column.id))
            .forEach((column) => column.toggleHidden(false))
        setHiddenColumnIDs(hiddenColumnIDs.filter((id) => columnIDs.includes(id)))
    }

    const handleHeaderClick = (column: any) => {
        const field = defaultValue(column['originalId'], column.id)
        const orderMap: Record<string, string> = { asc: 'desc', desc: 'none', none: 'asc' }
        const newOrder = field !== orderby.columnId ? 'asc' : orderMap[orderby.order]
        column.sortable && setOrderBy({ columnId: field, order: newOrder })
        if (props.onHeaderClick) {
            props.onHeaderClick(field)
        }
    }

    const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchorEl(e.currentTarget)
        const elBoundary = e.currentTarget.getBoundingClientRect()
        setMenuPosition({x: e.clientX - elBoundary.x, y: e.clientY - elBoundary.y - elBoundary.height})
    }

    const handleCloseMenu = () => {
        setMenuAnchorEl(null)
    }

    const handleColumnSHDialogOpen = () => {
        setDisplayColumnSHDialog(true)
        handleCloseMenu()
    }

    const handleColumnSHDialogClose = () => {
        setDisplayColumnSHDialog(false)
    }

    const handleColumnShowhideChange = (sh: { [key: number]: boolean }) => {
        let newHiddenColumnIDs = hiddenColumnIDs.map((id) => id)
        for (const index in sh) {
            allColumns[index].toggleHidden(!sh[index])
            const columnID = allColumns[index].id
            newHiddenColumnIDs = addRemoveElement(newHiddenColumnIDs, columnID)
        }
        setHiddenColumnIDs(newHiddenColumnIDs)
    }

    const rowRenderer = ({ index, style }: { index: number, style: any }) => {
        const i = index + freezedRows
        return rowRenderImplement(i, style)
    }

    const expandable = defaultValue(props.hierarchyColumns?.length, 0) > 0
    const rowRenderImplement = (i: number, style?: any) => {
        const row = rows[i]
        prepareRow(row)
        const key = props.detailKey || uid
        return (<GridRow
            key={`${key}_${i}`}
            sx={{ ...style, width: undefined, minHeight: '38px' }}
            rowKey={key}
            row={row}
            selected={selectedIDs[key]?.includes(row.original['id' as keyof typeof row.original])}
            handleCellClick={props.onCellClick}
            cellNameFn={cellNameFn}
            handleExpand={handleExpand}
            handleSelect={handleSelect}
            hierarchyColumns={propsHierarchyColumns}
            expandable={expandable}
        />)
    }

    const rowHeightFn = (index: number): number => {
        const i = index + freezedRows
        const rowHeightFunc = triOp(
            props.rowHeightEstimateFn !== undefined,
            props.rowHeightEstimateFn,
            defaultHeightEstimateFn
        )
        return rowHeightFunc(i, rows[i], allColumns.map((col) => col.id))
    }

    const pointerEvents = triOp(isLoading, 'none', undefined)
    return (<>
        <GridBox
            sx={{
                pointerEvents,
                ...props.sx,
            }}
        >
            <GridScrollSnap tbodyRef={tbodyRef} allColumns={allColumns} />
            <div {...getTableProps()}>
                <div ref={theaderRef}  className='thead' style={{overflow: 'hidden', maxWidth: 'calc( 100% - 18px )', }}>
                    {headerGroups.map(headerGroup => (
                        <div {...headerGroup.getHeaderGroupProps()} className='tr'>
                            {headerGroup.headers.map((column: any) => 
                                <div
                                    className='td'
                                    {...column.getHeaderProps(triOp(column.headerStyle, { style: { ...column.headerStyle, }, }, {}))}
                                    onClick={() => handleHeaderClick(column)}
                                    onContextMenu={(e: React.MouseEvent<HTMLButtonElement>) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        handleOpenMenu(e)
                                    }}
                                    width={column.width}
                                >
                                    {column.render('Header')}
                                    {column.headerContent && column.headerContent()}
                                    {sorter(column)}
                                    {resizer(column)}
                                </div>
                            )}
                        </div>
                    ))}
                    {Array(defaultValue(conditionValue(rows.length > 0, freezedRows), 0)).fill(0).map((_, i) => 
                        rowRenderImplement(i)
                    )}
                </div>
                <div className='tbody' {...getTableBodyProps()}>
                    {triOp(rows.length === 0,
                        (
                            <div className='tr' style={{ height: rowHeight, width: '100%', overflowY: 'scroll', }}>
                                <div className='td'>
                                    {typeof props.emptyDisplay === 'function'
                                        ? props.emptyDisplay()
                                        : <div style={{ margin: '5px' }}>{props.emptyDisplay ?? 'empty'}</div>
                                    }
                                </div>
                            </div>
                        ),
                        (
                            <VariableSizeList
                                ref={listRef}
                                height={bodyHeight}
                                estimatedItemSize={rowHeight}
                                itemSize={rowHeightFn}
                                width='100%'
                                itemCount={rows.length - freezedRows}
                                outerRef={tbodyRef}
                                style={{ overflowY: 'scroll' }}
                            >
                                {rowRenderer}
                            </VariableSizeList>
                        )
                    )}
                    <GridTotalPanel
                        rowKey={props.detailKey || uid}
                        selectedIDs={selectedIDs}
                        setSelectedIDs={setSelectedIDs}
                        rows={rows}
                        allColumns={allColumns}
                    />
                </div>
            </div>
            {!props.height && <div
                className='footer'
                ref={tfooterRef}
                style={{
                    position: 'absolute',
                    bottom: defaultValue(props.bottom, 0),
                }}
            />}
        </GridBox>
        {isLoading && <LoadingTheme />}
        
        {/*header context menu*/}
        <Menu
            id='grid-menu'
            open={Boolean(menuAnchorEl)}
            onClose={handleCloseMenu}
            anchorEl={menuAnchorEl}
            sx={{ position: 'absolute', left: `${menuPosition.x}px`, top: `${menuPosition.y}px`, }}
        >
            <MenuItem onClick={handleColumnSHDialogOpen}>Show/Hide Columns</MenuItem>
        </Menu>

        {/*show/hide columns*/}
        <DialogColumnSHDialog
            columns={allColumns.map((column, index) => {
                const headerStr = defaultValue(column?.Header, '')
                return triOp(
                    props.index !== undefined,
                    `${headerStr} ${defaultValue(flattenColumns[triOp(rows.length > 0, index - 1, index)]?.Header, '')}`.trim(),
                    headerStr.trim()
                )
            })}
            showhides={allColumns.map((column) => column.getToggleHiddenProps().checked)}
            onClose={handleColumnSHDialogClose}
            open={displayColumnSHDialog}
            onComplete={handleColumnShowhideChange}
        />
    </>)
})

export default Grid