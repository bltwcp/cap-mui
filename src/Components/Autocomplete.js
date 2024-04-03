import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo, forwardRef, } from 'react';
import { Tooltip, } from '@mui/material';
import { nanoid } from 'nanoid';
import { tipMsg, leadingLabel, defaultValue, triOp, } from './Utils';
import { TextField, StyledMuiAutocomplete, } from './mui';
const DefaultLimitTags = 3;
export const Autocomplete = forwardRef((props, ref) => {
    const defaultValues = defaultValue(props.defaultValues, []);
    const [displayValues, setDisplayValues] = useState(defaultValues);
    const [showTip, setShowTip] = useState(false);
    const uid = useMemo(() => nanoid(), []);
    const handleChange = (event, value) => {
        setDisplayValues(value);
        props.onChange && props.onChange(value);
    };
    const label = defaultValue(props.label, '');
    const limitTags = defaultValue(props.limitTags, DefaultLimitTags);
    const placeholder = triOp(displayValues.length === 0, props.placeholder, '');
    const tooltip = defaultValue(props.tooltip, 'verticle');
    return (_jsxs(_Fragment, { children: [leadingLabel(label), _jsx(StyledMuiAutocomplete, { ref: ref, disabled: props.disabled, multiple: true, limitTags: limitTags, size: 'small', options: props.options, defaultValue: defaultValues, renderInput: (params) => {
                    return (_jsx(Tooltip, { title: tipMsg(displayValues, tooltip, placeholder, `autocomplete_${uid}`), enterDelay: 300, leaveDelay: 200, open: showTip, arrow: true, children: _jsx(TextField, { ...params, placeholder: placeholder, onMouseEnter: () => setShowTip(true), onMouseLeave: () => setShowTip(false), onMouseDown: () => setShowTip(false), sx: props.inputSx }) }));
                }, onChange: handleChange, sx: props.sx })] }));
});
export default Autocomplete;
