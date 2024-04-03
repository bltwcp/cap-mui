import { fireEvent, render, screen, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Autocomplete } from './Autocomplete'

const candidates = ['Albert', 'Alan', 'Bob', 'Kevin', 'Carter', 'Jenifer']

test('normal Autocomplete', () => {
    const mockSelected = jest.fn((value: string[]) => value)
    render(<Autocomplete
        label={'title'}
        options={candidates}
        limitTags={2}
        onChange={(value: string[]) => mockSelected(value)}
    />)

    expect(screen.getByTitle('label')).toHaveTextContent('title')

    // click drop down button
    fireEvent.click(screen.getByTitle('Open'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    
    // click item in the dropdown
    fireEvent.click(screen.getByText('Bob'))
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(mockSelected.mock.calls[mockSelected.mock.calls.length - 1][0][0]).toBe('Bob')

    // click the input
    fireEvent.change(screen.getByRole('combobox'), { target: { value: "a" } })
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getByText('Albert')).toBeInTheDocument()
    expect(screen.getByText('Alan')).toBeInTheDocument()
    expect(screen.getByText('Carter')).toBeInTheDocument()
    expect(screen.queryByText('Kevin')).not.toBeInTheDocument()
    fireEvent.click(screen.getByTitle('Close'))

    // tip test
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    fireEvent.mouseEnter(screen.getByRole('combobox'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByRole('tooltip')).toHaveTextContent('Bob')

    // remove the chip 'Bob'
    fireEvent.click(screen.getByTestId('CancelIcon'))
    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
})