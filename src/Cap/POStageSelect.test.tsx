import { render, screen, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { POStageSelect } from './POStageSelect'
import { Report } from '../Components/Report'

test('POStageSelect', () => {
    render(<Report>
        <POStageSelect />
    </Report>)
    expect(screen.getByText('ALL')).toBeInTheDocument()

    fireEvent.mouseDown(screen.getByRole('button'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    
    expect(screen.getByText('Draft')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
    expect(screen.getByText('Working')).toBeInTheDocument()
})
