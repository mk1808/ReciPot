export function format(date: any) {
    let newDate = new Date(date),
        minute = addZeroIfNeeded(newDate.getMinutes()),
        hour = addZeroIfNeeded(newDate.getHours()),
        day = addZeroIfNeeded(newDate.getDate()),
        month = addZeroIfNeeded(newDate.getMonth() + 1),
        year = newDate.getFullYear();

    return `${day}-${month}-${year} ${hour}:${minute}`;
}

export function addZeroIfNeeded(datePart: any) {
    return datePart < 10 ? `0${datePart}` : datePart;
}

export function formatNoTime(date: any) {
    let newDate = new Date(date),
        day = addZeroIfNeeded(newDate.getDate()),
        month = addZeroIfNeeded(newDate.getMonth() + 1),
        year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
}

export function convertToTime(time: number) {
    let hour = Math.floor(time / 60);
    let min = addZeroIfNeeded(time % 60);
    return `${hour}:${min}`;
}

