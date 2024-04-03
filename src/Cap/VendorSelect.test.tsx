import { render, screen, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { VendorSelect } from './VendorSelect'
import { Report } from '../Components/Report'

test('VendorSelect', () => {
    render(<Report>
        <VendorSelect
            pHierarchies={[]}
            agents={[]}
            orderTypes={[]}
            payments={[]}
        />
    </Report>)
    expect(screen.getByText('ALL')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByRole('button'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()
})

// Vendor list is complicated, stop testing here