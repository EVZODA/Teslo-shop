export const format = (value:number) => {
    const formatter = new Intl.NumberFormat('es-AR', {
        style:'currency',
        currency:'ARG',
        minimumFractionDigits:2,
        maximumFractionDigits:2
    })
    return formatter.format(value)
}