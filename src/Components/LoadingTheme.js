import { jsx as _jsx } from "react/jsx-runtime";
import { CircularProgress, } from '@mui/material';
import { FullScreenBox } from './mui';
const FreezeSX = {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#7775',
    top: 0,
};
const progressSx = {
    position: 'relative',
    left: 'calc( 50% - 20px )',
    top: 'calc( 50% - 20px )',
};
export const LoadingTheme = () => {
    return (_jsx(FullScreenBox, { sx: FreezeSX, children: _jsx(CircularProgress, { sx: progressSx }) }));
};
