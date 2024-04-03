import { forwardRef, Ref, } from 'react'
import { SxProps, Theme } from '@mui/material'

import { IconButton } from './mui'
import { defaultValue } from './Utils'

interface ExcelButtonProps {
    onClick?: () => void
    disabled?: boolean
    sx?: SxProps<Theme>
    imageHeight?: string
    imageWidth?: string
}

const IconSrc = `${process.env.PUBLIC_URL}/excel.png`
const DefaultWidth = '26px'
const DefaultHeight = '26px'
const Alert = 'Excel'

export const ExcelButton = forwardRef((props: ExcelButtonProps, ref?: Ref<HTMLButtonElement>) => {
    const width = defaultValue(props.imageWidth, DefaultWidth)
    const height = defaultValue(props.imageHeight, DefaultHeight)
    return (
        <IconButton
            disabled={props.disabled}
            startIcon={<img
                src={IconSrc}
                width={width}
                height={height}
                alt={Alert}
            />}
            onClick={props.onClick}
            sx={props.sx}
        />
    )
})

export default ExcelButton