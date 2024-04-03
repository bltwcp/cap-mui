import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo, forwardRef, } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Select } from '../Select';
import { triOp, DateFormat, PeriodRange, twoDigit, leadingLabel, } from '../Utils';
import { now, nowSubFromPeriod, nowYearFromPeriod, datePicker, yearPicker, subPicker, dateTip, disabledSelect, } from './utils';
const fetchWeekNoList = async (year) => {
    const { data } = await axios.get(`${process.env.REACT_APP_CAPMUI_BASEPATH}/Date/GetWeekNoOptionList?checkYear=${year}`);
    return data?.content ?? [];
};
const useWeekNoList = (year) => useQuery(['weeknolist', year], () => fetchWeekNoList(year), {
    staleTime: Infinity,
    retry: 0,
    select: (vs) => vs.map((v) => v.toString()),
});
const DefaultPeriodTypes = ['Week', 'Month', 'Quarter', 'Year'];
const DefaultPeriodType = 'Week';
const defaultPeriodType = (period) => period ?? DefaultPeriodType;
const defaultDateRange = (props) => {
    const periodType = props.defaultPeriod ?? DefaultPeriodType;
    const year = nowYearFromPeriod(periodType);
    const sub = nowSubFromPeriod(periodType);
    return {
        fromDate: props.defaultFrom ?? now.date,
        fromYear: props.defaultFromYear ?? year,
        fromSub: props.defaultFromSub ?? sub,
        toDate: props.defaultTo ?? now.date,
        toYear: props.defaultToYear ?? year,
        toSub: props.defaultToSub ?? sub,
    };
};
const defaultSystemStartYear = (startYear) => startYear ?? 2000;
const defaultSystemEndYear = () => now.year + 1;
const defaultPeriod = (propsPeriods, propsPeriod) => {
    if (propsPeriods.includes(propsPeriod))
        return propsPeriod;
    return propsPeriods[0];
};
export const DateRangePicker = forwardRef((props, ref) => {
    const { onRangeChange } = props;
    const [period, setPeriod] = useState(defaultPeriodType(props.defaultPeriod));
    const [dateRange, setDateRange] = useState(defaultDateRange(props));
    const pickableStartYear = useMemo(() => defaultSystemStartYear(props.startYear), [props.startYear]);
    const pickableEndYear = defaultSystemEndYear();
    const { data: pickableStartWeeks } = useWeekNoList(dateRange.fromYear);
    const { data: pickableEndWeeks } = useWeekNoList(dateRange.toYear);
    useEffect(() => {
        let from = '';
        let to = '';
        switch (period) {
            case 'Date':
                from = DateFormat(dateRange.fromDate);
                to = DateFormat(dateRange.toDate);
                break;
            case 'Year':
                from = `${dateRange.fromYear}`;
                to = `${dateRange.toYear}`;
                break;
            default:
                const periodAbbr = period.substring(0, 1);
                const fromSubdim = twoDigit(dateRange.fromSub);
                const toSubdim = twoDigit(dateRange.toSub);
                from = `${dateRange.fromYear}${periodAbbr}${fromSubdim}`;
                to = `${dateRange.toYear}${periodAbbr}${toSubdim}`;
        }
        if (onRangeChange)
            onRangeChange(from, to);
    }, [dateRange, period]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (pickableStartWeeks && pickableStartWeeks.length > 0 && !pickableStartWeeks.includes(dateRange.fromSub) && dateRange.fromSub !== 'ALL') {
            setDateRange({
                ...dateRange,
                fromSub: 'ALL',
            });
        }
    }, [pickableStartWeeks]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (pickableEndWeeks && pickableEndWeeks.length > 0 && !pickableEndWeeks.includes(dateRange.toSub) && dateRange.toSub !== 'ALL') {
            setDateRange({
                ...dateRange,
                toSub: 'ALL',
            });
        }
    }, [pickableEndWeeks]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.comparison && Number(dateRange.toSub) < Number(dateRange.fromSub)) {
            setDateRange({
                ...dateRange,
                toSub: dateRange.fromSub,
            });
        }
    }, [props.comparison]); // eslint-disable-line react-hooks/exhaustive-deps
    const pickableStartSubdimension = useMemo(() => {
        switch (period) {
            case 'Week':
                return ['ALL', ...(pickableStartWeeks ?? [])];
            case 'Month':
                return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
            case 'Quarter':
                return ['1', '2', '3', '4'];
            default:
                return [];
        }
    }, [period, pickableStartWeeks]); // eslint-disable-line react-hooks/exhaustive-deps
    const pickableEndSubdimension = useMemo(() => {
        switch (period) {
            case 'Week':
                return ['ALL', ...(pickableEndWeeks ?? [])];
            case 'Month':
                return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
            case 'Quarter':
                return ['1', '2', '3', '4'];
            default:
                return [];
        }
    }, [period, pickableEndWeeks]); // eslint-disable-line react-hooks/exhaustive-deps
    const defaultperiods = props.periods ?? DefaultPeriodTypes;
    const handlePeriodChange = (newPeriod) => {
        const nextPeriod = (newPeriod ?? DefaultPeriodType);
        if (!defaultperiods.includes(nextPeriod))
            return;
        setPeriod(nextPeriod);
        if (nextPeriod !== period) {
            setDateRange({
                ...dateRange,
                fromYear: nowYearFromPeriod(nextPeriod),
                toYear: nowYearFromPeriod(nextPeriod),
                fromSub: nowSubFromPeriod(nextPeriod),
                toSub: nowSubFromPeriod(nextPeriod),
            });
        }
    };
    const handleFromDateChange = (fromDate) => {
        const modifiedToDate = triOp(fromDate > dateRange.toDate, fromDate, dateRange.toDate);
        setDateRange({ ...dateRange, fromDate, toDate: modifiedToDate });
    };
    const handleToDateChange = (toDate) => {
        const modifiedFromDate = triOp(toDate < dateRange.fromDate, toDate, dateRange.fromDate);
        setDateRange({ ...dateRange, toDate, fromDate: modifiedFromDate });
    };
    const handleFromYearChange = (fromYear) => {
        const toYear = triOp(dateRange.toYear < fromYear, fromYear, dateRange.toYear);
        const to = `${toYear}${twoDigit(dateRange.toSub)}`;
        const from = `${fromYear}${twoDigit(dateRange.fromSub)}`;
        const fromSub = triOp(to < from && !to.includes('-') && !from.includes('-'), dateRange.toSub, dateRange.fromSub);
        setDateRange({
            ...dateRange,
            fromYear,
            fromSub,
            toYear,
        });
    };
    const handleFromSubdimensionChange = (fromSub) => {
        const to = `${dateRange.toYear}${twoDigit(dateRange.toSub)}`;
        const from = `${dateRange.fromYear}${twoDigit(fromSub)}`;
        const toSub = props.comparison
            ? triOp(Number(dateRange.toSub) < Number(fromSub) && !to.includes('-') && !from.includes('-'), fromSub, dateRange.toSub)
            : triOp(to < from && !to.includes('-') && !from.includes('-'), fromSub, dateRange.toSub);
        setDateRange({
            ...dateRange,
            fromSub,
            toSub,
        });
    };
    const handleToYearChange = (toYear) => {
        const fromYear = triOp(toYear < dateRange.fromYear, toYear, dateRange.fromYear);
        const to = `${toYear}${twoDigit(dateRange.toSub)}`;
        const from = `${fromYear}${twoDigit(dateRange.fromSub)}`;
        const toSub = triOp(to < from && !to.includes('-') && !from.includes('-'), dateRange.fromSub, dateRange.toSub);
        setDateRange({
            ...dateRange,
            fromYear,
            toYear,
            toSub,
        });
    };
    const handleToSubdimensionChange = (toSub) => {
        const to = `${dateRange.toYear}${twoDigit(toSub)}`;
        const from = `${dateRange.fromYear}${twoDigit(dateRange.fromSub)}`;
        const fromSub = props.comparison
            ? triOp(Number(toSub) < Number(dateRange.fromSub) && !to.includes('-') && !from.includes('-'), toSub, dateRange.fromSub)
            : triOp(to < from && !to.includes('-') && !from.includes('-'), toSub, dateRange.fromSub);
        setDateRange({
            ...dateRange,
            fromSub,
            toSub,
        });
    };
    const fromDate = () => {
        const date = PeriodRange(`${dateRange.fromYear}${period.substring(0, 1)}${twoDigit(dateRange.fromSub)}`).start;
        return dateTip(date, props.tipDate2StrFn);
    };
    const toDate = () => {
        const date = PeriodRange(`${dateRange.toYear}${period.substring(0, 1)}${twoDigit(dateRange.toSub)}`).end;
        return dateTip(date, props.tipDate2StrFn);
    };
    const validRange = pickableStartYear <= pickableEndYear;
    if (pickableStartYear && pickableEndYear && !validRange)
        console.error('startYear > endYear');
    const pickableYears = Array.from(Array(pickableEndYear - pickableStartYear + 1).keys()).map((i) => (pickableEndYear - i).toString());
    const disabled = props.disabled ?? false;
    const defaultperiod = props.defaultPeriod ?? DefaultPeriodType;
    const periodAtDisabled = props.disabledSelect?.Period ?? defaultperiod;
    return (_jsx("span", { ref: ref, children: validRange && (_jsxs(_Fragment, { children: [leadingLabel(props.label ?? ''), _jsx(Select, { menuItems: defaultperiods, initialSelected: defaultPeriod(defaultperiods, defaultperiod), onChange: handlePeriodChange, disabled: disabled, selectedAtDisabled: periodAtDisabled, sx: { width: '70px' } }), leadingLabel('From'), datePicker(period, dateRange.fromDate, disabled, handleFromDateChange), yearPicker(period, dateRange.fromYear, pickableYears, disabled, disabledSelect([props.disabledSelect?.FromYear, props.defaultFromYear, now.year.toString()]), handleFromYearChange), subPicker(period, dateRange.fromSub, pickableStartSubdimension, disabled, disabledSelect([props.disabledSelect?.FromSub, props.defaultFromSub, now[period.toLowerCase()]?.toString()]), handleFromSubdimensionChange, fromDate), leadingLabel('To'), datePicker(period, dateRange.toDate, disabled, handleToDateChange), yearPicker(period, dateRange.toYear, pickableYears, disabled, disabledSelect([props.disabledSelect?.ToYear, props.defaultToYear, now.year.toString()]), handleToYearChange), subPicker(period, dateRange.toSub, pickableEndSubdimension, disabled, disabledSelect([props.disabledSelect?.ToSub, props.defaultToSub, now[period.toLowerCase()]?.toString()]), handleToSubdimensionChange, toDate)] })) }));
});
export default DateRangePicker;
