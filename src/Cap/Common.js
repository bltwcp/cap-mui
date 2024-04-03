import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, Box, Stack, Tooltip, } from '@mui/material';
export const HierarchyItem = (props) => {
    const handleItemHighlight = () => {
        props.onItemClick && props.onItemClick(props.item);
    };
    const handleChecked = (event) => {
        props.onItemSelect && props.onItemSelect(props.item, event.target.checked);
    };
    return (_jsxs("span", { style: {
            backgroundColor: props.backgroundColor,
            height: '31px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            width: '100%',
        }, onClick: handleItemHighlight, children: [_jsx(Checkbox, { checked: props.checked, disabled: props.disabled && props.checked, onChange: handleChecked, sx: {
                    marginLeft: '2px',
                    paddingX: '4px',
                    '& .MuiSvgIcon-root': { fontSize: '16px', },
                }, onClick: (e) => e.stopPropagation() }), _jsx(Tooltip, { title: props.item.text, enterDelay: 300, children: _jsx("span", { style: {
                        fontSize: '13px',
                        fontWeight: props.backgroundColor ? 'bold' : undefined,
                        color: '#039',
                    }, children: props.item.text }) })] }));
};
export const HierarchyBox = (props) => {
    const handleItemHighlight = (item) => {
        props.onItemHighlight && props.onItemHighlight(item);
    };
    const bgColor = (item, index) => {
        if (props.type === 'Item')
            switch (item.status) {
                case 'PENDING':
                    return '#ffff8c';
                case 'NEW':
                    return '#c4f5dd';
                case "PHASE OUT":
                    return '#c9c9c9';
            }
        else {
            let highlight = false;
            if (props.highlight?.id === item.id || props.highlight?.parentHierarchy?.includes(item.id))
                highlight = true;
            else if (index === 0)
                highlight = !props.items.some((item) => item.id === props.highlight?.id || props.highlight?.parentHierarchy?.includes(item.id));
            if (highlight)
                return '#9cf';
        }
    };
    return (_jsx(Box, { sx: { overflowY: 'auto', ...props.sx }, children: _jsx(Stack, { children: props.items.map((item, index) => (_jsx(HierarchyItem, { item: item, checked: props.selected.some((selected) => selected.uid === item.uid), disabled: props.disallowClickOff, backgroundColor: bgColor(item, index), onItemSelect: props.onItemSelect, onItemClick: handleItemHighlight }, `phitem_${item.id}`))) }) }));
};
