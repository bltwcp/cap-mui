import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export const GridTotalPanel = ({ rowKey, rows, allColumns, selectedIDs, setSelectedIDs }) => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [showTotal, setShowTotal] = useState(true);
    useEffect(() => {
        const { [rowKey]: ids = [] } = selectedIDs;
        const newSelectedRows = rows.filter((row) => ids.includes(row.original.id));
        setSelectedRows(newSelectedRows);
    }, [rowKey, rows, selectedIDs]);
    const renderedTotal = useMemo(() => {
        return allColumns
            .filter((column) => column.useTotal && column.isVisible)
            .map((column) => {
            const columnId = column.id;
            const columnBackgroundColor = column.headerStyle.backgroundColor;
            const columnLabel = column.parent ? column.parent.Header : column.Header;
            const totalValue = selectedRows.reduce((acc, cur) => {
                const originValue = cur.original[columnId];
                const value = parseFloat(originValue?.replace(/[^\d.-]/g, '')) || 0;
                return acc + Math.floor(value * 100) / 100;
            }, 0);
            const formatTotalValue = totalValue.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
            return (_jsxs("div", { style: {
                    backgroundColor: columnBackgroundColor,
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px 10px',
                    fontSize: 14,
                }, children: [_jsx("strong", { children: columnLabel }), _jsx("span", { children: formatTotalValue })] }, columnId));
        });
    }, [selectedRows, allColumns]);
    const clearSelectedIDs = () => {
        setSelectedIDs({ ...selectedIDs, [rowKey]: [] });
    };
    return selectedRows.length ? (_jsxs("div", { style: {
            backgroundColor: 'white',
            position: 'absolute',
            right: 50,
            bottom: 0,
            borderRadius: 3,
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.2)',
        }, children: [_jsxs("div", { style: {
                    cursor: 'default',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    boxShadow: '0px 4px 6px -6px rgba(0, 0, 0, 0.2)',
                }, onClick: () => setShowTotal(!showTotal), children: [_jsx("strong", { children: "Total" }), _jsx(IconButton, { sx: { padding: 0 }, onClick: clearSelectedIDs, children: _jsx(CloseIcon, { sx: { width: 15, height: 15 } }) })] }), _jsx("div", { style: {
                    maxHeight: showTotal ? 300 : 0,
                    transition: 'max-height 0.3s',
                    minWidth: 230,
                    overflow: 'auto',
                }, children: renderedTotal })] })) : null;
};
