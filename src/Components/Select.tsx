import { useState, useEffect, forwardRef, Ref, } from 'react'
import {
    ListItemText,
    Tooltip,
    SelectChangeEvent,
    SxProps, Theme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import { MenuItem, FormControl, StyledMuiSelect, InputLabel, IconButton, } from './mui'
import { leadingLabel, defaultValue, } from './Utils'

interface SelectProps {
    label?: string
    menuItems?: string[]
    value?: string
    initialSelected?: string
    placeholder?: string
    placeholderColor?: string
    selectedAtDisabled?: string
    onChange?: (value: string | undefined) => void
    tooltip?: boolean
    tooltipFn?: (value: string | undefined) => string | JSX.Element
    disabled?: boolean
    sx?: SxProps<Theme>
    menuItemSx?: SxProps<Theme>
    clearable?: boolean
}

const tooltipMsg = (tipStr: string, enabled?: boolean, custTooltipFun?: (value: string | undefined) => string | JSX.Element) => {
    if (enabled)
        return defaultValue(custTooltipFun && custTooltipFun(tipStr), tipStr)
    return ''
}

export const Select = forwardRef((props: SelectProps, ref?: Ref<HTMLElement>) => {
    const { disabled, onChange } = props
    const [value, setValue] = useState<string>(defaultValue(props.value, props.initialSelected, ''))
    const [displayValue, setDisplayValue] = useState<string>('')
    const [showTip, setShowTip] = useState<boolean>(false)
    const [inSelect, setInSelect] = useState<boolean>(false)

    const selectedAtDisabled = defaultValue(props.selectedAtDisabled, '')
    const inputLabelColor = defaultValue(props.placeholderColor, 'black')
    const placeholder = defaultValue(props.placeholder, '')

    const handleChange = (event: SelectChangeEvent<string>) => {
        setValue(event.target.value)
    }

    useEffect(() => {
        onChange && onChange(displayValue)
    }, [displayValue]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const display = disabled ? selectedAtDisabled : value
        if (display !== displayValue)
            setDisplayValue(display)
    }, [disabled, value]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (props.value && props.value !== value) {
            setValue(props.value)
        }
    }, [props.value]) // eslint-disable-line react-hooks/exhaustive-deps

    return (<span ref={ref}>
        {leadingLabel(props.label ?? '')}
        <FormControl>
            <InputLabel
                key={`${props.label}-label`}
                sx={{
                    color: inputLabelColor,
                }}
            >
                {placeholder}
            </InputLabel>
            <Tooltip
                key={`${props.label}-tooltip`}
                enterDelay={300}
                leaveDelay={200}
                title={tooltipMsg(displayValue, props.tooltip, props.tooltipFn)}
                open={showTip}
                arrow
            >
                <StyledMuiSelect
                    key={`${props.label}-select`}
                    value={displayValue}
                    onChange={handleChange}
                    disabled={disabled}
                    endAdornment={
                        props.clearable && (
                            <IconButton
                                role='close'
                                onClick={() => setValue(defaultValue(props.value, props.initialSelected, ''))}
                                disabled={disabled}
                            >
                                <CloseIcon />
                            </IconButton>
                        )
                    }
                    sx={props.sx}
                    onMouseEnter={() => setShowTip(!inSelect)}
                    onMouseLeave={() => setShowTip(false)}
                    onMouseDown={() => setShowTip(false)}
                    onOpen={() => setInSelect(true)}
                    onClose={() => setInSelect(false)}
                >
                    {props.menuItems && props.menuItems.map((item) => (
                        <MenuItem
                            key={`${props.label}-item-${item}`}
                            value={item}
                            sx={props.menuItemSx}
                        >
                            <ListItemText primary={item} />
                        </MenuItem>
                    ))}
                </StyledMuiSelect>
            </Tooltip>
        </FormControl>
    </span>)
})

export default Select