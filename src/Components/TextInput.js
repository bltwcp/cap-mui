import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, forwardRef, } from 'react';
import { Tooltip, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { leadingLabel } from './Utils';
import { Input, FormControl, IconButton, } from './mui';
export const IntValidator = (value) => /^-?\d+$/.test(value);
export const NumberValidator = (value) => /^-?\d+([.]\d*)?$/.test(value);
export const TextInput = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value ?? '');
    useEffect(() => {
        const display = (props.disabled ? props.valueAtDisabled : props.value) ?? value;
        if (display !== value)
            setValue(display);
    }, [props.value, props.disabled]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.onChange)
            props.onChange(value);
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps
    const handleInputFieldChange = (event) => {
        setValue(event.target.value);
    };
    const isValid = (props.validator && props.validator(value)) ?? true;
    return (_jsxs("span", { ref: ref, children: [leadingLabel(props.label ?? ''), _jsx(Tooltip, { title: (props.tooltipFn && props.tooltipFn(value)) ?? '', enterDelay: 300, leaveDelay: 200, arrow: true, children: _jsx(FormControl, { error: !isValid, variant: 'standard', children: _jsx(Input, { value: value, placeholder: props.placeholder, onChange: handleInputFieldChange, disabled: props.disabled, endAdornment: props.clearable && (_jsx(IconButton, { role: 'open', onClick: () => setValue(''), disabled: props.disabled, children: _jsx(CloseIcon, {}) })), sx: props.sx }) }) })] }));
});
export default TextInput;
