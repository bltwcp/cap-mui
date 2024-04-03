import { render, screen, fireEvent, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MultiSelect, HierarchySelectItem, } from './MultiSelect'

test('normal MultiSelect', () => {
    render(<MultiSelect
        label='title'
        menuItems={['a', 'b', 'c']}
        value={['a']}
        placeholder='QQ'
        abbr='...'
    />)

    expect(screen.getByText('title:')).toBeInTheDocument()
    expect(screen.getByText('QQ')).toBeInTheDocument()
})

test('MultiSelect tooltip test', () => {
    render(<MultiSelect
        label='title'
        menuItems={['a', 'b', 'c']}
        value={['a']}
        placeholder='QQ'
        abbr='...'
        tooltip='verticle'
    />)

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    fireEvent.mouseEnter(screen.getByRole('button'))
    expect(screen.getByRole('tooltip')).toBeInTheDocument()
    expect(screen.getByRole('tooltip')).toHaveTextContent('a')
    fireEvent.mouseDown(screen.getByRole('button'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
})

test('MultiSelect event test', () => {
    const mockSelectedFn = jest.fn((values: string[]) => values)
    render(<MultiSelect
        label='title'
        menuItems={['a', 'b', 'c']}
        value={['a']}
        placeholder='QQ'
        abbr='...'
        onChange={(v: string[]) => mockSelectedFn}
    />)

    fireEvent.mouseDown(screen.getByRole('button'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    fireEvent.click(screen.getByText('b'))
    fireEvent.keyDown(screen.getByRole('presentation'), { key: "Escape" })
    expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
    expect(screen.getByText('a,b')).toBeInTheDocument()
    expect(screen.getByRole('button')).toContainHTML(`<span>a,b</span>`)
})

test('MultiSelect with hierarchy options', () => {
    const hierarchyItems: HierarchySelectItem[] = [
        {
            name: 'root',
            expand: true,
        },
        {
            name: 'item 1',
            parent: 'root',
            expand: false,
        },
        {
            name: 'item 1-1',
            parent: 'item 1',
        },
        {
            name: 'item 1-2',
            parent: 'item 1',
        },
        {
            name: 'item 2',
            parent: 'root',
        },
    ]
    render(<MultiSelect
        menuItems={hierarchyItems}
    />)

    // expand test
    fireEvent.mouseDown(screen.getByRole('button'))
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getByText('root')).toBeInTheDocument()
    expect(screen.getByText('item 1')).toBeInTheDocument()
    expect(screen.queryByText('item 1-1')).not.toBeInTheDocument()
    expect(screen.getByText('item 2')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('AddIcon'))
    expect(screen.getByText('item 1-1')).toBeInTheDocument()

    // select test
    fireEvent.click(screen.getByText('root'))
    expect(screen.queryByTestId('CheckBoxOutlineBlankIcon')).not.toBeInTheDocument()

    // shrinkage test
    fireEvent.click(screen.getAllByTestId('RemoveIcon')[0])
    expect(screen.queryByText('item 1')).not.toBeInTheDocument()
    expect(screen.queryByText('item 2')).not.toBeInTheDocument()

    // input box display
    fireEvent.keyDown(screen.getByRole('presentation'), { key: "Escape" })
    expect(screen.getByText('1 selected')).toBeInTheDocument()

    // clear all
    fireEvent.mouseEnter(screen.getByText('1 selected'))
    fireEvent.click(screen.getByTestId('CloseIcon'))
    expect(screen.queryByText('1 selected')).not.toBeInTheDocument()
})