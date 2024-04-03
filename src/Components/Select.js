import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, forwardRef, } from 'react';
import { ListItemText, Tooltip, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MenuItem, FormControl, StyledMuiSelect, InputLabel, IconButton, } from './mui';
import { leadingLabel, defaultValue, } from './Utils';
const tooltipMsg = (tipStr, enabled, custTooltipFun) => {
    if (enabled)
        return defaultValue(custTooltipFun && custTooltipFun(tipStr), tipStr);
    return '';
};
export const Select = forwardRef((props, ref) => {
    const { disabled, onChange } = props;
    const [value, setValue] = useState(defaultValue(props.value, props.initialSelected, ''));
    const [displayValue, setDisplayValue] = useState('');
    const [showTip, setShowTip] = useState(false);
    const [inSelect, setInSelect] = useState(false);
    const selectedAtDisabled = defaultValue(props.selectedAtDisabled, '');
    const inputLabelColor = defaultValue(props.placeholderColor, 'black');
    const placeholder = defaultValue(props.placeholder, '');
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    useEffect(() => {
        onChange && onChange(displayValue);
    }, [displayValue]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        const display = disabled ? selectedAtDisabled : value;
        if (display !== displayValue)
            setDisplayValue(display);
    }, [disabled, value]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.value && props.value !== value) {
            setValue(props.value);
        }
    }, [props.value]); // eslint-disable-line react-hooks/exhaustive-deps
    return (_jsxs("span", { ref: ref, children: [leadingLabel(props.label ?? ''), _jsxs(FormControl, { children: [_jsx(InputLabel, { sx: {
                            color: inputLabelColor,
                        }, children: placeholder }, `${props.label}-label`), _jsx(Tooltip, { enterDelay: 300, leaveDelay: 200, title: tooltipMsg(displayValue, props.tooltip, props.tooltipFn), open: showTip, arrow: true, children: _jsx(StyledMuiSelect, { value: displayValue, onChange: handleChange, disabled: disabled, endAdornment: props.clearable && (_jsx(IconButton, { role: 'close', onClick: () => setValue(defaultValue(props.value, props.initialSelected, '')), disabled: disabled, children: _jsx(CloseIcon, {}) })), sx: props.sx, onMouseEnter: () => setShowTip(!inSelect), onMouseLeave: () => setShowTip(false), onMouseDown: () => setShowTip(false), onOpen: () => setInSelect(true), onClose: () => setInSelect(false), children: props.menuItems && props.menuItems.map((item) => (_jsx(MenuItem, { value: item, sx: props.menuItemSx, children: _jsx(ListItemText, { primary: item }) }, `${props.label}-item-${item}`))) }, `${props.label}-select`) }, `${props.label}-tooltip`)] })] }));
});
export default Select;
