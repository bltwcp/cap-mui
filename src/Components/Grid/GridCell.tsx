import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { Row, Cell, } from 'react-table'

import { IconButton, } from '../mui'

interface GridCellProps {
    cell: Cell
    marked: boolean
    selected: boolean
    hovered: boolean
    cellNameFn?: (field: string, row: Row, value: any) => string
    handleCellClick?: (field: string, row: Row, value: any) => void
    handleSelect: () => void
    handleMouseHover: (inside: boolean) => void

    handleExpand: () => void
    layer?: number
    isParent?: boolean
    isExpand?: boolean
}

export const GridCell = (props: GridCellProps) => {
    const classNames = () => {
        const propsCellName = props.cellNameFn ? props.cellNameFn(props.cell.column.id, props.cell.row, props.cell.value) : ''
        const marked = props.marked ? 'marked' : ''
        const selected = props.selected ? 'selected' : ''
        const hovered = props.hovered ? 'hovered' : ''
        return `${propsCellName} ${marked} ${selected} ${hovered} td`.replaceAll('  ', ' ').trim()
    }

    const prefix = () => {
        if (props.layer !== undefined) {
            const sx = { marginLeft: `${props.layer * 15}px`, }
            if (props.isParent) {
                if (props.isExpand)
                    return <IconButton sx={sx} onClick={() => props.handleExpand()}>
                        <RemoveIcon />
                    </IconButton>
                return <IconButton sx={sx} onClick={() => props.handleExpand()}>
                    <AddIcon />
                </IconButton>
            }
            return <IconButton sx={sx} />
        }
        return <></>
    }

    return (<div
        {...props.cell.getCellProps({
            className: classNames()
        })}
        key={`${props.cell.column.id}_${props.cell.row.index}`}
        onClick={() => {
            props.handleCellClick && props.handleCellClick(props.cell.column.id, props.cell.row, props.cell.value)
        }}
        onDoubleClick={() => {
            props.handleSelect()
        }}
        onMouseEnter={() => {
            props.handleMouseHover(true)
        }}
        onMouseLeave={() => {
            props.handleMouseHover(false)
        }}
    >
        <div>
            {prefix()}
            {props.cell.render('Cell')}
        </div>
    </div>)
}

GridCell.defaultProps = {
    selected: false,
    hover: false,
}
