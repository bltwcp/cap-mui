import { fireEvent, render, screen, waitFor, } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Grid } from './Grid'

test('empty Grid', () => {
    render(<Grid />)
    expect(screen.getAllByRole('table').length).toBe(1)
    expect(screen.getAllByRole('rowgroup').length).toBe(1)
    expect(screen.getByText('empty')).toBeInTheDocument()
})

test('empty Grid with cust EmptyComponent', () => {
    render(<Grid
        emptyDisplay={
            <div data-testid='no-content'>
                Empty
            </div>
        }
    />)
    expect(screen.queryByText('empty')).not.toBeInTheDocument()
    expect(screen.getByTestId('no-content')).toHaveTextContent('Empty')
})

const cols1 = [
    {
        Header: 'title A',
        sticky: 'left',
        accessor: 'a',
    },
    {
        id: 'b',
        Header: 'title B',
        accessor: 'b alias',
    },
    {
        id: 'c',
        Header: 'title C',
        accessor: (row: any) => row.enabled
            ? <span data-testid='ce'>{row.c}</span>
            : <span data-testid='cd'>null</span>
    }
]
const rows1 = [
    {
        id: 1,
        a: 'A1',
        b: 'B origin',
        'b alias': 'B1',
        enabled: true,
        c: 'C1',
    },
    {
        id: 2,
        a: 'A2',
        'b alias': 'B2',
        enabled: false,
        c: 'C2',
    },
]
test('Grid with data', () => {
    render(<Grid
        columns={cols1}
        rows={rows1}
    />)
    const headerCells = screen.getAllByRole('columnheader')
    expect(headerCells.length).toBe(3)
    expect(headerCells[0]).toHaveAttribute('data-sticky-td', 'true')
    expect(screen.getByTestId('ce')).toHaveTextContent('C1')
    expect(screen.getAllByTestId('cd').length).toBe(1)
    expect(screen.getAllByRole('row').length).toBe(3)
    const cells = screen.getAllByRole('cell')
    expect(cells.length).toBe(6)
    expect(cells[0]).toHaveTextContent('A1')
    expect(cells[1]).toHaveTextContent('B1')
})

test('Grid with indexes', () => {
    render(<Grid
        columns={cols1}
        rows={rows1}
        index={true}
    />)
    const headerCells = screen.getAllByRole('columnheader')
    expect(headerCells.length).toBe(8)
    expect(headerCells[1]).toHaveTextContent('title A')
    expect(headerCells[2]).toHaveTextContent('title B')
    expect(headerCells[3]).toHaveTextContent('title C')
    expect(headerCells[5]).toHaveTextContent('A')
    expect(headerCells[6]).toHaveTextContent('B')
    expect(headerCells[7]).toHaveTextContent('C')
    const cells = screen.getAllByRole('cell')
    expect(cells.length).toBe(8)
    expect(cells[0]).toHaveTextContent('1')
    expect(cells[1]).toHaveTextContent('A1')
    expect(cells[2]).toHaveTextContent('B1')
    expect(cells[4]).toHaveTextContent('2')
    expect(cells[5]).toHaveTextContent('A2')
    expect(cells[6]).toHaveTextContent('B2')
})

const cols2 = [
    {
        Header: 'title A',
        sticky: 'left',
        accessor: 'a',
    },
    {
        id: 'b',
        Header: 'title B',
        accessor: 'b alias',
    },
    {
        id: 'c',
        Header: 'title C',
        accessor: (row: any) => row.enabled
            ? <span data-testid='ce'>{row.c}</span>
            : <span data-testid='cd'>null</span>
    }
]
const rows2 = [
    {
        id: 1,
        a: 'A1',
        b: 'B origin',
        'b alias': 'B1',
        enabled: true,
        c: 'C1',
    },
    {
        id: 2,
        parentId: 1,
        a: 'A2',
        'b alias': 'B2',
        enabled: false,
        c: 'C2',
    },
]
test('Grid with hierarchy data', () => {
    render(<Grid
        index={true}
        columns={cols2}
        rows={rows2}
        hierarchyColumns={['a']}
    />)
    expect(screen.getAllByRole('row').length).toBe(3)
    expect(screen.getAllByRole('cell').length).toBe(4)
    expect(screen.getAllByRole('cell')[1]).toHaveTextContent('A1')
    expect(screen.getByTestId('AddIcon')).toBeInTheDocument()
    expect(screen.queryByTestId('RemoveIcon')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('AddIcon'))
    expect(screen.getAllByRole('row').length).toBe(4)
    expect(screen.getAllByRole('cell').length).toBe(8)
    expect(screen.getAllByRole('cell')[5]).toHaveTextContent('A2')
    expect(screen.queryByTestId('AddIcon')).not.toBeInTheDocument()
    expect(screen.getByTestId('RemoveIcon')).toBeInTheDocument()
})

test('show hide dialog', async () => {
    render(<Grid
        columns={cols2}
        rows={rows2}
    />)
    fireEvent.contextMenu(screen.getAllByRole('columnheader')[0])
    expect(screen.getByRole('presentation')).toBeInTheDocument()
    expect(screen.getByRole('menuitem')).toHaveTextContent('Show/Hide Columns')

    fireEvent.click(screen.getByRole('menuitem'))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(3)
    expect(screen.queryAllByTestId('CheckBoxOutlineBlankIcon').length).toBe(0)

    fireEvent.click(screen.getAllByTestId('CheckBoxIcon')[2])
    expect(screen.getAllByTestId('CheckBoxIcon').length).toBe(2)
    expect(screen.getAllByTestId('CheckBoxOutlineBlankIcon').length).toBe(1)

    const okButton = screen.getByText('OK')
    expect(okButton).toHaveStyle('background-color: #5078B3;')
    fireEvent.click(okButton)

    await waitFor(() =>
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument()
    )
    expect(screen.getAllByRole('columnheader').length).toBe(2)
})
