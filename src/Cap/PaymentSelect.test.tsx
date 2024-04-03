import { render, screen, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PaymentSelect } from './PaymentSelect'
import { Report } from '../Components/Report'

test('PaymentSelect', () => {
    render(<Report>
        <PaymentSelect />
    </Report>)
    expect(screen.getByText('ALL')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByRole('button'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    
    expect(screen.getByText('Paid')).toBeInTheDocument()
    expect(screen.getByText('Unpaid')).toBeInTheDocument()
})