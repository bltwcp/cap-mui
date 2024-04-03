import { render, screen, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Bars, Bar, } from './Bar'

test('normal Bars', () => {
    render(
        <Bars>
            <Bar>
                <span>a</span>
            </Bar>
        </Bars>
    )
    expect(screen.getByTestId('Bars')).toBeInTheDocument()
    expect(screen.getByTestId('Bar')).toBeInTheDocument()
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
})

test('Bars with progress', () => {
    render(
        <Bars
            progressBar={true}
        >
            <Bar>
                <span>a</span>
            </Bar>
        </Bars>
    )
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
})