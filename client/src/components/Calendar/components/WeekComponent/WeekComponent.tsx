import React, {FC, Fragment, useEffect, useState} from 'react';
import cl from './WeekComponent.module.css'
import {WeekDays} from "../../models/Calendar";
import {Week} from "../../models/Week";
import Button from "../../../UI/Button/Button";
import {ITasks} from "../../../../types/ITasks";
import ModalFullScreen from "../../../UI/ModalFullScreen/ModalFullScreen";
import TaskCard from "../../../TaskCard/TaskCard";
import TaskComponent from "../MonthComponent/TaskComponent";
import DayTaskWeek from "./DayTaskWeek";

interface WeekComponentProps {
    firstDay: WeekDays.SU | WeekDays.MON,
    weekDayNames: WeekDays[],
    week: Week
}

interface IHour {
    time: number | '',
    partOfDay: "PM" | "AM" | '',
}

const WeekComponent: FC<WeekComponentProps> = ({weekDayNames, firstDay, week}) => {
    const [weekDays, setWeekDays] = useState(week.getDays())

    const [selectTask, setSelectTask] = useState({} as ITasks)
    const [taskInfoIsVisible, setTaskInfoIsVisible] = useState(false)

    useEffect(() => {
        setWeekDays(week.getDays())
    }, [firstDay, week])

    const handleChangeWeek = (code: 'prev' | 'next' | 'current') => {
        switch (code) {
            case "current":
                week.currentWeek()
                setWeekDays(week.getDays())
                break;
            case "next":
                week.nextWeek()
                setWeekDays(week.getDays())
                break;
            case "prev":
                week.previousWeek()
                setWeekDays(week.getDays())
                break;
        }
        setCurrentWeek(week.getCurrentDate())
    }


    const indexOfFirstDay = week.getIndexOfFirstDay()

    const [currentWeek, setCurrentWeek] = useState(week.getCurrentDate())


    let hours: IHour[] = [];

    const fillingHours = () => {
        for (let i = 0; i < 25; i++) {
            hours[i] = {
                time: i,
                partOfDay: (i >= 12) ? 'PM' : 'AM',
            };
        }
        hours[24] = {
            time: '',
            partOfDay: '',
        }
    };

    fillingHours()

    const pxInMs = 1200 / 86400000

    function timeMarkerMarginTop() {
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        const timeInDay = new Date().getTime() - date.getTime()
        let mTop = pxInMs * timeInDay + 50
        return mTop
    }

    function timeMarkerMarginLeft() {
        const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getDay()
        let mLeft = 0
        if (indexOfFirstDay === 1 && date === 0) mLeft = 100 / 7 * 6
        else mLeft = 100 / 7 * (date - indexOfFirstDay)

        return mLeft
    }

    return (
        <div className={cl.week}>
            {taskInfoIsVisible
                ?
                <ModalFullScreen visible={taskInfoIsVisible}
                                 setVisible={setTaskInfoIsVisible}
                                 exitBtn={true}
                                 exitBackground={true}
                >
                    <TaskCard task={selectTask} setIsModalVisible={setTaskInfoIsVisible}/>
                </ModalFullScreen>

                : ''
            }
            <div className={cl.weekMenu}>
                <div className={cl.btn}>
                    <Button onClick={() => handleChangeWeek('prev')}>Предыдущая</Button>
                </div>
                <div className={cl.btnCurrent}>
                    <Button onClick={() => handleChangeWeek('current')}>{currentWeek}</Button>
                </div>

                <div className={cl.btn}>
                    <Button onClick={() => handleChangeWeek('next')}>Следующая</Button>
                </div>
            </div>
            <div className={cl.weekHeader}>
                {weekDayNames.map((day, index) =>
                    <div className={cl.weekDayName} key={day}>
                        {day}
                        <p className={cl.weekDayDate}>{weekDays[index].date.getDate()}</p>
                    </div>
                )}
                {weekDays.map(day =>
                    <div key={day.date.getTime()} className={cl.weekDayDates}>
                        <div className={cl.dayTasks}>
                            {day.tasks.map((task, index) =>
                                <Fragment key={index}>
                                    {index - 3 < 0
                                        ? ((task.start.getDate() === day.date.getDate() || day.date.getDay() === indexOfFirstDay)
                                            && (new Date(task.firstEnd.getFullYear(), task.firstEnd.getMonth(), task.firstEnd.getDate()).getTime() !== new Date(task.start.getFullYear(), task.start.getMonth(), task.start.getDate()).getTime()))
                                            ? <TaskComponent day={day} task={task} indexOfFirstDay={indexOfFirstDay}
                                                             setSelectTask={setSelectTask}
                                                             setTaskInfoIsVisible={setTaskInfoIsVisible}
                                            />
                                            : <div className={cl.emptyDiv}></div>
                                        : ''
                                    }
                                </Fragment>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className={cl.weekHours}>
                <div className={cl.hours}>
                    {hours.map(hour =>
                        <div className={cl.hourValue} key={hour.time + hour.partOfDay}>
                            {hour.time} {hour.partOfDay}
                        </div>
                    )}
                </div>
                <div className={cl.weekDates}>
                    {weekDays.findIndex(day => day.date.getTime() === new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()) !== -1
                        ? <div
                            style={{marginTop: `${timeMarkerMarginTop()}px`, marginLeft: `${timeMarkerMarginLeft()}%`}}
                            className={cl.timeMarker}>
                            <div className={cl.timeMarkerCircle}></div>
                        </div>
                        : ''
                    }

                    {weekDays.map(day => <div className={cl.weekDay} key={day.date.getTime()}>
                            {hours.map(hour =>
                                <div className={cl.hourCell} key={hour.time}></div>
                            )}
                        </div>
                    )}

                    <div className={cl.calendarTasks}>


                        {weekDays.map(day =>
                            <div className={cl.tasksWrapper} key={day.date.getTime()}>
                                {/*{new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime() === day.date.getTime()*/}
                                {/*    ? <div style={{marginTop: `${timeMarkerMarginTop(day.date)}px`}}*/}
                                {/*           className={cl.timeMarker}>*/}
                                {/*        <div className={cl.timeMarkerCircle}></div>*/}
                                {/*    </div>*/}
                                {/*    : ''*/}
                                {/*}*/}

                                {day.tasks.map((task, index) =>
                                    task.start.getDate() === day.date.getDate()
                                    && task.firstEnd.getDate() === day.date.getDate()
                                        ? <DayTaskWeek day={day.date} task={task} key={index} onClick={() => {
                                            setTaskInfoIsVisible(true);
                                            setSelectTask(task)
                                        }}/>
                                        : ''
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeekComponent;
