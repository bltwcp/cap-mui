import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, } from 'react';
import { ThemeProvider, Paper, } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mainTheme, reportTheme, } from './theme';
import { FullWidthBox, FullScreenBox, Typography, } from './mui';
const queryClient = new QueryClient();
const titleRow = (title, titleSx) => {
    if (title && title.length > 0)
        return (_jsx(FullWidthBox, { children: _jsx(Typography, { variant: 'h1', title: 'title', sx: titleSx, children: title }) }));
};
const body = (children, bodySx) => {
    return (_jsx(Paper, { sx: bodySx, children: _jsx(ThemeProvider, { theme: mainTheme, children: children }) }));
};
export const Report = forwardRef((props, ref) => {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(ThemeProvider, { theme: reportTheme, children: _jsxs(FullScreenBox, { ref: ref, children: [titleRow(props.title, props.titleSx), body(props.children, props.bodySx)] }) }) }));
});
export default Report;
