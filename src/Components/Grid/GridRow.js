import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { useState, } from 'react';
import { GridCell, } from './GridCell';
export const GridRow = (props) => {
    const [hovered, setHovered] = useState(false);
    const handleMouseHover = (inside) => setHovered(inside);
    const handleSelect = () => props.handleSelect(props.row.original['id'], props.rowKey);
    const handleExpand = () => props.handleExpand(props.row.original['id']);
    return (_createElement("div", { className: 'tr', ...props.row.getRowProps({ style: props.sx }), key: `${props.row.index}` }, props.row.cells.map((cell, i) => {
        const key = `${props.rowKey}_${i}`;
        const layer = props.hierarchyColumns?.includes(cell.column.id)
            ? props.row.original['__layer']
            : undefined;
        const isParent = props.row.original['__expandable'];
        const isExpand = props.row.original['expand'];
        return _jsx(GridCell, { cell: cell, marked: props.row.original['marked'], selected: props.selected, hovered: hovered, handleCellClick: props.handleCellClick, handleSelect: handleSelect, handleMouseHover: handleMouseHover, cellNameFn: props.cellNameFn, layer: layer, isParent: isParent, isExpand: isExpand, handleExpand: handleExpand }, key);
    })));
};
