import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor, } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextInput, { IntValidator } from './TextInput';
test('empty/disabled TextInput', () => {
    const disabledValue = 'none';
    const placeholder = 'empty';
    const { rerender } = render(_jsx(TextInput, { disabled: true, valueAtDisabled: disabledValue, placeholder: placeholder }));
    expect(screen.queryByTitle('label')).toBeNull();
    expect(screen.getByDisplayValue(disabledValue)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    expect(screen.getByDisplayValue(disabledValue)).toBeDisabled();
    rerender(_jsx(TextInput, { disabled: false, valueAtDisabled: disabledValue, placeholder: placeholder }));
    expect(screen.getByDisplayValue(disabledValue)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    expect(screen.getByDisplayValue(disabledValue)).toBeEnabled();
});
test('normal TextInput', () => {
    const title = 'string Input';
    const defaultValue = 'default';
    const placeholder = 'placeholder';
    const mockCallback = jest.fn((v) => v);
    render(_jsx(TextInput, { label: title, value: defaultValue, placeholder: placeholder, onChange: (v) => v && mockCallback(v) }));
    const label = screen.getByTitle('label');
    expect(label).toBeInTheDocument();
    expect(label.textContent).toBe(`${title}:`);
    const display = screen.getByPlaceholderText(placeholder);
    expect(display).toBeInTheDocument();
    fireEvent.change(display, { target: { value: 'modified' } });
    expect(display).toHaveValue('modified');
    expect(mockCallback.mock.calls[mockCallback.mock.calls.length - 1][0]).toBe('modified');
});
test('TextInput validator test', () => {
    const placeholder = 'placeholder';
    render(_jsx(TextInput, { value: 'asdf', validator: IntValidator, placeholder: placeholder }));
    const display = screen.getByPlaceholderText(placeholder);
    expect(display).toBeInvalid();
    fireEvent.change(display, { target: { value: '123' } });
    expect(display).toBeValid();
});
test('TextInput tooltip', async () => {
    const placeholder = 'placeholder';
    const value = 'value';
    const mockTooltipGen = jest.fn((v) => v);
    render(_jsx(TextInput, { value: value, placeholder: placeholder, tooltipFn: (v) => mockTooltipGen(v) }));
    fireEvent.mouseEnter(screen.getByPlaceholderText(placeholder));
    expect(mockTooltipGen.mock.calls.length).toBe(1);
    await screen.findByRole('tooltip');
    expect(screen.getByRole('tooltip').textContent).toBe(value);
    fireEvent.mouseLeave(screen.getByPlaceholderText(placeholder));
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());
});