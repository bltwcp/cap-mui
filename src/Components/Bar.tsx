import { forwardRef, Ref } from 'react'
import { SxProps, Theme } from '@mui/material'

import { BarsBox, BarsProgress, BarContainerBox, BarBox, } from './mui'

export interface BarsProps {
    children?: React.ReactNode
    progressBar?: boolean
    sx?: SxProps<Theme>
    progressSx?: SxProps<Theme>
}

export const Bars = forwardRef((props: BarsProps, ref?: Ref<HTMLElement>) => {
    return (<BarsBox
        ref={ref}
        sx={props.sx}
        data-testid='Bars'
    >
        {props.progressBar && <BarsProgress sx={props.progressSx} />}
        {props.children}
    </BarsBox>)
})

export interface BarProps {
    children?: React.ReactNode
    sx?: SxProps<Theme>
}

export const Bar = (props: BarProps) => {
    return (<BarContainerBox>
        <BarBox
            sx={props.sx}
            data-testid='Bar'
        >
            {props.children}
        </BarBox>
    </BarContainerBox>)
}

export default Bar