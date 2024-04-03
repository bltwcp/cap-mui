import { useState, useEffect, forwardRef, Ref, } from 'react'
import {
    Tooltip,
    SxProps, Theme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { leadingLabel } from './Utils'
import { Input, FormControl, IconButton, } from './mui'

interface TextInputProps {
    value?: string
    label?: string
    placeholder?: string
    placeholderColor?: string
    onChange?: (value: string) => void
    validator?: (value: string) => boolean
    tooltipFn?: (value: string) => string | JSX.Element
    sx?: SxProps<Theme>

    disabled?: boolean
    valueAtDisabled?: string
    clearable?: boolean
}

export const IntValidator = (value: string) => /^-?\d+$/.test(value)
export const NumberValidator = (value: string) => /^-?\d+([.]\d*)?$/.test(value)

export const TextInput = forwardRef((props: TextInputProps, ref?: Ref<HTMLElement>) => {
    const [value, setValue] = useState<string>(props.value ?? '')

    useEffect(() => {
        const display = (props.disabled ? props.valueAtDisabled : props.value) ?? value
        if (display !== value)
            setValue(display)
    }, [props.value, props.disabled]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (props.onChange)
            props.onChange(value)
    }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleInputFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }
    
    const isValid = (props.validator && props.validator(value)) ?? true

    return (<span ref={ref}>
        {leadingLabel(props.label ?? '')}
        <Tooltip
            title={(props.tooltipFn && props.tooltipFn(value)) ?? ''}
            enterDelay={300}
            leaveDelay={200}
            arrow
        >
            <FormControl
                error={!isValid}
                variant='standard'
            >
                <Input
                    value={value}
                    placeholder={props.placeholder}
                    onChange={handleInputFieldChange}
                    disabled={props.disabled}
                    endAdornment={
                        props.clearable && (
                            <IconButton role='open' onClick={() => setValue('')} disabled={props.disabled}>
                                <CloseIcon />
                            </IconButton>
                        )
                    }
                    sx={props.sx}
                />
            </FormControl>
        </Tooltip>
    </span>)
})

export default TextInput