import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, } from '@testing-library/react';
import '@testing-library/jest-dom';
import Select from './Select';
test('empty Select', () => {
    render(_jsx(Select, {}));
    const labelElement = screen.queryByTitle('label');
    expect(labelElement).toBeNull();
    const selectElement = screen.getByRole('button');
    expect(selectElement).toBeInTheDocument();
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('button'));
    expect(screen.getByRole('presentation')).toBeInTheDocument();
});
test('disabled Select', () => {
    const { rerender } = render(_jsx(Select, { menuItems: ['a', 'b', 'c'], disabled: true, selectedAtDisabled: 'a' }));
    expect(screen.getByText('a')).toBeInTheDocument();
    rerender(_jsx(Select, { menuItems: ['a', 'b', 'c'], disabled: false, selectedAtDisabled: 'a', value: 'c' }));
    expect(screen.queryByText('a')).not.toBeInTheDocument();
    expect(screen.getByText('c')).toBeInTheDocument();
});
test('normal Select', () => {
    const label = 'select label';
    const mockCallback = jest.fn((v) => v);
    render(_jsx(Select, { label: label, tooltip: true, menuItems: ['a', 'b', 'c'], placeholderColor: 'grey', onChange: (v) => {
            if (v)
                mockCallback(v);
        } }));
    const labelElement = screen.queryByTitle('label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toBeVisible();
    expect(labelElement?.textContent).toBe(`${label}:`);
    expect(screen.queryByText('None')).not.toBeInTheDocument();
    const selectButton = screen.getByRole('button');
    fireEvent.mouseEnter(selectButton);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    fireEvent.mouseLeave(selectButton);
    fireEvent.mouseDown(selectButton);
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    fireEvent.click(screen.getByText('b'));
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    expect(mockCallback.mock.calls.length).toBe(1);
    fireEvent.mouseEnter(selectButton);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip.textContent).toBe('b');
});
