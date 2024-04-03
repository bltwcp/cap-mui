import { useState, useEffect, forwardRef, Ref, } from 'react'
import { SxProps, Theme, } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'

import { DatePickerBox, } from './mui'
import { defaultValue } from './Utils'

interface DatePickerProps {
    initialValue?: Date
    value?: Date
    disabled?: boolean
    onChange?: (date: Date) => void
    sx?: SxProps<Theme>
}

export const DatePicker = forwardRef((props: DatePickerProps, ref?: Ref<HTMLInputElement>) => {
    const [date, setDate] = useState<Date>(defaultValue(props.value, props.initialValue, new Date()))

    const handleDateChange = (v?: Date | null) => {
        if (v && props.onChange) {
            setDate(v)
            props.onChange(v)
        }
    }

    useEffect(() => {
        if (props.value)
            setDate(props.value)
    }, [props.value])

    return (<span style={{ display: 'inline-block', }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <MuiDatePicker
                inputRef={ref}
                disabled={props.disabled}
                value={date}
                onChange={handleDateChange}
                renderInput={({ inputRef, inputProps, InputProps }) => (
                    <DatePickerBox sx={props.sx}>
                        <input ref={inputRef} {...inputProps} />
                        {InputProps?.endAdornment}
                    </DatePickerBox>
                )}
            />
        </LocalizationProvider>
    </span>)
})

export default DatePicker