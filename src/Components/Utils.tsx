import { Typography, } from './mui'

export type Tip = 'none' | 'verticle' | 'horizontal'
export type Abbr = '...' | 'selected'

export const defaultValue = (value: any, ...candidates: any[]): any => {
    if (value !== undefined && value !== null) {
        if (typeof value === 'function')
            return value()
        return value
    }
    if (candidates.length > 0)
        return defaultValue(candidates[0], ...candidates.slice(1))
    return undefined
}

export const and = (conditionA: boolean, ...conditions: boolean[]): boolean => {
    if (!conditionA)
        return false
    if (conditions.length > 0)
        return and(conditions[0], ...conditions.slice(1))
    return true
}

export const or = (conditionA: boolean, ...conditions: boolean[]): boolean => {
    if (conditionA)
        return true
    if (conditions.length > 0)
        return or(conditions[0], ...conditions.slice(1))
    return false
}

export const conditionValue = (condition: boolean, value: any): any => {
    if (condition)
        return value
    return undefined
}

export const triOp = (condition: boolean, a: any, b: any): any => {
    return condition ? a : b
}

export const deepCompare = (a: any, b: any): boolean => {
    const typeA = typeof a
    const typeB = typeof b
    if (typeA !== typeB)
        return false
    
    switch (typeA) {
        case 'undefined':
            return true
        case 'function':
            return a.toString() === b.toString()
        case 'object':
            const objTypeA = Object.prototype.toString.call(a)
            const objTypeB = Object.prototype.toString.call(b)
            if (objTypeA !== objTypeB)
                return false
            if (objTypeA === '[object Null]')
                return true
            if (objTypeA === '[object Array]') {
                if (a.length !== b.length)
                    return false
                return !(a as any[]).some((_: any, index: number) => !deepCompare(a[index], b[index]))
            }

            const keysA = Object.keys(a)
            const keysB = Object.keys(b)
            if (keysA.length !== keysB.length)
                return false
            return !keysA.some((key) => !deepCompare(a[key], b[key]))
        default:
            return a === b
    }
}

export const colourToARGB = (colour: string, defaultReturn: string = '#FFFFFF'): string => {
    let rgb = defaultReturn
    if (colour && colour.length > 0 && colour[0] === '#') {
        if (colour.length === 4) {
            const r = colour.charAt(1)
            const g = colour.charAt(2)
            const b = colour.charAt(3)
            rgb = `#${r}${r}${g}${g}${b}${b}`
        } else
            rgb = colour
    }
    
    const colours = {"aliceblue":"#f0f8ff","antiquewhite":"#faebd7","aqua":"#00ffff","aquamarine":"#7fffd4","azure":"#f0ffff",
        "beige":"#f5f5dc","bisque":"#ffe4c4","black":"#000000","blanchedalmond":"#ffebcd","blue":"#0000ff","blueviolet":"#8a2be2","brown":"#a52a2a","burlywood":"#deb887",
        "cadetblue":"#5f9ea0","chartreuse":"#7fff00","chocolate":"#d2691e","coral":"#ff7f50","cornflowerblue":"#6495ed","cornsilk":"#fff8dc","crimson":"#dc143c","cyan":"#00ffff",
        "darkblue":"#00008b","darkcyan":"#008b8b","darkgoldenrod":"#b8860b","darkgray":"#a9a9a9","darkgreen":"#006400","darkkhaki":"#bdb76b","darkmagenta":"#8b008b","darkolivegreen":"#556b2f",
        "darkorange":"#ff8c00","darkorchid":"#9932cc","darkred":"#8b0000","darksalmon":"#e9967a","darkseagreen":"#8fbc8f","darkslateblue":"#483d8b","darkslategray":"#2f4f4f","darkturquoise":"#00ced1",
        "darkviolet":"#9400d3","deeppink":"#ff1493","deepskyblue":"#00bfff","dimgray":"#696969","dodgerblue":"#1e90ff",
        "firebrick":"#b22222","floralwhite":"#fffaf0","forestgreen":"#228b22","fuchsia":"#ff00ff",
        "gainsboro":"#dcdcdc","ghostwhite":"#f8f8ff","gold":"#ffd700","goldenrod":"#daa520","gray":"#808080","green":"#008000","greenyellow":"#adff2f",
        "honeydew":"#f0fff0","hotpink":"#ff69b4",
        "indianred ":"#cd5c5c","indigo":"#4b0082","ivory":"#fffff0","khaki":"#f0e68c",
        "lavender":"#e6e6fa","lavenderblush":"#fff0f5","lawngreen":"#7cfc00","lemonchiffon":"#fffacd","lightblue":"#add8e6","lightcoral":"#f08080","lightcyan":"#e0ffff","lightgoldenrodyellow":"#fafad2",
        "lightgrey":"#d3d3d3","lightgreen":"#90ee90","lightpink":"#ffb6c1","lightsalmon":"#ffa07a","lightseagreen":"#20b2aa","lightskyblue":"#87cefa","lightslategray":"#778899","lightsteelblue":"#b0c4de",
        "lightyellow":"#ffffe0","lime":"#00ff00","limegreen":"#32cd32","linen":"#faf0e6",
        "magenta":"#ff00ff","maroon":"#800000","mediumaquamarine":"#66cdaa","mediumblue":"#0000cd","mediumorchid":"#ba55d3","mediumpurple":"#9370d8","mediumseagreen":"#3cb371","mediumslateblue":"#7b68ee",
        "mediumspringgreen":"#00fa9a","mediumturquoise":"#48d1cc","mediumvioletred":"#c71585","midnightblue":"#191970","mintcream":"#f5fffa","mistyrose":"#ffe4e1","moccasin":"#ffe4b5",
        "navajowhite":"#ffdead","navy":"#000080",
        "oldlace":"#fdf5e6","olive":"#808000","olivedrab":"#6b8e23","orange":"#ffa500","orangered":"#ff4500","orchid":"#da70d6",
        "palegoldenrod":"#eee8aa","palegreen":"#98fb98","paleturquoise":"#afeeee","palevioletred":"#d87093","papayawhip":"#ffefd5","peachpuff":"#ffdab9","peru":"#cd853f","pink":"#ffc0cb","plum":"#dda0dd","powderblue":"#b0e0e6","purple":"#800080",
        "rebeccapurple":"#663399","red":"#ff0000","rosybrown":"#bc8f8f","royalblue":"#4169e1",
        "saddlebrown":"#8b4513","salmon":"#fa8072","sandybrown":"#f4a460","seagreen":"#2e8b57","seashell":"#fff5ee","sienna":"#a0522d","silver":"#c0c0c0","skyblue":"#87ceeb","slateblue":"#6a5acd","slategray":"#708090","snow":"#fffafa","springgreen":"#00ff7f","steelblue":"#4682b4",
        "tan":"#d2b48c","teal":"#008080","thistle":"#d8bfd8","tomato":"#ff6347","turquoise":"#40e0d0",
        "violet":"#ee82ee",
        "wheat":"#f5deb3","white":"#ffffff","whitesmoke":"#f5f5f5",
        "yellow": "#ffff00", "yellowgreen": "#9acd32"
    };
    if (colours[colour.toLowerCase() as keyof typeof colours] !== undefined)
        rgb = colours[colour.toLowerCase() as keyof typeof colours]
    
    return `ff${rgb.substring(1).toLowerCase()}`;
}

// used to calculate rendered size
const canvas = document.createElement('canvas')
export const gridMaxWidth = (header: string, field: string, data: any[], font?: string): number => {
    let context = canvas.getContext('2d') as CanvasRenderingContext2D
    try { // due to jest cannot mock canvas
        context.font = font ?? '13px Arial'
    } catch (Exception) { }
    const headerWidth = context?.measureText(header)?.width ?? 0
    const dataWidth = data.map((d) => {
        const value = d[field as keyof typeof data]
        return context?.measureText(value)?.width ?? 0
    })

    return Math.max(headerWidth, ...dataWidth) + 1
}

export const twoDigit = (v: string): string => {
    if (v === 'ALL')
        return '--'
    const fill = `00${v}`
    return fill.slice(-2)
}

export const DateFormat = (date: Date) => {
    const yyyy = date.getFullYear()
    const mm = twoDigit(`${date.getMonth() + 1}`)
    const dd = twoDigit(`${date.getDate()}`)
    return `${yyyy}/${mm}/${dd}`
}

export const MonthString = (month: number) => {
    const monthDictionary: { [key: number]: string } = {
        1: 'Jan',
        2: 'Feb',
        3: 'Mar',
        4: 'Apr',
        5: 'May',
        6: 'Jun',
        7: 'Jul',
        8: 'Aug',
        9: 'Sep',
        10: 'Oct',
        11: 'Nov',
        12: 'Dec',
    }
    return monthDictionary[month]
}

const PeriodType = (periodStr: string) => {
    if (periodStr.length > 4)
        return periodStr.substring(4, 5)
    else if (periodStr.length === 4 && !isNaN(Number(periodStr)))
        return 'Y'
    return ''
}

export const PeriodRange = (periodStr: string) => {
    let period = PeriodType(periodStr)
    const year = parseInt(periodStr.substring(0, 4))
    const sub = triOp(periodStr.length > 5, parseInt(periodStr.substring(5)), 0)
    switch (period) {
        case 'Y':
            return {
                start: new Date(year, 0, 1),
                end: new Date(year, 11, 31),
            }
        case 'Q':
            const qdate = new Date(year, (sub - 1) * 3, 1)
            const qndate = new Date(qdate.getTime())
            qndate.setMonth(qndate.getMonth() + 3)
            qndate.setDate(qndate.getDate() - 1)
            return {
                start: qdate,
                end: qndate,
            }
        case 'M':
            const mdate = new Date(year, sub - 1, 1)
            const mndate = new Date(mdate.getTime())
            mndate.setMonth(mndate.getMonth() + 1)
            mndate.setDate(mndate.getDate() - 1)
            return {
                start: mdate,
                end: mndate,
            }
        case 'W':
            const feb1 = new Date(year, 1, 1)
            const firstSatDateNum = feb1.getTime() - ((feb1.getDay() + 1) % 7) * 86400000
            const wdate = new Date(firstSatDateNum + 7 * (sub - 1) * 86400000)
            const wndate = new Date(firstSatDateNum + (7 * sub - 1) * 86400000)
            return {
                start: wdate,
                end: wndate,
            }
        default:
            return {
                start: undefined,
                end: undefined,
            }
    }
}

export const Date2Week = (date: Date) => {
    let feb1 = new Date(date.getFullYear(), 1, 1)
    if (feb1 > date)
        feb1.setFullYear(date.getFullYear() - 1)
    const firstSatDateNum = feb1.getTime() - ((feb1.getDay() + 1) % 7) * 86400000
    const weekNo = (date.getTime() - firstSatDateNum) / (7*86400000) + 1
    return `${feb1.getFullYear()}W${weekNo < 10 ? '0' : ''}${Math.floor(weekNo).toFixed(0)}`
}

export const PeriodsWithin = (from: string, to: string) => {
    let periods: string[] = []
    const dimension = PeriodType(from)
    const fromYear = parseInt(from.substring(0, 4))
    const toYear = parseInt(to.substring(0, 4))
    if (dimension === 'Y') {
        Array(toYear - fromYear + 1).fill(0).forEach((_, index) => {
            periods.push(`${fromYear + index}`)
        })
        return periods
    }
    let startSub: number = 1
    let endSub: number = 1
    switch (dimension) {
        case 'Q':
            endSub = 4
            break
        case 'M':
            endSub = 12
            break
        case 'W':
            endSub = 53
            break
        default:
            return periods
    }
    Array(toYear - fromYear + 1).fill(0).forEach((_, index) => {
        let indexStartSub = startSub
        let indexEndSub = endSub
        if (index === 0)
            indexStartSub = parseInt(from.substring(5))
        if (fromYear + index === toYear)
            indexEndSub = parseInt(to.substring(5))
        Array(indexEndSub - indexStartSub + 1).fill(0).forEach((_, subIndex) => {
            const sub = twoDigit(`${indexStartSub + subIndex}`)
            periods.push(`${fromYear + index}${dimension}${sub}`)
        })
    })
    return periods
}

export const leadingLabel = (label: string) => {
    if (label.length > 0)
        return (
            <Typography title='label' variant='body1'>
                {label}:
            </Typography>
        )
    return <></>
}

export const tipMsg = (displayValues: any[], tooltip: Tip, placeholder: string, uid: string) => {
    if (tooltip !== 'none' && displayValues.length === 0)
        return placeholder
    
    switch (tooltip) {
        case 'none':
            return ''
        case 'verticle':
            return (<>
                {displayValues.map((value, index) =>
                    <Typography key={`${uid}_${index}_${value}`} variant='body2'>
                        {value}
                    </Typography>
                )}
            </>)
        default:
            return displayValues.join(', ')
    }
}