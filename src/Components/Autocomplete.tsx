import { useState, useMemo, forwardRef, Ref, } from 'react'
import {
    Tooltip,
    SxProps, Theme,
} from '@mui/material'
import { nanoid } from 'nanoid'

import { Tip, tipMsg, leadingLabel, defaultValue, triOp, } from './Utils'
import { TextField, StyledMuiAutocomplete, } from './mui'

export interface AutocompleteProps {
    label?: string
    options: string[]
    limitTags?: number
    onChange?: (value: string[]) => void
    placeholder?: string
    defaultValues?: string[]
    tooltip?: Tip
    sx?: SxProps<Theme>
    inputSx?: SxProps<Theme>
    disabled?: boolean
}

const DefaultLimitTags = 3
export const Autocomplete = forwardRef((props: AutocompleteProps, ref?: Ref<HTMLElement>) => {
    const defaultValues = defaultValue(props.defaultValues, [])
    const [displayValues, setDisplayValues] = useState<string[]>(defaultValues)
    const [showTip, setShowTip] = useState<boolean>(false)
    const uid = useMemo(() => nanoid(), [])

    const handleChange = (event: any, value: any) => {
        setDisplayValues(value)
        props.onChange && props.onChange(value)
    }

    const label = defaultValue(props.label, '')
    const limitTags = defaultValue(props.limitTags, DefaultLimitTags)
    const placeholder = triOp(displayValues.length === 0, props.placeholder, '')
    const tooltip = defaultValue(props.tooltip, 'verticle')
    return (<>
        {leadingLabel(label)}
        <StyledMuiAutocomplete
            ref={ref}
            disabled={props.disabled}
            multiple
            limitTags={limitTags}
            size='small'
            options={props.options}
            defaultValue={defaultValues}
            renderInput={(params: any) => {
                return (<Tooltip
                    title={tipMsg(displayValues, tooltip, placeholder, `autocomplete_${uid}`)}
                    enterDelay={300}
                    leaveDelay={200}
                    open={showTip}
                    arrow
                >
                    <TextField {...params}
                        placeholder={placeholder}
                        onMouseEnter={() => setShowTip(true)}
                        onMouseLeave={() => setShowTip(false)}
                        onMouseDown={() => setShowTip(false)}
                        sx={props.inputSx}
                    />
                </Tooltip>)
            }}
            onChange={handleChange}
            sx={props.sx}
        />
    </>)
})

export default Autocomplete