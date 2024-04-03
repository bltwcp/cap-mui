import { memo, useState, useEffect, forwardRef, Ref, } from 'react'
import { GridProps, GridRef, Grid } from './Grid'
import { SxProps, Theme } from '@mui/material'

import { deepCompare } from '../Utils'

const MemoGrid = memo(Grid)
const DefaultIndex = false
const DefaultFreezeRows = 0

export const MemorizedGrid = forwardRef((props: GridProps<any>, ref: Ref<GridRef>) => {
    const [memoColumns, setMemoColumns] = useState<any[]>(props.columns ?? [])
    const [memoRows, setMemoRows] = useState<any[]>(props.rows ?? [])
    const [memoSx, setMemoSx] = useState<SxProps<Theme>>(props.sx ?? {})
    const [memoBottom, setMemoBottom] = useState<number>(props.bottom ?? 0)
    const [memoProgressSx, setMemoProgressSx] = useState<SxProps<Theme>>(props.progressSx ?? {})
    const [memoIndex, setMemoIndex] = useState<boolean>(props.index ?? DefaultIndex)
    const [memoFreezeRows, setMemoFreezeRows] = useState<number>(props.freezeRows ?? DefaultFreezeRows)
    const [memoHierarchyColumns, setMemoHierarchyColumns] = useState<string[]>(props.hierarchyColumns ?? [])
    const [memoEmptyDisplay, setMemoEmptyDisplay] = useState<any>(props.emptyDisplay)

    useEffect(() => {
        if (props.columns && !deepCompare(props.columns, memoColumns))
            setMemoColumns(props.columns)
    }, [props.columns]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.rows && JSON.stringify(props.rows) !== JSON.stringify(memoRows))
            setMemoRows(props.rows)
    }, [props.rows]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.sx && JSON.stringify(props.sx) !== JSON.stringify(memoSx))
            setMemoSx(props.sx)
    }, [props.sx]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.bottom && props.bottom !== memoBottom)
            setMemoBottom(props.bottom)
    }, [props.bottom]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.progressSx && JSON.stringify(props.progressSx) !== JSON.stringify(memoProgressSx))
            setMemoProgressSx(props.progressSx)
    }, [props.progressSx]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        const newIndex = props.index === undefined ? DefaultIndex : props.index
        if (newIndex !== memoIndex)
            setMemoIndex(newIndex)
    }, [props.index]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        const newFreezeRows = props.freezeRows === undefined ? DefaultFreezeRows : props.freezeRows
        if (newFreezeRows !== memoFreezeRows)
            setMemoFreezeRows(newFreezeRows)
    }, [props.freezeRows]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.hierarchyColumns && JSON.stringify(props.hierarchyColumns) !== JSON.stringify(memoHierarchyColumns))
            setMemoHierarchyColumns(props.hierarchyColumns)
    }, [props.hierarchyColumns]) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.emptyDisplay && memoEmptyDisplay !== props.emptyDisplay && JSON.stringify(memoEmptyDisplay) !== JSON.stringify(props.emptyDisplay))
            setMemoEmptyDisplay(props.emptyDisplay)
    }, [props.emptyDisplay]) // eslint-disable-line react-hooks/exhaustive-deps

    return (<MemoGrid
        {...props}
        sx={memoSx}
        bottom={memoBottom}
        progressSx={memoProgressSx}
        columns={memoColumns}
        rows={memoRows}
        index={memoIndex}
        freezeRows={memoFreezeRows}
        emptyDisplay={memoEmptyDisplay}
        hierarchyColumns={memoHierarchyColumns}
    />)
})
