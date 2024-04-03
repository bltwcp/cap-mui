import '@testing-library/jest-dom'
import { DateFormat } from './Utils'

test('CAP DateFormat', () => {
    // mm/dd/yyyy
    expect(DateFormat(new Date(2021, 10, 29))).toBe('11/29/2021')
})
