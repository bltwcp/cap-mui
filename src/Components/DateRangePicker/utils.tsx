import { DatePicker } from '../DatePicker'
import { Select } from '../Select'

export type PeriodType = 'Date' | 'Week' | 'Month' | 'Quarter' | 'Year'

export interface DateInfoProps {
    date: Date
    week: number
    month: number
    quarter: number
    year: number
    weekyear: number
}

export const DateInfo = (d: Date): DateInfoProps => {
    const year = d.getFullYear()
    let feb1 = new Date(year, 1, 1)
    if (d < feb1)
        feb1 = new Date(year - 1, 1, 1)
    const firstSatTime = feb1.getTime() - 86400000 * ((feb1.getDay() + 1) % 7)
    const wmtWeek = Math.ceil((1 + d.getTime() - firstSatTime) / (86400000 * 7))
    const dateMonth = d.getMonth()
    return {
        date: d,
        week: wmtWeek,
        month: dateMonth + 1,
        quarter: Math.floor(dateMonth/3) + 1,
        year: year,
        weekyear: feb1.getFullYear(),
    }
}

export const now = DateInfo(new Date())

export const nowSubFromPeriod = (period: PeriodType) => {
    switch (period) {
        case 'Quarter':
            return now.quarter.toString()
        case 'Month':
            return now.month.toString()
        case 'Week':
            return now.week.toString()
    }
    return '1'
}

export const nowYearFromPeriod = (period: PeriodType) => {
    switch (period) {
        case 'Week':
            return now.weekyear.toString()
    }
    return now.year.toString()
}

export const datePicker = (period: PeriodType, date: Date, disabled: boolean, onChange: (newDate: Date) => void) => {
    return period === 'Date'
        ? (
            <DatePicker
                disabled={disabled}
                value={date}
                onChange={onChange}
            />
        )
        : <></>
}

export const yearPicker = (period: PeriodType, year: string, selectableYears: string[],
    disabled: boolean, disabledSelect: string,
    onChange: (newValue: string) => void) => {
    return period === 'Date'
        ?  <></>
        : (
            <Select
                value={year}
                menuItems={selectableYears}
                tooltip={false}
                onChange={(year: string | undefined) => year && onChange(year)}
                disabled={disabled}
                selectedAtDisabled={disabledSelect}
                sx={{ width: '55px' }}
            />
        )
}

export const disabledSelect = (candidates: (string | undefined)[]): string => {
    let select: string | undefined = undefined
    candidates.forEach((candidate) => {
        if (select)
            return
        select = candidate
    })
    return select ?? ''
}

export const subPicker = (period: PeriodType, sub: string, selectableSubs: string[],
    disabled: boolean, disabledSelect: string,
    onChange: (newValue: string) => void, subTooltip: () => string | JSX.Element) => {
    switch (period) {
        case 'Date':
            return <></>
        case 'Year':
            return <span style={{ display: 'inline-block', width: '42px' }} />
    }
    return <Select
        value={sub}
        menuItems={selectableSubs}
        onChange={(sub : string | undefined) => sub && onChange(sub)}
        tooltipFn={subTooltip}
        disabled={disabled}
        selectedAtDisabled={disabledSelect}
        sx={{ width: '40px', marginLeft: '2px' }}
    /> 
}

export const dateTip = (date: Date | undefined, tipDate2StrFn: ((date: Date) => string | undefined) | undefined): string | JSX.Element => {
    if (date && tipDate2StrFn)
        return tipDate2StrFn(date) ?? ''
    return ''
}
