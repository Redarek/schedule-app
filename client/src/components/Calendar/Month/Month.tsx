import React, {FC, useEffect} from 'react';
import {useState} from "react";
import cl from './Month.module.css';
import {dayName, getLastDayOfMonth, getNumberOfTheDayOfTheMonth, initialDate} from "../index";

import {IDate} from "../../../types/IDate";
import {ITask} from "../../../types/ITask";
import TaskMonth from "./TaskMonth";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchTasks} from "../../../store/reducers/ActionCreators";


const Month: FC = () => {
        //@todo Перенести получение тасков из компонента на страницу где будет расположен компонент
        //@todo Сделать нормальные стили для месячного календаря
        const dispatch = useAppDispatch()
        const {tasks, isLoading, error} = useAppSelector(state => state.taskSlice)

        useEffect(() => {
            if (tasks.length === 0) dispatch(fetchTasks())
        }, [])

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

        const datesInTheMonth = [...lastDaysOfPrevMonth.reverse(), ...daysOfMonth, ...firstDaysOfNextMoth];

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

        const week1 = {
            startTime: datesInTheMonth[0].date,
            endTime: datesInTheMonth[6].date,
            counter: 0
        };
        const week2 = {
            startTime: datesInTheMonth[7].date,
            endTime: datesInTheMonth[13].date,
            counter: 0
        };
        const week3 = {
            startTime: datesInTheMonth[14].date,
            endTime: datesInTheMonth[20].date,
            counter: 0
        };
        const week4 = {
            startTime: datesInTheMonth[21].date,
            endTime: datesInTheMonth[27].date,
            counter: 0
        };
        const week5 = {
            startTime: datesInTheMonth[28].date,
            endTime: datesInTheMonth[34].date,
            counter: 0
        };
        const week6 = {
            startTime: datesInTheMonth[35].date,
            endTime: datesInTheMonth[41].date,
            counter: 0
        };

        const weeks = [week1, week2, week3, week4, week5, week6,];


        const getWeek = (date: IDate) => {
            for (let i = 0; i < 6; i++) {
                if (date.date.getTime() >= weeks[i].startTime.getTime()
                    && date.date.getTime() <= weeks[i].endTime.getTime()
                    && date.date.getMonth() >= weeks[i].startTime.getMonth()
                    && date.date.getMonth() <= weeks[i].endTime.getMonth()
                ) {
                    return weeks[i];
                }
            }
        };


        const counterOfTasksOnDay = (date: IDate, task: ITask) => {
            if (date.date.getTime() >= task.startTime.getTime()
                && date.date.getTime() <= task.endTime.getTime()
                // date.date.getDate() <= task.startTime.getDate()
                // && date.date.getMonth() === task.startTime.getMonth()
                // && date.date.getMonth() === task.endTime.getMonth()
            ) {
                // let startDay = 0
                //  if (task.startTime.getMonth() === dateNow.getMonth()) {
                //      startDay = datesInTheMonth.findIndex(obj => obj.date.getDate() === task.startTime.getDate());
                //  }

                // if (task.startTime.getMonth() !== dateNow.getMonth()) {
                // const startDay = datesInTheMonth.findIndex(obj => obj.date.getDate() === task.startTime.getDate());
                // }
                // const numOfDays = task.endTime.getDate() - task.startTime.getDate();
                // console.log(task)
                // if (startDay !== 41) {
                //     for (let i = startDay; i <= startDay + numOfDays; i++) {
                //         if (datesInTheMonth[i].date.getTime() >= task.startTime.getTime()) {
                //             if (task.title === '24-28/09') {
                //                 console.log(task)
                //                 console.log(startDay)
                //                 console.log(numOfDays)
                //             }
                //             // console.log(task)
                //             if (!datesInTheMonth[i].dayTasks.includes(task)) {
                //                 datesInTheMonth[i].dayTasks.push(task);
                //             } else {
                //             }
                //         }
                //     }
                // }

                if (!date.dayTasks.includes(task)) {
                    date.dayTasks.push(task);
                }
            }
        };

        const fillingTheDayWithTasks = () => {
            for (let i = 0; i < datesInTheMonth.length; i++) {
                for (let j = 0; j < tasks.length; j++) {
                    if (tasks[j].startTime.getFullYear() === dateNow.getFullYear()) {
                        counterOfTasksOnDay(datesInTheMonth[i], tasks[j]);
                    }
                }
            }
        };


        const getIndexOfDay = (day: IDate) => {
            let indexOfDay = 0;
            for (let i = 0; i < day.dayTasks.length; i++) {
                indexOfDay = i;
            }
            return indexOfDay;
        };

        if (tasks) {
            fillingTheDayWithTasks();
        }

        const createEmptyDivFirst = (tasks: ITask[], task: ITask, index: number, date: IDate) => {
            // console.log(date.dayTasks)
            if (index !== 0) {
                if (task.startTime.getDate() <= tasks[index - 1].endTime.getDate() && date.dayTasks.length > 2) {
                    return true
                }

            } else return false
        }
        const createEmptyDivSecond = (tasks: ITask[], task: ITask, index: number, date: IDate) => {
            if (index !== 0) {
                if (task.startTime.getDate() <= tasks[index - 1].endTime.getDate()) {
                    return true
                }
            } else return false
        }
        const createEmptyDivThird = (tasks: ITask[], task: ITask, index: number, date: IDate) => {
            if (task.startTime.getDate() === date.date.getDate() && !createEmptyDivSecond(tasks, task, index, date) && createEmptyDivFirst(tasks, task, index, date)) {
                return true
            } else return false
        }

        console.log(datesInTheMonth)
        console.log(tasks)
        return (
            <div className={cl.calendar}>
                {dateNow.toLocaleString('default', {month: 'long'})}
                <button onClick={() => handleChangeMonth('today')}>today</button>
                <button onClick={() => handleChangeMonth('prev')}>prev</button>
                <button onClick={() => handleChangeMonth('next')}>next</button>
                <div className={cl.calendarHeader}>
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
                                            {index === 0
                                                ? <div>
                                                    <TaskMonth task={task} day={date} week={getWeek(date)}/>
                                                    {/*<div className={cl.emptyDiv}>1</div>*/}

                                                    {task.startTime.getDate() !== date.date.getDate() && date.date.getDay() !== 1
                                                    && date.date.getTime() <= task.endTime.getTime()
                                                        ? <div>
                                                                {/*<div>*/}
                                                                   <div className={cl.emptyDiv}></div>

                                                                {/*</div>*/}
                                                            {/*{index !== date.dayTasks.length - 1*/}
                                                            {/*    ? <div>{*/}
                                                            {/*        date.dayTasks[index+1].endTime <= task.startTime*/}
                                                            {/*        ? <div className={cl.emptyDiv}>he</div>*/}
                                                            {/*            : ''*/}
                                                            {/*    }</div>*/}
                                                            {/*    : ''*/}
                                                            {/*}*/}
                                                        </div>
                                                        : ''
                                                    }
                                                </div>
                                                : ''
                                            }
                                            {index === 1
                                                ? <div>
                                                    <TaskMonth task={task} day={date} week={getWeek(date)}/>
                                                    {task.startTime.getDate() !== date.date.getDate() && date.date.getDay() !== 1
                                                    && date.date.getTime() <= task.endTime.getTime()
                                                        ?
                                                        <div>
                                                            {date.dayTasks[2]
                                                            ?<div>
                                                                    {/*{date.dayTasks[2].startTime.getDate() === date.date.getDate()*/}
                                                                    {/*    ?   ''*/}
                                                                    {/*    : */}
                                                                    <div className={cl.emptyDiv}>
                                                                        </div>
                                                                    {/*}*/}
                                                                </div>
                                                            : ''
                                                            }

                                                            {/*<div className={cl.emptyDiv}>2</div>*/}
                                                        </div>
                                                        : ''
                                                    }
                                                </div>
                                                : ''
                                            }
                                            {index === 2
                                                ? <div>
                                                    <TaskMonth task={task} day={date} week={getWeek(date)}/>
                                                    {task.startTime.getDate() !== date.date.getDate() && date.date.getDay() !== 1
                                                        ? <div className={cl.emptyDiv}></div>
                                                        : ''
                                                    }
                                                </div>
                                                : ''
                                            }

                                            {/*{index >= 3*/}
                                            {/*    ? ''*/}
                                            {/*    : <div className={cl.nested}>*/}
                                            {/*        {date.date.getDate() === task.startTime.getDate()*/}
                                            {/*            ? <div>*/}
                                            {/*                /!*{createEmptyDivSecond(tasks, task, index, date)*!/*/}
                                            {/*                /!*    ? <div className={cl.emptyDiv}></div>*!/*/}
                                            {/*                /!*    : ''*!/*/}
                                            {/*                /!*}*!/*/}
                                            {/*                /!*{createEmptyDivThird(tasks, task, index, date)*!/*/}
                                            {/*                /!*    ? <div className={cl.emptyDiv}></div>*!/*/}
                                            {/*                /!*    : ''*!/*/}
                                            {/*                /!*}*!/*/}
                                            {/*                /!*{createEmptyDivFirst(tasks, task, index, date)*!/*/}
                                            {/*                /!*    ? <div className={cl.emptyDiv}></div>*!/*/}
                                            {/*                /!*    : ''*!/*/}
                                            {/*                /!*}*!/*/}
                                            {/*                /!*{createEmptyDivThird(tasks, task, index, date)*!/*/}
                                            {/*                /!*    ? <div className={cl.emptyDiv}></div>*!/*/}
                                            {/*                /!*    : ''*!/*/}
                                            {/*                /!*}*!/*/}
                                            {/*                <TaskMonth task={task} day={date}*/}
                                            {/*                           week={getWeek(date)}/>*/}
                                            {/*            </div>*/}
                                            {/*            : <div className={cl.nested}>*/}
                                            {/*                {date.date.getDay() === 1*/}
                                            {/*                    ? <div className={cl.nested}>*/}
                                            {/*                        <TaskMonth task={task}*/}
                                            {/*                                   day={date}*/}
                                            {/*                                   week={getWeek(date)}*/}
                                            {/*                        />*/}
                                            {/*                    </div>*/}
                                            {/*                    : <div className={cl.nested}>*/}
                                            {/*                        {date.date.getDate() <= task.endTime.getDate() && date.date.getDate() >= task.startTime.getDate()*/}
                                            {/*                            ? <div className={cl.nested}>*/}
                                            {/*                                <TaskMonth*/}
                                            {/*                                    task={task} day={date}*/}
                                            {/*                                    week={getWeek(date)}*/}
                                            {/*                                />*/}
                                            {/*                                <div className={cl.emptyDiv}></div>*/}
                                            {/*                            </div>*/}
                                            {/*                            : <div className={cl.nested}>*/}
                                            {/*                                {date.dayTasks[date.dayTasks.length - 1]*/}
                                            {/*                                    ? <div className={cl.nested}>*/}
                                            {/*                                        {task.startTime.getDate() <= date.dayTasks[date.dayTasks.length - 1].startTime.getDate()*/}
                                            {/*                                            ?*/}
                                            {/*                                            <TaskMonth*/}
                                            {/*                                                task={task} day={date}*/}
                                            {/*                                                week={getWeek(date)}*/}
                                            {/*                                            />*/}
                                            {/*                                            : ''*/}
                                            {/*                                        }*/}
                                            {/*                                    </div>*/}
                                            {/*                                    : ''*/}
                                            {/*                                }*/}
                                            {/*                            </div>*/}
                                            {/*                        }*/}
                                            {/*                    </div>*/}
                                            {/*                }*/}
                                            {/*            </div>*/}
                                            {/*        }*/}
                                            {/*    </div>*/}
                                            {/*}*/}
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
    }
;

export default Month;
