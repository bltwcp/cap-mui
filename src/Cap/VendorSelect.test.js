import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, } from '@testing-library/react';
import '@testing-library/jest-dom';
import { VendorSelect } from './VendorSelect';
import { Report } from '../Components/Report';
test('VendorSelect', () => {
    render(_jsx(Report, { children: _jsx(VendorSelect, { pHierarchies: [], agents: [], orderTypes: [], payments: [] }) }));
    expect(screen.getByText('ALL')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByRole('button'));
    expect(screen.getByRole('presentation')).toBeInTheDocument();
});
