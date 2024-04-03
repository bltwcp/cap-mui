import { render, screen, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Tabs } from './Tab'

test('normal Tabs', () => {
    const mockTabChangeEvent = jest.fn((index: number) => index)
    render(<Tabs
        tabs={['tab a', 'tab b']}
        currentTab={1}
        onTabChange={mockTabChangeEvent}
    />)

    expect(screen.getByText('tab a')).toBeInTheDocument()
    expect(screen.getByText('tab b')).toBeInTheDocument()

    fireEvent.click(screen.getByText('tab a'))
    expect(mockTabChangeEvent.mock.calls[mockTabChangeEvent.mock.calls.length - 1][0]).toBe(0)
})

test('closeabled Tabs', () => {
    const mockTabChange = jest.fn((index: number) => index)
    render(<Tabs
        currentTab={2}
        tabs={['tab a', 'tab b', 'tab c']}
        freezeTabs={2}
        onTabChange={mockTabChange}
    />)

    const closeIcons = screen.getAllByTestId('CloseIcon')
    expect(closeIcons.length).toBe(1)
    fireEvent.click(screen.getByTestId('CloseIcon'))
    expect(screen.getByText('tab a')).toBeInTheDocument()
    expect(screen.queryByText('tab c')).not.toBeInTheDocument()
    expect(mockTabChange.mock.calls.length).toBe(3)
    expect(mockTabChange.mock.calls[mockTabChange.mock.calls.length - 1][0]).toBe(1)
})

test('user handle closeabled Tabs', () => {
    const mockTabClose = jest.fn((index: number) => index)
    render(<Tabs
        tabs={['tab a', 'tab b', 'tab c']}
        freezeTabs={2}
        onTabClose={mockTabClose}
    />)
    fireEvent.click(screen.getByTestId('CloseIcon'))
    expect(mockTabClose.mock.calls.length).toBe(1)
})