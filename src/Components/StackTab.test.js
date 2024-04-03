import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen, fireEvent, } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StackTabs } from './StackTab';
test('no child StackTabs', () => {
    const tabs = ['tab a', 'tab b'];
    render(_jsx(StackTabs, { tabs: tabs }));
    const displayBoxes = screen.getAllByTestId('stackTab');
    displayBoxes.forEach((displayBox) => {
        expect(displayBox).toBeEmptyDOMElement();
    });
});
test('normal StackTabs', () => {
    const tabs = ['tab a', 'tab b', 'tab c'];
    const mockTabChangeEvent = jest.fn((tab) => tab);
    render(_jsxs(StackTabs, { initialTab: 1, tabs: tabs, onTabChange: (tab) => mockTabChangeEvent(tab), children: [_jsx("span", { children: "content a" }), _jsx("span", { children: "content b" }), _jsx("span", { children: "content c" })] }));
    expect(screen.getByText('tab a')).toBeInTheDocument();
    expect(screen.getByText('tab b')).toBeInTheDocument();
    expect(screen.getByText('tab c')).toBeInTheDocument();
    expect(screen.getByText('content b')).toBeInTheDocument();
    expect(screen.queryByText('content c')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('tab c'));
    expect(screen.queryByText('content b')).not.toBeInTheDocument();
    expect(screen.getByText('content c')).toBeInTheDocument();
    expect(mockTabChangeEvent.mock.calls[mockTabChangeEvent.mock.calls.length - 1][0]).toBe(2);
});
test('StackTabs with nodisplay', () => {
    const tabs = ['tab a', 'tab b', 'tab c'];
    render(_jsxs(StackTabs, { tabs: tabs, currentTab: 2, hideMethod: 'nodisplay', children: [_jsx("span", { children: "content a" }), _jsx("span", { children: "content b" }), _jsx("span", { children: "content c" })] }));
    expect(screen.getByText('content c')).toBeInTheDocument();
    expect(screen.getByText('content a')).toBeInTheDocument();
    const displayBoxes = screen.getAllByTestId('stackTab');
    expect(displayBoxes[0]).toHaveStyle('display: none');
    expect(displayBoxes[2]).toHaveStyle('display: block');
});
test('StackTabs with hide', () => {
    const tabs = ['tab a', 'tab b', 'tab c'];
    render(_jsxs(StackTabs, { tabs: tabs, hideMethod: 'hide', children: [_jsx("span", { children: "content a" }), _jsx("span", { children: "content b" }), _jsx("span", { children: "content c" })] }));
    expect(screen.getByText('content a')).toBeInTheDocument();
    expect(screen.getByText('content c')).toBeInTheDocument();
    fireEvent.click(screen.getByText('tab c'));
    expect(screen.getByText('content a')).toBeInTheDocument();
    expect(screen.getByText('content c')).toBeInTheDocument();
    const displayBoxes = screen.getAllByTestId('stackTab');
    expect(displayBoxes[0]).toHaveStyle('height: 0px');
    expect(displayBoxes[0]).toHaveStyle('overflow: hidden');
});
