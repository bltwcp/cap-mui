import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useCallback } from 'react';
import { IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
export const GridScrollSnap = ({ tbodyRef, allColumns }) => {
    const firstPeriodColumns = useMemo(() => {
        return allColumns.filter((column) => column.index === 0);
    }, [allColumns]);
    const scrollStep = useMemo(() => {
        return firstPeriodColumns.reduce((acc, column) => acc + (column.width || 0), 0);
    }, [firstPeriodColumns]);
    const handleScroll = useCallback((direction) => {
        if (tbodyRef.current) {
            const remainder = tbodyRef.current.scrollLeft % scrollStep;
            const newScrollLeft = direction === 'left'
                ? tbodyRef.current.scrollLeft - scrollStep + (remainder > 0 ? scrollStep - remainder : 0)
                : tbodyRef.current.scrollLeft + scrollStep - remainder;
            tbodyRef.current.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth',
            });
        }
    }, [scrollStep, tbodyRef]);
    return (_jsxs("div", { style: {
            textAlign: 'right',
            transform: 'translateY(-26px)',
            height: 0,
        }, children: [_jsx(IconButton, { sx: { padding: 0 }, onClick: () => handleScroll('left'), children: _jsx(ArrowLeftIcon, { fontSize: "small" }) }), _jsx(IconButton, { sx: { padding: 0 }, onClick: () => handleScroll('right'), children: _jsx(ArrowRightIcon, { fontSize: "small" }) })] }));
};
