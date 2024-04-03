import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Report from './Report'

test('normal Report component', () => {
    render(<Report
        title='test Report'
    />)

    const titleElement = screen.getByTitle('title')
    expect(titleElement).toBeInTheDocument()
})

test('Report without Title', () => {
    render(<Report />)

    const titleElement = screen.queryByTitle('title')
    expect(titleElement).toBeNull()
})

test('Report with child', () => {
    render(
        <Report
            title='test child'
        >
            <span>child</span>
        </Report>
    )

    const childElement = screen.getByText('child')
    expect(childElement).toBeInTheDocument()
})