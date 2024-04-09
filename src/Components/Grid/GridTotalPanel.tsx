import { useState, useEffect, useMemo } from 'react'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface GridTotalPanelProps {
    rowKey: string
    rows: any[]
    allColumns: any[]
    selectedIDs: Record<string, number[]>
    setSelectedIDs: (value: Record<string, number[]>) => void
}

export const GridTotalPanel = ({ rowKey, rows, allColumns, selectedIDs, setSelectedIDs }: GridTotalPanelProps) => {
    const [selectedRows, setSelectedRows] = useState<number[]>([])
    const [showTotal, setShowTotal] = useState<boolean>(true)

    useEffect(() => {
        const { [rowKey]: ids = [] } = selectedIDs
        const newSelectedRows = rows.filter((row) => ids.includes(row.original.id))
        setSelectedRows(newSelectedRows)
    }, [rowKey, rows, selectedIDs])

    const renderedTotal = useMemo(() => {
        return allColumns
            .filter((column) => column.useTotal && column.isVisible)
            .map((column) => {
                const columnId = column.id
                const columnBackgroundColor = column.headerStyle.backgroundColor
                const columnLabel = column.parent ? column.parent.Header : column.Header
                const totalValue = selectedRows.reduce((acc, cur: any) => {
                    const originValue = (cur.original[columnId] || '').split('\n')[0]
                    const value = parseFloat(originValue.replace(/[^\d.-]/g, '')) || 0
                    return acc + value
                }, 0)
                const formatTotalValue = totalValue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })

                return (
                    <div
                        key={columnId}
                        style={{
                            backgroundColor: columnBackgroundColor,
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '5px 10px',
                            fontSize: 14,
                        }}
                    >
                        <strong>{columnLabel}</strong>
                        <span>{formatTotalValue}</span>
                    </div>
                )
            })
    }, [selectedRows, allColumns])

    const clearSelectedIDs = () => {
        setSelectedIDs({ ...selectedIDs, [rowKey]: [] })
    }

    return selectedRows.length ? (
        <div
            style={{
                backgroundColor: 'white',
                position: 'absolute',
                right: 50,
                bottom: 0,
                borderRadius: 3,
                boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.2)',
            }}
        >
            <div
                style={{
                    cursor: 'default',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    boxShadow: '0px 4px 6px -6px rgba(0, 0, 0, 0.2)',
                }}
                onClick={() => setShowTotal(!showTotal)}
            >
                <strong>Total</strong>
                <IconButton sx={{ padding: 0 }} onClick={clearSelectedIDs}>
                    <CloseIcon sx={{ width: 15, height: 15 }} />
                </IconButton>
            </div>
            <div
                style={{
                    maxHeight: showTotal ? 300 : 0,
                    transition: 'max-height 0.3s',
                    minWidth: 230,
                    overflow: 'auto',
                }}
            >
                {renderedTotal}
            </div>
        </div>
    ) : null
}
