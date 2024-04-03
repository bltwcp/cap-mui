import { createElement as _createElement } from "react";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IconButton, } from '../mui';
export const GridCell = (props) => {
    const classNames = () => {
        const propsCellName = props.cellNameFn ? props.cellNameFn(props.cell.column.id, props.cell.row, props.cell.value) : '';
        const marked = props.marked ? 'marked' : '';
        const selected = props.selected ? 'selected' : '';
        const hovered = props.hovered ? 'hovered' : '';
        return `${propsCellName} ${marked} ${selected} ${hovered} td`.replaceAll('  ', ' ').trim();
    };
    const prefix = () => {
        if (props.layer !== undefined) {
            const sx = { marginLeft: `${props.layer * 15}px`, };
            if (props.isParent) {
                if (props.isExpand)
                    return _jsx(IconButton, { sx: sx, onClick: () => props.handleExpand(), children: _jsx(RemoveIcon, {}) });
                return _jsx(IconButton, { sx: sx, onClick: () => props.handleExpand(), children: _jsx(AddIcon, {}) });
            }
            return _jsx(IconButton, { sx: sx });
        }
        return _jsx(_Fragment, {});
    };
    return (_createElement("div", { ...props.cell.getCellProps({
            className: classNames()
        }), key: `${props.cell.column.id}_${props.cell.row.index}`, onClick: () => {
            props.handleCellClick && props.handleCellClick(props.cell.column.id, props.cell.row, props.cell.value);
        }, onDoubleClick: () => {
            props.handleSelect();
        }, onMouseEnter: () => {
            props.handleMouseHover(true);
        }, onMouseLeave: () => {
            props.handleMouseHover(false);
        } },
        _jsxs("div", { children: [prefix(), props.cell.render('Cell')] })));
};
GridCell.defaultProps = {
    selected: false,
    hover: false,
};
