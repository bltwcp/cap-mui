import { forwardRef, Ref, } from 'react'
import { ThemeProvider, Paper, SxProps, Theme, } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { mainTheme, reportTheme, } from './theme'
import { FullWidthBox, FullScreenBox, Typography, } from './mui'

const queryClient = new QueryClient()

const titleRow = (title?: string, titleSx?: SxProps<Theme>) => {
    if (title && title.length > 0)
        return (
            <FullWidthBox>
                <Typography variant='h1' title='title' sx={titleSx}>
                    {title}
                </Typography>
            </FullWidthBox>
        )
}

const body = (children?: React.ReactNode, bodySx?: SxProps<Theme>) => {
    return (
        <Paper sx={bodySx}>
            <ThemeProvider theme={mainTheme}>
                {children}
            </ThemeProvider>
        </Paper>
    )
}

export interface ReportProps {
    title?: string
    children?: React.ReactNode
    bodySx?: SxProps<Theme>
    titleSx?: SxProps<Theme>
}

export const Report = forwardRef((props: ReportProps, ref?: Ref<HTMLElement>) => {
    return (<QueryClientProvider client={queryClient}>
        <ThemeProvider theme={reportTheme}>
            <FullScreenBox
                ref={ref}
            >
                {titleRow(props.title, props.titleSx)}
                {body(props.children, props.bodySx)}
            </FullScreenBox>
        </ThemeProvider>
    </QueryClientProvider>)
})

export default Report