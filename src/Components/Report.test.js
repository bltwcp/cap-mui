import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Report from './Report';
test('normal Report component', () => {
    render(_jsx(Report, { title: 'test Report' }));
    const titleElement = screen.getByTitle('title');
    expect(titleElement).toBeInTheDocument();
});
test('Report without Title', () => {
    render(_jsx(Report, {}));
    const titleElement = screen.queryByTitle('title');
    expect(titleElement).toBeNull();
});
test('Report with child', () => {
    render(_jsx(Report, { title: 'test child', children: _jsx("span", { children: "child" }) }));
    const childElement = screen.getByText('child');
    expect(childElement).toBeInTheDocument();
});
