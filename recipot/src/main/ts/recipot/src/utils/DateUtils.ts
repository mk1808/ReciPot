export function format(date: any) {
    let newDate = new Date(date),
        minute = newDate.getMinutes(),
        hour = newDate.getHours(),
        day = newDate.getDate(),
        month = newDate.getMonth() + 1,
        year = newDate.getFullYear();
    return `${addZeroIfNeeded(day)}-${addZeroIfNeeded(month)}-${year} ${addZeroIfNeeded(hour)}:${addZeroIfNeeded(minute)}`
}

function addZeroIfNeeded(datePart: any) {
    return datePart < 10 ? `0${datePart}` : datePart;
}

export function formatNoTime(date: any) {
    let newDate = new Date(date),
        day = newDate.getDate(),
        month = newDate.getMonth() + 1,
        year = newDate.getFullYear();
    return `${addZeroIfNeeded(day)}-${addZeroIfNeeded(month)}-${year}`
}

export function convertToTime(time: number) {
    let hour = Math.floor(time / 60);
    let min = time % 60;
    return `${hour}:${addZeroIfNeeded(min)}`
}