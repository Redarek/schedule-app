import React, {FC, useEffect, useState} from 'react';
import cl from './Week.module.css';
import {dayName, getLastDayOfMonth, getNumberOfTheDayOfTheMonth, initialDate} from "../index";
import {IDate} from "../../../types/IDate";
import {ITask} from "../../../types/ITask";
import TaskWeek from "./TaskWeek";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchTasks} from "../../../store/reducers/ActionCreators";

interface IHour {
    time: number;
    timesOfADay: string
}

const Week: FC = () => {
    const dispatch = useAppDispatch()
    const [dateNow, setDateNow] = useState(new Date(initialDate));

    //@todo Перенести получение тасков из компонента на страницу
    const {tasks, isLoading, error} = useAppSelector(state => state.taskSlice)

    useEffect(() => {
        if (tasks.length === 0) dispatch(fetchTasks())
    }, [])

    const lastDayOfThePrevMonth = getLastDayOfMonth(dateNow.getMonth(), dateNow.getFullYear());
    const numberOfTheFirstDayOfTheMonth = getNumberOfTheDayOfTheMonth(dateNow.getFullYear(), dateNow.getMonth());
    const lastDayOfTheMonth = getLastDayOfMonth(dateNow.getMonth() + 1, dateNow.getFullYear());

    let daysOfThePrevMonth: IDate[] = [];
    let daysOfTheThisWeek: IDate[] = [];
    let daysOfTheNextMonth: IDate[] = [];
    let fillingOption = 0;
    let daysOfTheWeek = [...daysOfTheThisWeek];

    const hours: IHour[] = [];

    const fillingDaysOfThePrevMonth = () => {
        for (let i = 0; i < numberOfTheFirstDayOfTheMonth - 1; i++) {
            daysOfThePrevMonth[i] = {
                day: lastDayOfThePrevMonth - numberOfTheFirstDayOfTheMonth + i + 2,
                date: new Date(dateNow.getFullYear(), dateNow.getMonth(), lastDayOfThePrevMonth - numberOfTheFirstDayOfTheMonth + i + 2),
                dayTasks: []
            };
        }
    };

    const fillingDaysOfTheThisWeek = () => {
        for (let i = 0; i < 7; i++) {
            let c = dateNow.getDay();

            if (c === 0) c = 7;
            daysOfTheThisWeek[i] = {
                day: dateNow.getDate() - c + i + 1,
                date: new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - c + i + 1),
                dayTasks: []
            };
        }
    };

    const fillingDaysOfTheNextMonth = () => {
        for (let i = 0; i < 7; i++) {
            daysOfTheNextMonth[i] = {
                day: i + 1,
                date: new Date(dateNow.getFullYear(), dateNow.getMonth(), i + 1),
                dayTasks: []
            };
        }

    };


    const daysOfTheWeekFillingOption = (count = 0) => {
        for (let i = 0; i < 7; i++) {
            daysOfTheThisWeek.reverse();
            if (daysOfTheThisWeek[i].day <= lastDayOfTheMonth) {
                count++;
            }
        }
        if (count > 0) {
            daysOfTheThisWeek.reverse().splice(count, 7);
            daysOfTheNextMonth.splice(7 - count, 7);
            fillingOption = 2;
        }
        if (daysOfTheThisWeek[0].day < 1) {
            daysOfTheThisWeek.splice(0, daysOfThePrevMonth.length);
            fillingOption = 1;
        }
    };


    const fillingDaysOfTheWeek = () => {
        switch (fillingOption) {
            case 1:
                daysOfTheWeek = [...daysOfThePrevMonth, ...daysOfTheThisWeek];
                break;
            case 2:
                daysOfTheWeek = [...daysOfTheThisWeek, ...daysOfTheNextMonth];
                break;
        }
    };

    fillingDaysOfThePrevMonth();
    fillingDaysOfTheThisWeek();
    fillingDaysOfTheNextMonth();
    daysOfTheWeekFillingOption();
    fillingDaysOfTheWeek();

    const handleChangeWeek = (param: string) => {
        if (param === 'next') {
            setDateNow(new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + 7));
            fillingOption = 0;
        }
        if (param === 'prev') {
            setDateNow(new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 7));
            fillingOption = 0;
        }
        if (param === 'today') {
            setDateNow(new Date(initialDate));
            fillingOption = 0;
        }
    };


    const fillingHours = () => {
        for (let i = 0; i < 24; i++) {
            let t = 'AM';
            if (i >= 12) t = 'PM';
            hours[i] = {
                time: i,
                timesOfADay: t,
            };
        }
    };

    fillingHours();

    const taskPosition = (task: ITask) => {
        let margin = task.startTime.getHours() * 50 + 50;
        let height = -(task.startTime.getHours() - task.endTime.getHours()) * 50;
        if (task.startTime.getMinutes() <= 15 && task.startTime.getMinutes() >= 8) {
            margin = margin + 15
            height = height - 15
        }
        if (task.startTime.getMinutes() > 15 && task.startTime.getMinutes() <= 30) {
            margin = margin + 25
            height = height - 25

        }
        if (task.startTime.getMinutes() > 30 && task.startTime.getMinutes() <= 45) {
            margin = margin + 35
            height = height - 35

        }
        if (task.startTime.getMinutes() > 45 && task.startTime.getMinutes() <= 59) {
            margin = margin + 45
            height = height - 45
        }
        if (task.endTime.getMinutes() <= 15 && task.endTime.getMinutes() >= 8) {
            height = height + 15
        }
        if (task.endTime.getMinutes() > 15 && task.endTime.getMinutes() <= 30) {
            height = height + 25
        }
        if (task.endTime.getMinutes() > 30 && task.endTime.getMinutes() <= 45) {
            height = height + 35

        }
        if (task.endTime.getMinutes() > 45 && task.endTime.getMinutes() <= 59) {
            height = height + 45
        }

        return {height: `${height}px`, marginTop: `${margin}px`};
    };

    const taskOnTheDay = (task: ITask, day: IDate) => {
        const date = new Date(day.date);
        if (
            task.startTime.getDate() === date.getDate()
            && task.endTime.getDate() === date.getDate()
            && date.getMonth() === task.startTime.getMonth()
            && date.getFullYear() === task.startTime.getFullYear()
        ) {
            return <div
                key={task.title}
                className={cl.task}
                style={taskPosition(task)}
            >
                {task.title}
            </div>;

        }
    };

    const currentDayStyle = (day: IDate) => {
        let date = new Date(day.date);
        if (date.getFullYear() === initialDate.getFullYear()
            && initialDate.getMonth() === date.getMonth()
            && date.getDate() === initialDate.getDate()) return {background: 'lightblue'};
    };

    const currentHourStyle = (hour: IHour) => {
        const condition = dateNow.getHours() === hour.time
            && dateNow.getDate() === initialDate.getDate()
            && dateNow.getMonth() === initialDate.getMonth()
            && dateNow.getFullYear() === initialDate.getFullYear();
        if (hour.timesOfADay === 'AM') {
            if (condition) return {borderBottomColor: 'red', color: 'red'};
        }
        if (hour.timesOfADay === 'PM') {
            if (condition) return {borderBottomColor: 'red', color: 'red'};
        }
    };


    const counterOfTasksOnDay = (date: IDate, task: ITask) => {
        if (task.startTime.getDate() !== task.endTime.getDate()
            && date.date.getMonth()  === task.startTime.getMonth()
        ) {
            if (task.startTime.getTime() >= date.date.getDate()) {
                // console.log(task.startTime.getDate() <= date.date.getDate() )
                // console.log(date.date.getDate())
                // console.log(tasks[11].startTime.getDate())
                const startDay = daysOfTheWeek.findIndex(obj => date.date.getTime() === obj.date.getTime());
                const numOfDays = task.endTime.getDate() - task.startTime.getDate();
                for (let i = startDay; i <= 6; i++) {
                    if (!daysOfTheWeek[i].dayTasks.includes(task)) {
                        daysOfTheWeek[i].dayTasks.push(task);
                    } else {
                    }
                }
            }
        }
    };

    const fillingTheDayWithTasks = () => {
        for (let i = 0; i < daysOfTheWeek.length; i++) {
            for (let j = 0; j < tasks.length; j++) {
                if (tasks[j].startTime.getFullYear() === dateNow.getFullYear()) {
                    console.log(j + '' + tasks[j])
                    counterOfTasksOnDay(daysOfTheWeek[i], tasks[j]);
                }
            }
        }
    };

    if (tasks) {
        fillingTheDayWithTasks();
        // if (daysOfTheWeek[1].dayTasks[1]) console.log(daysOfTheWeek[1].dayTasks[1].startTime.getHours())
    }

    console.log(daysOfTheWeek)

    return (
        <div className="calendarWeek">
            <button onClick={() => handleChangeWeek('today')}>today</button>
            <button onClick={() => handleChangeWeek('prev')}>prev</button>
            <button onClick={() => handleChangeWeek('next')}>next</button>
            <div className={cl.wrapper}>
                <div className={cl.calendarHeader}>
                    {dayName.map(day =>
                        <div className={cl.weekDay} key={day}>{day}</div>
                    )}
                </div>
                <div className={cl.calendarHeader}>
                    {daysOfTheWeek.map(day =>
                        <div className={cl.calendarHeaderDay} style={currentDayStyle(day)} key={day.day}>
                            {day.day}
                        </div>
                    )}
                </div>
                <div className={cl.longTermWrapper}>
                    <div className={cl.longTermFirstDiv}>
                        <wbr/>
                    </div>
                    {daysOfTheWeek.map(day =>
                        <div className={cl.longTerm} key={day.day}>
                            {/*<wbr/>*/}
                            {tasks.map(task =>
                                <TaskWeek days={daysOfTheWeek} task={task} date={day}/>
                            )}
                        </div>
                    )}
                </div>
                <div className={cl.calendarWrapper}>
                    <div className={cl.hours}>
                        {hours.map(hour =>
                            <div className={cl.hourValue} key={hour.time + hour.timesOfADay}
                                 style={currentHourStyle(hour)}>{hour.time} {hour.timesOfADay}</div>
                        )}
                    </div>
                    <div className={cl.calendar}>
                        <div className={cl.calendarDays}>
                            {daysOfTheWeek.map(day => <div className={cl.calendarDay} key={day.day}>
                                    {hours.map(hour =>
                                        <div className={cl.hourDiv} key={hour.time}></div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className={cl.calendarTasks}>
                            {daysOfTheWeek.map(day =>
                                <div className={cl.tasksWrapper} key={day.day}>
                                    {tasks.map(task =>
                                        taskOnTheDay(task, day)
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Week;
