import {
    CircularProgress,
} from '@mui/material'

import { FullScreenBox } from './mui'

const FreezeSX = {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: '#7775',
    top: 0,
}

const progressSx = {
    position: 'relative',
    left: 'calc( 50% - 20px )',
    top: 'calc( 50% - 20px )',
}

export const LoadingTheme = () => {
    return (
        <FullScreenBox
            sx={FreezeSX}
        >
            <CircularProgress sx={progressSx} />
        </FullScreenBox>
    )
}