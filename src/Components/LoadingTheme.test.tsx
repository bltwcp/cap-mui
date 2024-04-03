import { render, screen, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { LoadingTheme } from './LoadingTheme'

test('LoadingTheme', () => {
    render(<LoadingTheme />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
})