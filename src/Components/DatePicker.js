import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, forwardRef, } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { DatePickerBox, } from './mui';
import { defaultValue } from './Utils';
export const DatePicker = forwardRef((props, ref) => {
    const [date, setDate] = useState(defaultValue(props.value, props.initialValue, new Date()));
    const handleDateChange = (v) => {
        if (v && props.onChange) {
            setDate(v);
            props.onChange(v);
        }
    };
    useEffect(() => {
        if (props.value)
            setDate(props.value);
    }, [props.value]);
    return (_jsx("span", { style: { display: 'inline-block', }, children: _jsx(LocalizationProvider, { dateAdapter: AdapterDateFns, children: _jsx(MuiDatePicker, { inputRef: ref, disabled: props.disabled, value: date, onChange: handleDateChange, renderInput: ({ inputRef, inputProps, InputProps }) => (_jsxs(DatePickerBox, { sx: props.sx, children: [_jsx("input", { ref: inputRef, ...inputProps }), InputProps?.endAdornment] })) }) }) }));
});
export default DatePicker;
