import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { DatePicker } from '../DatePicker';
import { Select } from '../Select';
export const DateInfo = (d) => {
    const year = d.getFullYear();
    let feb1 = new Date(year, 1, 1);
    if (d < feb1)
        feb1 = new Date(year - 1, 1, 1);
    const firstSatTime = feb1.getTime() - 86400000 * ((feb1.getDay() + 1) % 7);
    const wmtWeek = Math.ceil((1 + d.getTime() - firstSatTime) / (86400000 * 7));
    const dateMonth = d.getMonth();
    return {
        date: d,
        week: wmtWeek,
        month: dateMonth + 1,
        quarter: Math.floor(dateMonth / 3) + 1,
        year: year,
        weekyear: feb1.getFullYear(),
    };
};
export const now = DateInfo(new Date());
export const nowSubFromPeriod = (period) => {
    switch (period) {
        case 'Quarter':
            return now.quarter.toString();
        case 'Month':
            return now.month.toString();
        case 'Week':
            return now.week.toString();
    }
    return '1';
};
export const nowYearFromPeriod = (period) => {
    switch (period) {
        case 'Week':
            return now.weekyear.toString();
    }
    return now.year.toString();
};
export const datePicker = (period, date, disabled, onChange) => {
    return period === 'Date'
        ? (_jsx(DatePicker, { disabled: disabled, value: date, onChange: onChange }))
        : _jsx(_Fragment, {});
};
export const yearPicker = (period, year, selectableYears, disabled, disabledSelect, onChange) => {
    return period === 'Date'
        ? _jsx(_Fragment, {})
        : (_jsx(Select, { value: year, menuItems: selectableYears, tooltip: false, onChange: (year) => year && onChange(year), disabled: disabled, selectedAtDisabled: disabledSelect, sx: { width: '55px' } }));
};
export const disabledSelect = (candidates) => {
    let select = undefined;
    candidates.forEach((candidate) => {
        if (select)
            return;
        select = candidate;
    });
    return select ?? '';
};
export const subPicker = (period, sub, selectableSubs, disabled, disabledSelect, onChange, subTooltip) => {
    switch (period) {
        case 'Date':
            return _jsx(_Fragment, {});
        case 'Year':
            return _jsx("span", { style: { display: 'inline-block', width: '42px' } });
    }
    return _jsx(Select, { value: sub, menuItems: selectableSubs, onChange: (sub) => sub && onChange(sub), tooltipFn: subTooltip, disabled: disabled, selectedAtDisabled: disabledSelect, sx: { width: '40px', marginLeft: '2px' } });
};
export const dateTip = (date, tipDate2StrFn) => {
    if (date && tipDate2StrFn)
        return tipDate2StrFn(date) ?? '';
    return '';
};
