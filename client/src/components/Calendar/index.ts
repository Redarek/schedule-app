import {IDate} from "../../types/IDate";
import {ITask} from "../../types/ITask";

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

const counterOfTasksOnDay = (date: IDate, task: ITask, calendarType: 'week' | 'month') => {
    if (
        (date.date.getTime() >=task.startTime.getTime()
        && date.date.getTime() <= task.endTime.getTime()) ||
        (date.date.getDate() >= task.startTime.getDate()
        && date.date.getDate() <= task.endTime.getDate()
        && date.date.getMonth() === task.startTime.getMonth()
        && date.date.getMonth() === task.endTime.getMonth())
    ) {
        if (!date.dayTasks.includes(task)) {
            date.dayTasks.push(task);
        }
    }
};
export const fillingTheDayWithTasks = (datesArr: IDate[], tasks: ITask[], dateNow: Date, calendarType: 'week' | 'month') => {
    for (let i = 0; i < datesArr.length; i++) {
        for (let j = 0; j < tasks.length; j++) {
            if (tasks[j].startTime.getFullYear() === dateNow.getFullYear()) {
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
