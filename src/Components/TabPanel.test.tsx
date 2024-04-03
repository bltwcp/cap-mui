import { render, screen, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { TabPanels } from './TabPanel'

test('TabPanels with none mode', () => {
    render(<TabPanels
        currentTab={1}
        hideMethod='none'
    >
        <div>content 1</div>
        <div>content 2</div>
    </TabPanels>)

    expect(screen.queryByText('content 1')).not.toBeInTheDocument()
    expect(screen.getByText('content 2')).toBeInTheDocument()
})

test('TabPaenls with nodisplay mode', () => {
    render(<TabPanels
        currentTab={1}
        hideMethod='nodisplay'
    >
        <div>content 1</div>
        <div>content 2</div>
    </TabPanels>)

    expect(screen.getByText('content 1')).toBeInTheDocument()
    expect(screen.getByText('content 2')).toBeInTheDocument()
})

test('TabPanels with default hide mode', () => {
    render(<TabPanels
        currentTab={1}
    >
        <div>content 1</div>
        <div>content 2</div>
    </TabPanels>)

    expect(screen.getByText('content 1')).toBeInTheDocument()
    expect(screen.getByText('content 2')).toBeInTheDocument()
})