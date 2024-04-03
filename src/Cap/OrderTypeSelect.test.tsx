import { render, screen, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { OrderTypeSelect } from './OrderTypeSelect'
import { Report } from '../Components/Report'

test('OrderTypeSelect', () => {
    render(<Report>
        <OrderTypeSelect />
    </Report>)
    expect(screen.getByText('ALL')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByRole('button'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    
    expect(screen.getByText('All (Merchandise)')).toBeInTheDocument()
    expect(screen.getByText('REPLENISHMENT')).toBeInTheDocument()
    expect(screen.getByText('FIRST ORDER')).toBeInTheDocument()
    expect(screen.getByText('SAMPLE')).toBeInTheDocument()
    expect(screen.getByText('OTHERS')).toBeInTheDocument()
    expect(screen.getByText('TRADING')).toBeInTheDocument()
    expect(screen.getByText('TS ORDER')).toBeInTheDocument()
    expect(screen.getByText('LIF ORDER')).toBeInTheDocument()
    expect(screen.getByText('SUPPLY')).toBeInTheDocument()
    expect(screen.getByText('EXPENSE')).toBeInTheDocument()
    expect(screen.getByText('MANUFACTURING')).toBeInTheDocument()
    expect(screen.getByText('TRANSFER')).toBeInTheDocument()
})