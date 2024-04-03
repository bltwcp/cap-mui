import { render, screen, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BOLStageSelect } from './BOLStageSelect'
import { Report } from '../Components/Report'

test('BOLStageSelect', () => {
    render(<Report>
        <BOLStageSelect />
    </Report>)
    expect(screen.getByText('ALL')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByRole('button'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getByText('Processing')).toBeInTheDocument()
    expect(screen.getByText('Importing')).toBeInTheDocument()
    expect(screen.getByText('Receiving')).toBeInTheDocument()
    expect(screen.getByText('AP Review')).toBeInTheDocument()
    expect(screen.getByText('Complete')).toBeInTheDocument()
})