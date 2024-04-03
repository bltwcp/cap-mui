import { useMemo, useCallback } from 'react'
import { IconButton } from '@mui/material'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

interface GridScrollProps {
    tbodyRef: React.RefObject<any>
    allColumns: any[]
}

export const GridScrollSnap = ({ tbodyRef, allColumns }: GridScrollProps) => {
    const firstPeriodColumns = useMemo(() => {
        return allColumns.filter((column) => column.index === 0)
    }, [allColumns])

    const scrollStep = useMemo(() => {
        return firstPeriodColumns.reduce((acc, column) => acc + (column.width || 0), 0)
    }, [firstPeriodColumns])

    const handleScroll = useCallback(
        (direction: 'left' | 'right') => {
            if (tbodyRef.current) {
                const remainder = tbodyRef.current.scrollLeft % scrollStep
                const newScrollLeft =
                    direction === 'left'
                        ? tbodyRef.current.scrollLeft - scrollStep + (remainder > 0 ? scrollStep - remainder : 0)
                        : tbodyRef.current.scrollLeft + scrollStep - remainder

                tbodyRef.current.scrollTo({
                    left: newScrollLeft,
                    behavior: 'smooth',
                })
            }
        },
        [scrollStep, tbodyRef]
    )

    return (
        <div
            style={{
                textAlign: 'right',
                transform: 'translateY(-26px)',
                height: 0,
            }}
        >
            <IconButton sx={{ padding: 0 }} onClick={() => handleScroll('left')}>
                <ArrowLeftIcon fontSize="small" />
            </IconButton>
            <IconButton sx={{ padding: 0 }} onClick={() => handleScroll('right')}>
                <ArrowRightIcon fontSize="small" />
            </IconButton>
        </div>
    )
}
