import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { BarsBox, BarsProgress, BarContainerBox, BarBox, } from './mui';
export const Bars = forwardRef((props, ref) => {
    return (_jsxs(BarsBox, { ref: ref, sx: props.sx, "data-testid": 'Bars', children: [props.progressBar && _jsx(BarsProgress, { sx: props.progressSx }), props.children] }));
});
export const Bar = (props) => {
    return (_jsx(BarContainerBox, { children: _jsx(BarBox, { sx: props.sx, "data-testid": 'Bar', children: props.children }) }));
};
export default Bar;
