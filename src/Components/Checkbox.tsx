import React, { useState, useEffect, forwardRef, Ref, } from 'react'
import { SxProps, Theme } from '@mui/material'

import { StyledMuiCheckbox, FormControlLabel, } from './mui'
import { defaultValue } from './Utils'

export type Placement = 'end' | 'start' | 'top' | 'bottom' | undefined

interface CheckboxProps {
    label?: string
    labelPlacement?: Placement
    checked?: boolean
    defaultChecked?: boolean
    disabled?: boolean
    onChange?: (checked: boolean) => void
    sx?: SxProps<Theme>
}

export const Checkbox = forwardRef((props: CheckboxProps, ref?: Ref<HTMLInputElement>) => {
    const [checked, setChecked] = useState<boolean>(defaultValue(props.checked, props.defaultChecked, false))

    const handleChecked = (event: React.ChangeEvent<HTMLInputElement>, check: boolean) => {
        setChecked(event.target.checked)
        props.onChange && props.onChange(event.target.checked)
    }

    useEffect(() => {
        if (props.checked !== undefined)
            setChecked(props.checked)
    }, [props.checked])

    const label = defaultValue(props.label, '')
    return (<FormControlLabel
        label={label}
        labelPlacement={props.labelPlacement}
        control={
            <StyledMuiCheckbox
                inputRef={ref}
                checked={checked}
                onChange={handleChecked}
                sx={props.sx}
            />
        }
        disabled={props.disabled}
    />)
})

export default Checkbox