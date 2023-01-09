export function getInputDate(data: Date) {
    let date = `${data.getDate()}`
    let month = `${data.getMonth() + 1}`;
    let year = `${data.getFullYear()}`;
    let hours = `${data.getHours()}`;
    let minutes = `${data.getMinutes()}`;
    if (month.length === 1) month = `0${month}`
    if (date.length === 1) date = `0${date}`
    if (hours.length === 1) hours = `0${hours}`
    if (minutes.length === 1) minutes = `0${minutes}`
    if (year.length === 1) year = `000${year}`
    if (year.length === 2) year = `00${year}`
    if (year.length === 3) year = `0${year}`

    return `${year}-${month}-${date}T${hours}:${minutes}`
}

