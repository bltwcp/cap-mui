import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Column, HeaderGroup, ColumnInstance } from 'react-table'
import * as Excel from 'exceljs'

import { GridProps, SortOrder } from './Grid'
import { colourToARGB, gridMaxWidth, defaultValue } from '../Utils'

const DefaultWidth = 150
export const defaultColumn = {
  minWidth: 1,
  width: DefaultWidth,
  maxWidth: 1000,
}

export function flatten(input: Column[] | undefined, flat: Column[] = []): Column[] {
  if (!input) return []

  flat.push(
    ...input.reduce(
      (accu: Column[], current) =>
        Array.isArray(current['columns' as keyof Column])
          ? flatten(current['columns' as keyof Column] as Column[], accu)
          : accu.concat(current),
      []
    )
  )
  return flat
}

export const alphabeticIndex = (index: number): string => {
  const remain = ((index - 1) % 26) + 1
  const alphabetic = String.fromCharCode(remain + 64)
  const div = Math.floor((index - 1) / 26)
  return div > 0 ? `${alphabeticIndex(div)}${alphabetic}` : alphabetic
}

export const resizer = (column: any) => {
  if (
    column.canResize &&
    column.resizable &&
    (!column.headers || (column.headers?.length > 0 && column.headers[0].id !== '__id'))
  ) {
    const resizerProps = column.getResizerProps()
    resizerProps.style = {
      ...resizerProps.style,
      position: 'absolute',
      right: 0,
      top: 0,
      height: '100%',
      width: '4px',
    }
    return <div {...resizerProps} />
  }
}

export const sorter = (column: any) => {
  if (column.sortable) {
    const ascending = column.__isSortedDesc === 'asc'
    const descending = column.__isSortedDesc === 'desc'
    const showArrow = ascending || descending
    return showArrow && (
      <>
        <span
          style={{ overflow: 'clip', position: 'absolute', right: '5px', top: '0px', width: '15px', height: '19px' }}
        >
          <ArrowDropUpIcon
            sx={{
              color: ascending ? '#000' : '#999',
              fontSize: '24px',
              transform: 'translate(-5px, 3px)',
              cursor: 'pointer',
            }}
            onClick={(e) => {
                e.stopPropagation()
                column.orderbyFn('asc')
            }}
          />
        </span>
        <span
          style={{ overflow: 'clip', position: 'absolute', right: '5px', top: '20px', width: '15px', height: '19px' }}
        >
          <ArrowDropDownIcon
            sx={{
              color: descending ? '#000' : '#999',
              fontSize: '24px',
              transform: 'translate(-5px, -8px)',
              cursor: 'pointer',
            }}
            onClick={(e) => {
                e.stopPropagation()
                column.orderbyFn('desc')
            }}
          />
        </span>
      </>
    )
  }
  return <></>
}

const layered = (element: any, width: number, layer: number = 0): any => {
  return element && element[0].columns
    ? {
        Header: ' ',
        id: `__colIndex_id_${layer}`,
        columns: [layered(element[0].columns, width, layer + 1)],
      }
    : {
        Header: ' ',
        id: '__index',
        accessor: '__index',
        width,
      }
}

export type OrderBy = {
  columnId: string
  order: string
}

const orderByFn = (newOrderBy: any, originalOrderBy: any, setOrderBy: (value: OrderBy) => void) => {
  if (newOrderBy.columnId === originalOrderBy.columnId && newOrderBy.order === originalOrderBy.order)
    setOrderBy({ columnId: '', order: 'none' })
  else setOrderBy(newOrderBy)
}

export const sortableColumns = (
  columns: any[] | undefined,
  setOrderBy: (value: OrderBy) => void,
  orderby: any
): any[] => {
  if (!columns) return []

  const extendColumnFn = (allColumns: any) => {
    return allColumns.map((column: any) => {
      if (column.columns)
        return {
          ...column,
          columns: extendColumnFn(column.columns),
        }
      else if (column.sortable)
        return {
          ...column,
          orderbyFn: (orderType: SortOrder) =>
            orderByFn({ columnId: column.__originalId ?? column.id, order: orderType }, orderby, setOrderBy),
          __isSortedDesc: orderby.columnId === column.id ? orderby.order : 'none',
        }
      else return column
    })
  }

  const extendColumns = extendColumnFn(columns)
  return extendColumns
}

const indexingColumns = (columns: any[] | undefined, flattenColumns: any[], rootRowCount: number = 0): any[] => {
  if (flattenColumns.length === 0) return []

  const extendColumns =
    columns?.map((column) => {
      const isSticky = column.sticky === 'left'
      let columns = column.columns
        ? indexingColumns(column.columns as any[], flattenColumns)
        : [
            {
              ...column,
              Header: alphabeticIndex(flattenColumns.indexOf(column.id ?? column.accessor) + 1),
              headerStyle: {
                ...column.headerStyle,
                textAlign: 'center',
              },
              headerContent: undefined,
              sticky: undefined,
              // sortable: undefined,
              sortFn: undefined,
              orderbyFn: undefined,
              __isSortedDesc: undefined,
            },
          ]
      return column.columns
        ? {
            ...column,
            headerStyle: {
              ...column.headerStyle,
              minHeight: '38px'
            },
            columns,
          }
        : {
            Header: column.Header,
            id: `__colIndex_${alphabeticIndex(flattenColumns.indexOf(column.id ?? column.accessor) + 1)}`,
            __originalId: column.id,
            headerStyle: {
              ...column.headerStyle,
              minHeight: '38px'
            },
            headerContent: column.headerContent,
            resizable: column.resizable,
            columns,
            sticky: isSticky ? 'left' : undefined,
            ...(column.sortable && {
              sortable: column.sortable,
              sortFn: column.sortFn,
              orderbyFn: column.orderbyFn,
              __isSortedDesc: column.__isSortedDesc,
            }),
          }
    }) ?? []
  return rootRowCount > 0
    ? [
        {
          Header: ' ',
          id: '__colIndex_id',
          columns: [layered(columns, Math.max(40, gridMaxWidth(`${rootRowCount}`, '', []) + 5))],
          sticky: 'left',
        },
        ...extendColumns,
      ]
    : extendColumns
}

export const genColumns = (props: GridProps<any>, newColumns: any[], flattenColumns: Column<{}>[]) => {
  const flattenColumnIDs = flattenColumns.map((col) => col.id ?? col.accessor)
  const newNewColumns = newColumns.map((col) => ({ ...col, headerStyle: { ...col.headerStyle, minHeight: '38px' } }))
  return props.index ? indexingColumns(newColumns, flattenColumnIDs, props.rows?.length) : newNewColumns
}

export const defaultHeightEstimateFn = (index: number, row: any, columnIDs?: string[]): number => {
  let maxN =
    columnIDs
      ?.map((colID) => {
        if (typeof row.original[colID] === 'string') return row.original[colID].split('\n')?.length ?? 0
        return 0
      })
      ?.reduce((accu, curr) => (accu < curr ? curr : accu), 0) ?? 0
  switch (maxN) {
    case 0:
    case 1:
      return 38
    case 2:
      return 46
    default:
      return 4 + 19.5 * maxN
  }
}

export const defaultSortCompareFn = (aObject: any, bObject: any, field: string, sortOrder: SortOrder) => {
  const order = sortOrder === 'asc' ? 1 : -1
  switch (typeof aObject[field]) {
    case 'number':
      return order * (aObject[field] - bObject[field])
    case 'string':
      return order * (aObject[field] < bObject[field] ? -1 : 1)
  }
  return 0
}

export const rowsCheck = (rows: any[] | undefined): boolean => {
  const propsRows = defaultValue(rows, []) as any[]
  // id / accessor check
  const rowIDs = propsRows.map((row) => defaultValue(row.id, row.accessor))
  if (rowIDs.filter((id) => typeof id !== 'string' || typeof id !== 'number').length !== propsRows.length) {
    console.error('some rows did not contain id field')
    console.log(rows, rowIDs)
    return false
  }

  // duplicate IDs
  const duplicatedIDs = rowIDs.filter((id, index, ids) => index !== ids.indexOf(id))
  if (duplicatedIDs.length > 0) {
    console.error(`Grid.tsx checker: duplicate id ${duplicatedIDs} in rows`)
    return false
  }
  return true
}

export const addRemoveElement = (array: any[], element: any): any[] => {
  const index = array.indexOf(element)
  if (index < 0) return array.concat(element)
  const newArray = array.map((id) => id)
  newArray.splice(index, 1)
  return newArray
}

export const cellNameFn = (
  propsCellNameFn: (field: string, row: any, value: any) => string,
  field: string,
  row: any,
  value: any
): string => {
  if (field === '__id') return 'id'
  return propsCellNameFn(field, row, value)
}

const cellBGStyle = (backgroundColor: string): Excel.Fill => {
  return {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: colourToARGB(backgroundColor) },
    bgColor: { argb: 'FF000000' },
  }
}

const cellFontStyle = (currentStyle: Partial<Excel.Font>, fontStyle?: string, fontWeight?: string, color?: string) => {
  let cellStyle = currentStyle
  if (fontStyle === 'italic') cellStyle = { ...cellStyle, italic: true }
  if (fontWeight === 'bold') cellStyle = { ...cellStyle, bold: true }
  if (color) cellStyle = { ...cellStyle, color: { argb: colourToARGB(color) } }
  return cellStyle
}

const cellAlignStyle = (currentAlign: Partial<Excel.Alignment>, textAlign: string): Partial<Excel.Alignment> => {
  const ok = ['left', 'center', 'right', 'fill', 'justify', 'centerContinuous', 'distributed'].includes(textAlign)
  const align = ok
    ? (textAlign as 'left' | 'center' | 'right' | 'fill' | 'justify' | 'centerContinuous' | 'distributed')
    : 'left'
  return {
    ...currentAlign,
    wrapText: true,
    horizontal: align,
  }
}

const fillCellStyle = (cell: Excel.Cell, cellStyle: any) => {
  if (cellStyle === undefined) return
  if (cellStyle['backgroundColor']) cell.fill = cellBGStyle(cellStyle['backgroundColor'])
  cell.font = cellFontStyle(cell.font, cellStyle['fontStyle'], cellStyle['fontWeight'], cellStyle['color'])
  cell.alignment = cellAlignStyle(cell.alignment, cellStyle['textAlign'] ?? 'left')
}

type CellType = string | number | undefined
export const fillExcelSheetImp = (
  sheet: Excel.Worksheet,
  freezeRows: number,
  headerGroups: HeaderGroup<object>[],
  allColumns: ColumnInstance<object>[],
  props: any
) => {
  const { rows, hierarchyColumns, cellNameFn, sx } = props
  const columnLength = (columns: any[] | undefined): number => {
    return columns ? columns.reduce((accu, curr) => accu + columnLength(curr.columns), 0) : 1
  }
  const isVisibleColumns = allColumns.filter((column) => column.isVisible)

  let freezeCols = 0
  headerGroups.forEach((headerGroup, index) => {
    const rowIndex = index + 1
    const headerRow = sheet.getRow(rowIndex)
    let colIndex = 1
    let rowValues: string[] = []
    let mergeCells: { sr: number; sc: number; er: number; ec: number }[] = []
    headerGroup.headers.forEach((header: any) => {
      if (header.columns) {
        const cellSpan = columnLength(header.columns)
        rowValues.push(header.Header?.toString() ?? '', ...Array(cellSpan - 1).fill(''))
        mergeCells.push({ sr: rowIndex, sc: colIndex, er: rowIndex, ec: colIndex + cellSpan - 1 })
        colIndex += cellSpan
      } else {
        rowValues.push(header.Header?.toString() ?? '')
        ++colIndex
      }

      if (header['sticky' as keyof typeof headerGroup] === 'left') freezeCols += columnLength(header.columns)
    })
    headerRow.values = rowValues
    mergeCells.forEach((mergeCell) => sheet.mergeCells(mergeCell.sr, mergeCell.sc, mergeCell.er, mergeCell.ec))

    colIndex = 1
    headerGroup.headers.forEach((header: any) => {
      fillCellStyle(headerRow.getCell(colIndex), header['headerStyle'])
      colIndex += columnLength(header.columns)
    })
  })
  sheet.views = [
    {
      state: 'frozen',
      ySplit: headerGroups.length + freezeRows,
      xSplit: freezeCols,
    },
  ]

  isVisibleColumns.forEach((column: any, colIndex) => {
    const sheetColumn = sheet.getColumn(colIndex + 1)
    sheetColumn.numFmt = column.numFmt
    sheetColumn.width =
      (typeof column.width === 'string' ? parseInt(column.width) : column.width ?? DefaultWidth) * 0.13
  })

  let currentRow = headerGroups.length + 1
  let treeMap: { [key: number]: number } = {}
  rows?.forEach((data: any, rowIndex: number) => {
    const layer = data.parentId ? treeMap[data.parentId] + 1 : 0
    treeMap[data.id] = layer

    const excelRow = sheet.getRow(currentRow + rowIndex)
    const dataRow = isVisibleColumns.map((column: any) => {
      if (column.id === '__index') return rowIndex + 1
      if (hierarchyColumns && hierarchyColumns.includes(column.id))
        return `${'　'.repeat(layer)}${data[column.id as keyof typeof data]}`
      if (column.numFmt) {
        const rawValue = data[column.id as keyof typeof data];
        if (typeof rawValue === 'string') {
            const value = Number(rawValue.replace(/[^\d.-]/g, ''));
            const multiplier = column.numFmt === `#,##0.00%` ? 0.01 : 1;
            return !isNaN(value) ? value * multiplier : rawValue;
        }
      }
      return data[column.id as keyof typeof data] as CellType
    })
    excelRow.values = dataRow

    // styles,
    // set style after values are set
    // exceljs set value will replace all styles to default (null)
    isVisibleColumns.forEach((column, colIndex) => {
      if (cellNameFn && sx) {
        const value = data[column.id as keyof typeof data] as CellType
        const cellStyleName = cellNameFn(column.id ?? '', data, value) || ''
        fillCellStyle(excelRow.getCell(1 + colIndex), sx[`& .${cellStyleName}`])
      }
    })
  })
}
