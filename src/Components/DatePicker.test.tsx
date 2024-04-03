import { render, screen, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DatePicker } from './DatePicker'

test('normal DatePicker', () => {
    const mockDatePick = jest.fn((date: Date) => date)
    render(<DatePicker
        value={new Date(1989, 5, 4)}
        onChange={mockDatePick}
    />)
    const input = screen.getByPlaceholderText('mm/dd/yyyy')
    expect(input).toHaveValue(`06/04/1989`)

    fireEvent.click(screen.getByTestId('CalendarIcon'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    const dateButtons = screen.getAllByRole('gridcell')
    const day30 = dateButtons.find(button => button.textContent === '30')
    expect(day30).toBeInTheDocument()
    fireEvent.click(day30 as HTMLElement)
    expect(input).toHaveValue(`06/30/1989`)
    expect(mockDatePick.mock.calls[mockDatePick.mock.calls.length - 1][0]).toStrictEqual(new Date(1989, 5, 30))
    fireEvent.change(input, { target: { value: `01/01/2000` } })
    expect(input).toHaveValue(`01/01/2000`)
    expect(mockDatePick.mock.calls[mockDatePick.mock.calls.length - 1][0]).toStrictEqual(new Date(2000, 0, 1))
})