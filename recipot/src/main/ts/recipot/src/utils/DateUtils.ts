export function format(date: any) {
    let newDate = new Date(date),
        day = newDate.getDate(),
        month = newDate.getMonth() + 1,
        year = newDate.getFullYear();
    return `${addZeroIfNeeded(day)}-${addZeroIfNeeded(month)}-${year}`
}

function addZeroIfNeeded(datePart: any) {
    return datePart < 10 ? `0${datePart}` : datePart;
}