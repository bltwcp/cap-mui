import { render, screen, fireEvent, waitFor, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PortSelect } from './PortSelect'
import { Report } from '../Components/Report'

test('PortSelect', async () => {
    render(<Report>
        <PortSelect />
    </Report>)
    expect(screen.getByText('ALL')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByRole('button'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()

    await waitFor(() =>
        expect(screen.getAllByTestId('CheckBoxOutlineBlankIcon').length).toBeGreaterThan(0)
    )
    expect(screen.getByText('XINGANG')).toBeInTheDocument()
})
