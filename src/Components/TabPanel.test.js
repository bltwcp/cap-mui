import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen, } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TabPanels } from './TabPanel';
test('TabPanels with none mode', () => {
    render(_jsxs(TabPanels, { currentTab: 1, hideMethod: 'none', children: [_jsx("div", { children: "content 1" }), _jsx("div", { children: "content 2" })] }));
    expect(screen.queryByText('content 1')).not.toBeInTheDocument();
    expect(screen.getByText('content 2')).toBeInTheDocument();
});
test('TabPaenls with nodisplay mode', () => {
    render(_jsxs(TabPanels, { currentTab: 1, hideMethod: 'nodisplay', children: [_jsx("div", { children: "content 1" }), _jsx("div", { children: "content 2" })] }));
    expect(screen.getByText('content 1')).toBeInTheDocument();
    expect(screen.getByText('content 2')).toBeInTheDocument();
});
test('TabPanels with default hide mode', () => {
    render(_jsxs(TabPanels, { currentTab: 1, children: [_jsx("div", { children: "content 1" }), _jsx("div", { children: "content 2" })] }));
    expect(screen.getByText('content 1')).toBeInTheDocument();
    expect(screen.getByText('content 2')).toBeInTheDocument();
});
