import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor, } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VendorAgentSelect } from './VendorAgentSelect';
import { Report } from '../Components/Report';
test('VendorAgentSelect', async () => {
    render(_jsx(Report, { children: _jsx(VendorAgentSelect, {}) }));
    expect(screen.getByText('ALL')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('button'));
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    await waitFor(() => expect(screen.getAllByTestId('CheckBoxOutlineBlankIcon').length).toBeGreaterThan(0));
    expect(screen.getByText('TJCP')).toBeInTheDocument();
});
