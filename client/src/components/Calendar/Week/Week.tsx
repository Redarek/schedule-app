import React, {FC, useState} from 'react';
import cl from './Week.module.css';
import {
    checkIndex,
    dayName,
    fillingTheDayWithTasks,
    getIndexOfDay,
    getLastDayOfMonth,
    getNumberOfTheDayOfTheMonth,
    initialDate
} from "../utils";
import {IDate} from "../../../types/IDate";
import {ITasks} from "../../../types/ITasks";
import LongTaskWeek from "./LongTaskWeek";
import DayTaskWeek from "./DayTaskWeek";
import Button from "../../UI/Button/Button";
import ModalFullScreen from "../../UI/ModalFullScreen/ModalFullScreen";
import TaskCard from "../../TaskCard/TaskCard";
import TasksListCalendar from "../../tasksListCalendar/TasksListCalendar";

interface IHour {
    time: number;
    timesOfADay: string
}

interface WeekProps {
    tasks: ITasks[]
}

const Week: FC<WeekProps> = ({tasks}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [tasksListIsVisible, setTasksListIsVisible] = useState<boolean>(false)
    const [taskInModal, setTaskInModal] = useState<ITasks>({} as ITasks)
    const [dayDate, setDayDate] = useState<IDate>({} as IDate)

    const [dateNow, setDateNow] = useState(new Date(initialDate));

    const lastDayOfThePrevMonth = getLastDayOfMonth(dateNow.getMonth(), dateNow.getFullYear());
    const numberOfTheFirstDayOfTheMonth = getNumberOfTheDayOfTheMonth(dateNow.getFullYear(), dateNow.getMonth());
    const lastDayOfTheMonth = getLastDayOfMonth(dateNow.getMonth() + 1, dateNow.getFullYear());

    let daysOfThePrevMonth: IDate[] = [];
    let daysOfTheThisWeek: IDate[] = [];
    let daysOfTheNextMonth: IDate[] = [];
    let fillingOption = 0;
    let daysOfTheWeek = [...daysOfTheThisWeek];

    const hours: IHour[] = [];

    const fillingDaysPrevMonth = () => {
        for (let i = 0; i < numberOfTheFirstDayOfTheMonth - 1; i++) {
            daysOfThePrevMonth[i] = {
                day: lastDayOfThePrevMonth - numberOfTheFirstDayOfTheMonth + i + 2,
                date: new Date(dateNow.getFullYear(), dateNow.getMonth(), lastDayOfThePrevMonth - numberOfTheFirstDayOfTheMonth + i + 2),
                dayTasks: []
            };
        }
    };

    const fillingDaysThisWeek = () => {
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

    const fillingDaysNextMonth = () => {
        for (let i = 0; i < 7; i++) {
            daysOfTheNextMonth[i] = {
                day: i + 1,
                date: new Date(dateNow.getFullYear(), dateNow.getMonth() + 1, i + 1),
                dayTasks: []
            };
        }

    };


    const daysWeekFillingOption = (count = 0) => {
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


    const fillingDaysWeek = () => {
        switch (fillingOption) {
            case 1:
                daysOfTheWeek = [...daysOfThePrevMonth, ...daysOfTheThisWeek];
                break;
            case 2:
                daysOfTheWeek = [...daysOfTheThisWeek, ...daysOfTheNextMonth];
                break;
        }
    };

    fillingDaysPrevMonth();
    fillingDaysThisWeek();
    fillingDaysNextMonth();
    daysWeekFillingOption();
    fillingDaysWeek();

    const handleChangeWeek = (param: string) => {
        if (param === 'next') {
            setDateNow(new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() + 7));
            // fillingOption = 0;
        }
        if (param === 'prev') {
            setDateNow(new Date(dateNow.getFullYear(), dateNow.getMonth(), dateNow.getDate() - 7));
            // fillingOption = 0;
        }
        if (param === 'today') {
            setDateNow(new Date(initialDate));
            // fillingOption = 0;
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

    if (tasks) {
        daysOfTheWeek = fillingTheDayWithTasks(daysOfTheWeek, tasks, dateNow, 'week');
    }

    const checkTask = (task: ITasks, date: Date, index: number) => {
        if (task.start.getDate() === date.getDate()
            && task.firstEnd.getDate() === date.getDate()
        ) {
            return <DayTaskWeek task={task} date={date} key={index} onClick={() => {
                setIsModalVisible(true);
                setTaskInModal(task)
            }}/>
        }
    }

    return (
        <div className="calendarWeek">
            {isModalVisible
                ? <ModalFullScreen visible={isModalVisible}
                                   setVisible={setIsModalVisible}
                                   exitBtn={true}
                                   exitBackground={true}
                >
                    <TaskCard task={taskInModal} setIsModalVisible={setIsModalVisible}/>
                </ModalFullScreen>
                : ''
            }
            {tasksListIsVisible
                ? <ModalFullScreen visible={tasksListIsVisible}
                                   setVisible={setTasksListIsVisible}
                                   exitBtn={true}
                                   exitBackground={true}>
                    <TasksListCalendar date={dayDate.date} tasks={dayDate.dayTasks}/>
                </ModalFullScreen>
                : ''
            }
            <div className={cl.wrapper}>
                <div className={cl.calendarHeader}>
                    <div className={cl.calendarMenu}>
                        <div className={cl.btn}>
                            <Button onClick={() => handleChangeWeek('prev')}>Предыдущая</Button>
                        </div>
                        <div className={cl.btn}>
                            <Button
                                onClick={() => handleChangeWeek('today')}>{dateNow.toLocaleString('default', {month: 'long'})}</Button>
                        </div>
                        <div className={cl.btn}>
                            <Button onClick={() => handleChangeWeek('next')}>Следующая</Button>
                        </div>
                    </div>
                    <div className={cl.headerInfo}>
                        {dayName.map(day =>
                            <div className={cl.weekDay} key={day}>{day}</div>
                        )}
                        {daysOfTheWeek.map(day =>
                            <div className={cl.calendarHeaderDay} style={currentDayStyle(day)} key={day.day}>
                                {day.day}
                            </div>
                        )}
                    </div>
                </div>
                <div className={cl.longTermWrapper}>
                    <div className={cl.longTerm}></div>
                    {daysOfTheWeek.map(day =>
                        <div className={cl.longTerm} key={day.day}>
                            {day.dayTasks.map((task, index) =>
                                <div key={index}>
                                    {checkIndex(index)
                                        ? <div>
                                            {task.start.getDate() === task.firstEnd.getDate() && task.start.getMonth() === task.firstEnd.getMonth()
                                                ? ''
                                                : <LongTaskWeek days={daysOfTheWeek} task={task} date={day}
                                                                onClick={() => {
                                                                    setIsModalVisible(true);
                                                                    setTaskInModal(task)
                                                                }}/>
                                            }
                                            {task.start.getDate() !== day.date.getDate() && day.date.getDay() !== 1
                                            && day.date.getTime() <= task.firstEnd.getTime()
                                                ? <div className={cl.emptyDiv}></div>
                                                : ''
                                            }
                                        </div>
                                        : ''
                                    }
                                </div>
                            )}
                            <div className={cl.dayTaskCountWrapper}>
                                {getIndexOfDay(day)
                                    ? <div className={cl.dayTaskCount}
                                           onClick={() => {
                                               setTasksListIsVisible(true);
                                               setDayDate(day)
                                           }}>
                                        {day.dayTasks.length - 3 === -1
                                            ? <div className={cl.nested}>Ещё: 2</div>
                                            : <div className={cl.nested}>{
                                                day.dayTasks.length > 3
                                                    ? ''
                                                    : <div className={cl.nested}>Ещё: {day.dayTasks.length}</div>
                                            }</div>
                                        }
                                    </div>
                                    : ''
                                }
                            </div>
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
                                    {day.dayTasks.map((task, index) =>
                                        checkTask(task, day.date, index)
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
