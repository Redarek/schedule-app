import {IDate} from "../../types/IDate";
import {ITasks} from "../../types/ITasks";

export const initialDate = new Date();
export const dayName = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

export const getLastDayOfMonth = (month: number, year: number) => {
    let date = new Date(year, month, 0);
    return date.getDate();
};

export const getNumberOfTheDayOfTheMonth = (year: number, month: number) => {
    let date = new Date(year, month);
    return date.getDay();
};

export const getIndexOfDay = (day: IDate) => {
    let indexOfDay = 0;
    for (let i = 0; i < day.dayTasks.length; i++) {
        indexOfDay = i;
    }
    return indexOfDay;
};

const counterOfTasksOnDay = (date: IDate, task: ITasks, calendarType: 'week' | 'month') => {
    if (
        (date.date.getTime() >=task.start.getTime()
        && date.date.getTime() <= task.firstEnd.getTime()) ||
        (date.date.getDate() >= task.start.getDate()
        && date.date.getDate() <= task.firstEnd.getDate()
        && date.date.getMonth() === task.start.getMonth()
        && date.date.getMonth() === task.firstEnd.getMonth())
    ) {
        if (!date.dayTasks.includes(task)) {
            date.dayTasks.push(task);
        }
    }
};
export const fillingTheDayWithTasks = (datesArr: IDate[], tasks: ITasks[], dateNow: Date, calendarType: 'week' | 'month') => {
    for (let i = 0; i < datesArr.length; i++) {
        for (let j = 0; j < tasks.length; j++) {
            if (tasks[j].start.getFullYear() === dateNow.getFullYear()) {
                counterOfTasksOnDay(datesArr[i], tasks[j], calendarType);
            }
        }
    }
    return datesArr
};

export const checkIndex = (index: number) => {
    if (index === 0 || index === 1 || index === 2) {
        return true
    } else return false
}

export const weeks = (datesInTheMonth: IDate[]) => {
    return [
        {
            startTime: datesInTheMonth[0].date,
            endTime: datesInTheMonth[6].date,
            counter: 0
        },
        {
            startTime: datesInTheMonth[7].date,
            endTime: datesInTheMonth[13].date,
            counter: 0
        },
        {
            startTime: datesInTheMonth[14].date,
            endTime: datesInTheMonth[20].date,
            counter: 0
        },
        {
            startTime: datesInTheMonth[21].date,
            endTime: datesInTheMonth[27].date,
            counter: 0
        },
        {
            startTime: datesInTheMonth[28].date,
            endTime: datesInTheMonth[34].date,
            counter: 0
        },
        {
            startTime: datesInTheMonth[35].date,
            endTime: datesInTheMonth[41].date,
            counter: 0
        }

    ]
}
