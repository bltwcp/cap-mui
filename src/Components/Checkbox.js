import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, forwardRef, } from 'react';
import { StyledMuiCheckbox, FormControlLabel, } from './mui';
import { defaultValue } from './Utils';
export const Checkbox = forwardRef((props, ref) => {
    const [checked, setChecked] = useState(defaultValue(props.checked, props.defaultChecked, false));
    const handleChecked = (event, check) => {
        setChecked(event.target.checked);
        props.onChange && props.onChange(event.target.checked);
    };
    useEffect(() => {
        if (props.checked !== undefined)
            setChecked(props.checked);
    }, [props.checked]);
    const label = defaultValue(props.label, '');
    return (_jsx(FormControlLabel, { label: label, labelPlacement: props.labelPlacement, control: _jsx(StyledMuiCheckbox, { inputRef: ref, checked: checked, onChange: handleChecked, sx: props.sx }), disabled: props.disabled }));
});
export default Checkbox;
