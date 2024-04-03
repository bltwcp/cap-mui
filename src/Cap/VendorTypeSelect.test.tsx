import { render, screen, fireEvent, waitFor, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { VendorTypeSelect } from './VendorTypeSelect'
import { Report } from '../Components/Report'

test('VendorTypeSelect', async () => {
    render(<Report>
        <VendorTypeSelect />
    </Report>)
    expect(screen.getByText('ALL')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByRole('button'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()

    await waitFor(() => 
        expect(screen.getAllByTestId('CheckBoxOutlineBlankIcon').length).toBeGreaterThan(0)
    )
    expect(screen.getByText('Merchandise')).toBeInTheDocument()
})
