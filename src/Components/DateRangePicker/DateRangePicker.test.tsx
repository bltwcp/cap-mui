import { fireEvent, render, screen, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { DateRangePicker } from './DateRangePicker'
import { DateFormat } from '../../Cap/Utils'

test('DateRangePicker in Date', () => {
    render(<DateRangePicker
        label='title'
        periods={['Date', 'Week', 'Month', 'Quarter', 'Year']}
        defaultPeriod='Date'
        startYear={2000}
    />)

    expect(screen.getAllByTitle('label').length).toBe(3)
    expect(screen.getAllByTitle('label')[0]).toHaveTextContent('title:')
    
    const today = new Date();
    const dateInputs = screen.getAllByPlaceholderText('mm/dd/yyyy')
    expect(dateInputs.length).toBe(2)
    expect(dateInputs[0]).toHaveValue(DateFormat(today))
    expect(dateInputs[1]).toHaveValue(DateFormat(today))
})

test('DateRangePicker in Week', () => {
    render(<DateRangePicker
        periods={['Week']}
        defaultPeriod='Week'
        startYear={2020}
    />)

    const today = new Date()
    let feb1 = new Date(today.getFullYear(), 1, 1)
    let yearFirstDay = new Date(today.getFullYear(), 1, 1)
    yearFirstDay.setDate(yearFirstDay.getDate() - (feb1.getDay() + 1) % 7)
    if (today < yearFirstDay) {
        feb1.setFullYear(feb1.getFullYear() - 1)
        yearFirstDay = new Date(today.getFullYear(), 1, 1)
        yearFirstDay.setDate(yearFirstDay.getDate() - (feb1.getDay() + 1) % 7)
    }
    const timeDiff = today.getTime() - yearFirstDay.getTime()
    const weekNo = Math.ceil(timeDiff/(1000*60*60*24*7))
    const selectButtons = screen.getAllByRole('button')
    expect(selectButtons.length).toBe(5)
    expect(selectButtons[1]).toHaveTextContent(feb1.getFullYear().toString())
    expect(selectButtons[2]).toHaveTextContent(weekNo.toString())
    expect(selectButtons[3]).toHaveTextContent(feb1.getFullYear().toString())
    expect(selectButtons[4]).toHaveTextContent(weekNo.toString())

    fireEvent.mouseDown(selectButtons[1])
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    const yearOptions = screen.getAllByRole('option')
    expect(yearOptions.length).toBe(today.getFullYear() - 2020 + 2)
    expect(yearOptions[yearOptions.length - 1]).toHaveTextContent('2020')

    fireEvent.mouseDown(selectButtons[2])
    const weekOptions = screen.getAllByRole('option')
    expect(weekOptions.length).toBe(53)
})

test('DateRangePicker in Month', () => {
    const mockRangeChange = jest.fn((from: string, to: string) => ({from, to}))
    render(<DateRangePicker
        periods={['Month']}
        defaultPeriod='Month'
        startYear={2020}
        onRangeChange={(from: string, to: string) => mockRangeChange(from, to)}
    />)

    const today = new Date()
    const selectButtons = screen.getAllByRole('button')
    expect(selectButtons[2]).toHaveTextContent((today.getMonth() + 1).toString())

    fireEvent.mouseDown(selectButtons[2])
    expect(screen.getAllByRole('option').length).toBe(12)
    fireEvent.click(screen.getAllByRole('option')[3])
    fireEvent.mouseDown(selectButtons[4])
    fireEvent.click(screen.getAllByRole('option')[9])
    expect(selectButtons[2]).toHaveTextContent('4')
    expect(selectButtons[4]).toHaveTextContent('10')

    fireEvent.mouseDown(selectButtons[4])
    fireEvent.click(screen.getAllByRole('option')[2])
    expect(selectButtons[2]).toHaveTextContent('3')
    expect(selectButtons[4]).toHaveTextContent('3')

    fireEvent.mouseDown(selectButtons[2])
    fireEvent.click(screen.getAllByRole('option')[4])
    expect(selectButtons[2]).toHaveTextContent('5')
    expect(selectButtons[4]).toHaveTextContent('5')

    const lastMockResult = mockRangeChange.mock.calls[mockRangeChange.mock.calls.length - 1]
    expect(lastMockResult[0]).toBe(`${today.getFullYear()}M05`)
})

test('DateRangePicker in Quarter', () => {
    render(<DateRangePicker
        periods={['Quarter']}
        startYear={2020}
    />)

    const today = new Date()
    const selectButtons = screen.getAllByRole('button')
    expect(selectButtons[2]).toHaveTextContent(Math.ceil((today.getMonth() + 1) / 3).toString())
    
    fireEvent.mouseDown(selectButtons[2])
    expect(screen.getAllByRole('option').length).toBe(4)
})

test('DateRangePicker in Year', () => {
    render(<DateRangePicker
        periods={['Year']}
        startYear={2020}
    />)

    const selectButtons = screen.getAllByRole('button')
    expect(selectButtons.length).toBe(3)
})