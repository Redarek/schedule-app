export const initialDate = new Date();
export const dayName = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

export const getLastDayOfMonth = (month, year) => {
    let date = new Date(year, month, 0);
    return date.getDate();
};

export const getNumberOfTheDayOfTheMonth = (year, month) => {
    let date = new Date(year, month);
    return date.getDay();
};



/// year

// const year = initialDate.getFullYear()

// const dateNow
