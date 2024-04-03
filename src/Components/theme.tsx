import { createTheme } from '@mui/material'

export const reportTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            paper: '#D7E3F3',
        },
    },
    typography: {
        h1: {
            fontWeight: 500,
            color: '#FFF',
            backgroundColor: '#5078B3',
            paddingLeft: '8px',
        },
    }
})

export const mainTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#FFF',
        },
    },
    typography: {
        htmlFontSize: 13,
        fontSize: 13,
        button: {
            fontSize: 13,
        },
        body1: {
            fontSize: 13,
            display: 'inline-block',
            paddingX: '8px',
            verticalAlign: 'middle',
        },
        body2: {
            fontSize: 13,
            paddingX: '8px',
        }
    }
})