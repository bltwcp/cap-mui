import { useState, } from 'react'
import { Row, } from 'react-table'
import { GridCell, } from './GridCell'

interface GridRowProps {
    rowKey: string
    row: Row
    sx?: any
    hierarchyColumns?: string[]
    expandable: boolean
    selected: boolean
    cellNameFn?: (field: string, row: Row, value: any) => string
    handleCellClick?: (field: string, row: Row, value: any) => void
    handleExpand: (rowID: number) => void
    handleSelect: (rowID: number, key: string) => void
}

export const GridRow = (props: GridRowProps) => {
    const [hovered, setHovered] = useState<boolean>(false)

    const handleMouseHover = (inside: boolean) => setHovered(inside)
    const handleSelect = () => props.handleSelect(props.row.original['id' as keyof typeof props.row.original], props.rowKey)
    const handleExpand = () => props.handleExpand(props.row.original['id' as keyof typeof props.row.original])

    return (<div className='tr'
        {...props.row.getRowProps({ style: props.sx })}
        key={`${props.row.index}`}
    >
        {props.row.cells.map((cell, i) => {
            const key = `${props.rowKey}_${i}`
            const layer = props.hierarchyColumns?.includes(cell.column.id)
                ? props.row.original['__layer' as keyof typeof props.row.original]
                : undefined
            const isParent = props.row.original['__expandable' as keyof typeof props.row.original]
            const isExpand = props.row.original['expand' as keyof typeof props.row.original]
            return <GridCell
                key={key}
                cell={cell}
                marked={props.row.original['marked' as keyof typeof props.row.original]}
                selected={props.selected}
                hovered={hovered}
                handleCellClick={props.handleCellClick}
                handleSelect={handleSelect}
                handleMouseHover={handleMouseHover}
                cellNameFn={props.cellNameFn}
                layer={layer}
                isParent={isParent}
                isExpand={isExpand}
                handleExpand={handleExpand}
            />
        })}
    </div>)
}
