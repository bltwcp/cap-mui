import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Checkbox } from './Checkbox';
test('normal Checkbox', () => {
    const mockCheckFn = jest.fn((check) => check);
    const { rerender } = render(_jsx(Checkbox, { label: 'label', onChange: (check) => mockCheckFn(check) }));
    expect(screen.getByText('label')).toBeInTheDocument();
    expect(screen.getByTestId('CheckBoxOutlineBlankIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('CheckBoxIcon')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('label'));
    expect(screen.getByTestId('CheckBoxIcon')).toBeInTheDocument();
    expect(screen.queryByTestId('CheckBoxOutlineBlankIcon')).not.toBeInTheDocument();
    expect(mockCheckFn.mock.calls[mockCheckFn.mock.calls.length - 1][0]).toBe(true);
    rerender(_jsx(Checkbox, { checked: false }));
    expect(screen.getByTestId('CheckBoxOutlineBlankIcon')).toBeInTheDocument();
});
