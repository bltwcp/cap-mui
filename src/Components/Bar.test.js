import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Bars, Bar, } from './Bar';
test('normal Bars', () => {
    render(_jsx(Bars, { children: _jsx(Bar, { children: _jsx("span", { children: "a" }) }) }));
    expect(screen.getByTestId('Bars')).toBeInTheDocument();
    expect(screen.getByTestId('Bar')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
test('Bars with progress', () => {
    render(_jsx(Bars, { progressBar: true, children: _jsx(Bar, { children: _jsx("span", { children: "a" }) }) }));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
