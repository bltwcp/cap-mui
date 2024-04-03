export const DateFormat = (date: Date) => {
    const mm = date.getMonth() + 1
    const dd = date.getDate()
    return `${mm < 10 ? '0' : ''}${mm}/${dd < 10 ? '0' : ''}${dd}/${date.getFullYear()}`
}