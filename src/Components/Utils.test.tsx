import '@testing-library/jest-dom'
import {
    deepCompare, defaultValue, triOp, twoDigit, colourToARGB,
    DateFormat, MonthString, PeriodRange, PeriodsWithin,
    tipMsg,
} from './Utils'

test('defaultValue test', () => {
    const test1 = defaultValue(null, undefined, 'a', 'b')
    expect(test1).toBe('a')

    const fn = (v: number) => v * 2
    const test2 = defaultValue(fn(3), 0)
    expect(test2).toBe(6)
})

test('triOp test', () => {
    const test1 = triOp(true, 1, 2)
    expect(test1).toBe(1)

    const test2 = triOp(false, 1, 2)
    expect(test2).toBe(2)
})

test('deepCompare test', () => {
    const test1 = deepCompare(123, 123)
    expect(test1).toBe(true)

    const value2_1 = {
        value: 'a',
        fn: (v: string) => `value=${v}`,
    }
    const value2_2 = {
        value: 'a',
        fn: (v: string) => `value="${v}"`
    }
    const test2 = deepCompare(value2_1, value2_2)
    expect(test2).toBe(false)

    const test3Fn = (v: string) => `value=${v}`
    const value3_1 = {
        value: 'a',
        fn: test3Fn,
    }
    const value3_2 = {
        value: 'a',
        fn: test3Fn,
    }
    const test3 = deepCompare(value3_1, value3_2)
    expect(test3).toBe(true)

    const test4 = deepCompare(undefined, undefined)
    expect(test4).toBe(true)

    const test5 = deepCompare(1, 3)
    expect(test5).toBe(false)

    const test6 = deepCompare([1, 2, 3], [1, 2, 3])
    expect(test6).toBe(true)
})

test('colourToARGB test', () => {
    const test1 = colourToARGB('')
    expect(test1).toBe('ffffffff')

    const test2 = colourToARGB('#359')
    expect(test2).toBe('ff335599')

    const test3 = colourToARGB('violet')
    expect(test3).toBe('ffee82ee')

    const test4 = colourToARGB('#ABCDEF')
    expect(test4).toBe('ffabcdef')
})

/*test('gridMaxWidth test', () => {

})*/

test('twoDigit test', () => {
    const test1 = twoDigit('3')
    expect(test1).toBe('03')

    const test2 = twoDigit('30')
    expect(test2).toBe('30')

    const test3 = twoDigit('333')
    expect(test3).toBe('33')
})

test('DateFormat test', () => {
    const dStr1 = DateFormat(new Date(2000, 0, 1))
    expect(dStr1).toBe('2000/01/01')
})

test('MonthString test', () => {
    const mStr1 = MonthString(4)
    expect(mStr1).toBe('Apr')

    const mStr2 = MonthString(13)
    expect(mStr2).toBe(undefined)
})

test('PeriodRange test', () => {
    const range1 = PeriodRange('2022W27')
    expect(range1.start).toStrictEqual(new Date(2022, 6, 30))
    expect(range1.end).toStrictEqual(new Date(2022, 7, 5))

    const range2 = PeriodRange('2021')
    expect(range2.start).toStrictEqual(new Date(2021, 0, 1))
    expect(range2.end).toStrictEqual(new Date(2021, 11, 31))

    const range3 = PeriodRange('2020Q3')
    expect(range3.start).toStrictEqual(new Date(2020, 6, 1))
    expect(range3.end).toStrictEqual(new Date(2020, 8, 30))

    const range4 = PeriodRange('2000M06')
    expect(range4.start).toStrictEqual(new Date(2000, 5, 1))
    expect(range4.end).toStrictEqual(new Date(2000, 5, 30))
})

test('PeriodsWithin test', () => {
    const periods1 = PeriodsWithin('2020', '2022')
    expect(periods1).toStrictEqual(['2020', '2021', '2022'])

    const period2 = PeriodsWithin('2000Q3', '2003Q2')
    expect(period2.length).toBe(12)

    const period3 = PeriodsWithin('2001M03', '2010M01')
    expect(period3.length).toBe(107)

    const period4 = PeriodsWithin('19Q1', '19Q1')
    expect(period4.length).toBe(0)
})

test('tipMsg test', () => {
    const tip1 = tipMsg(['a', 'b'], 'none', 'placeholder', 'uid')
    expect(tip1).toBe('')

    const tip2 = tipMsg(['a', 'b'], 'horizontal', 'placeholder', 'uid')
    expect(tip2).toBe('a, b')
})