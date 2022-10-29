import React, {FC, useEffect} from 'react';
import {useState} from "react";
import cl from './Month.module.css';
import {
    checkIndex,
    dayName,
    fillingTheDayWithTasks,
    getIndexOfDay,
    getLastDayOfMonth,
    getNumberOfTheDayOfTheMonth,
    initialDate, weeks
} from "../index";

import {IDate} from "../../../types/IDate";
import TaskMonth from "./TaskMonth";
import {ITasks} from "../../../types/ITasks";
import Button from "../../UI/Button/Button";

interface MonthProps {
    tasks: ITasks[]
}

const Month: FC<MonthProps> = ({tasks}) => {
    //@todo Сделать нормальные стили для месячного календаря

    const [dateNow, setDateNow] = useState<Date>(new Date(initialDate));
    const lastDayOfMonth = getLastDayOfMonth(dateNow.getMonth() + 1, dateNow.getFullYear());
    const numberOfTheFirstDayOfTheMonth = getNumberOfTheDayOfTheMonth(dateNow.getFullYear(), dateNow.getMonth());
    const lastDayOfPreviousMonth = getLastDayOfMonth(dateNow.getMonth(), dateNow.getFullYear());

    const lastDaysOfPrevMonth: IDate[] = [];
    const daysOfMonth: IDate[] = [];
    const numberOfDaysInAMonth: number = 42;
    const firstDaysOfNextMoth: IDate[] = [];

    const fillingPreviousMonth = () => {
        let number = numberOfTheFirstDayOfTheMonth;
        if (number === 0) {
            number = 7;
        }
        for (let i = 0; i < number - 1; i++) {
            lastDaysOfPrevMonth[i] = {
                day: lastDayOfPreviousMonth - i,
                date: new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, lastDayOfPreviousMonth - i),
                dayTasks: [],
            };

        }
    };

    const fillingMonth = () => {
        for (let i = 0; i < lastDayOfMonth; i++) {
            daysOfMonth[i] =
                {
                    day: i + 1,
                    date: new Date(dateNow.getFullYear(), dateNow.getMonth(), i + 1),
                    dayTasks: [],
                };
        }
    };

    const fillingNextMonth = () => {
        for (let i = 0; i < numberOfDaysInAMonth - daysOfMonth.length - lastDaysOfPrevMonth.length; i++) {
            firstDaysOfNextMoth[i] = {
                day: i + 1,
                date: new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, i + 1),
                dayTasks: [],
            };
        }
    };

    fillingPreviousMonth();
    fillingMonth();
    fillingNextMonth();

    let datesInTheMonth = [...lastDaysOfPrevMonth.reverse(), ...daysOfMonth, ...firstDaysOfNextMoth];

    const handleChangeMonth = (param: string) => {
        if (param === 'next') {
            if (dateNow.getMonth() + 1 === 12) {
                setDateNow(new Date(dateNow.getFullYear() + 1, 0, 1));
            } else {
                setDateNow(new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, 1));
            }
        }
        if (param === 'prev') {

            if (dateNow.getMonth() - 1 === 0) {
                setDateNow(new Date(dateNow.getFullYear() - 1, 11, 1));
            } else {
                setDateNow(new Date(dateNow.getFullYear(), dateNow.getMonth() - 1, 1));
            }
        }
        if (param === 'today') {
            setDateNow(new Date(initialDate));
        }
    };

    const currentDateStyle = (index: number, date: Date) => {
        const d = new Date(date);
        if (index < lastDaysOfPrevMonth.length) return {color: 'grey'};
        if (index > daysOfMonth.length + lastDaysOfPrevMonth.length - 1) return {color: 'grey'};
        if (d.getDate() === initialDate.getDate() && d.getMonth() === initialDate.getMonth() && d.getFullYear() === initialDate.getFullYear()) return {background: 'lightblue'};
    };

    const getWeek = (date: IDate) => {
        const weeksArr = weeks(datesInTheMonth)
        for (let i = 0; i < 6; i++) {
            if (date.date.getTime() >= weeksArr[i].startTime.getTime()
                && date.date.getTime() <= weeksArr[i].endTime.getTime()
                && date.date.getMonth() >= weeksArr[i].startTime.getMonth()
                && date.date.getMonth() <= weeksArr[i].endTime.getMonth()
            ) {
                return weeksArr[i];
            }
        }
    };

    if (tasks) {
        datesInTheMonth = fillingTheDayWithTasks(datesInTheMonth, tasks, dateNow, 'month')
    }

    return (
        <div className={cl.calendar}>
            <div className={cl.calendarHeader}>
                <div className={cl.calendarMenu}>
                    <div className={cl.btn}>
                        <Button onClick={() => handleChangeMonth('prev')}>Предыдущий</Button>
                    </div>
                    <div className={cl.btn}>
                        <Button onClick={() => handleChangeMonth('today')}>{dateNow.toLocaleString('default', {month: 'long'})}</Button>

                    </div>
                    <div className={cl.btn}><Button onClick={() => handleChangeMonth('next')}>Следующий</Button>
                    </div>

                </div>
                {dayName.map(day =>
                    <div className={cl.weekDay} key={day}>{day}</div>
                )}
            </div>
            <div className={cl.daysWrapper}>
                <div className={cl.monthDays}>
                    {datesInTheMonth.map((day, index) =>
                        <div className={cl.day} style={currentDateStyle(index, day.date)} key={index}>{day.day}</div>
                    )}
                </div>
                <div className={cl.tasksWrapper}>
                    {datesInTheMonth.map((date, monthIndex) => (
                        <div className={cl.taskDay} key={monthIndex}>
                            <div className={cl.taskWrapper}>
                                {date.dayTasks.map((task, index) =>
                                    <div key={index}>
                                        {checkIndex(index)
                                            ? <div>
                                                <TaskMonth task={task} day={date} week={getWeek(date)}/>
                                                {task.start.getDate() !== date.date.getDate() && date.date.getDay() !== 1
                                                && date.date.getTime() <= task.firstEnd.getTime()
                                                    ? <div className={cl.emptyDiv}></div>
                                                    : ''
                                                }
                                            </div>
                                            : ''
                                        }
                                    </div>
                                )}
                            </div>
                            <div className={cl.dayTaskCountWrapper}>
                                {getIndexOfDay(date)
                                    ? <div className={cl.dayTaskCount}
                                           onClick={() => console.log(date.dayTasks)}>
                                        {date.dayTasks.length - 3 === -1
                                            ? <div className={cl.nested}>Ещё: 2</div>
                                            : <div className={cl.nested}>{
                                                date.dayTasks.length > 3
                                                    ? ''
                                                    : <div className={cl.nested}>Ещё: {date.dayTasks.length}</div>
                                            }</div>
                                        }
                                    </div>
                                    : ''
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Month;
