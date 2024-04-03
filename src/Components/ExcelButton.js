import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, } from 'react';
import { IconButton } from './mui';
import { defaultValue } from './Utils';
const IconSrc = `${process.env.PUBLIC_URL}/excel.png`;
const DefaultWidth = '26px';
const DefaultHeight = '26px';
const Alert = 'Excel';
export const ExcelButton = forwardRef((props, ref) => {
    const width = defaultValue(props.imageWidth, DefaultWidth);
    const height = defaultValue(props.imageHeight, DefaultHeight);
    return (_jsx(IconButton, { disabled: props.disabled, startIcon: _jsx("img", { src: IconSrc, width: width, height: height, alt: Alert }), onClick: props.onClick, sx: props.sx }));
});
export default ExcelButton;
