import { render, screen, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { ExcelButton } from './ExcelButton'

test('normal ExcelButton', () => {
    const mockClick = jest.fn(() => { })
    render(
        <ExcelButton
            onClick={() => mockClick()}
        />
    )

    const excelButton = screen.getByAltText('Excel')
    expect(excelButton).toBeInTheDocument()
    fireEvent.click(excelButton)
    expect(mockClick.mock.calls.length).toBe(1)
})
