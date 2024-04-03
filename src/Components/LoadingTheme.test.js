import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingTheme } from './LoadingTheme';
test('LoadingTheme', () => {
    render(_jsx(LoadingTheme, {}));
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
