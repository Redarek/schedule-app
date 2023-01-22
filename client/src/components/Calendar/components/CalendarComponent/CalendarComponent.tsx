import React, {FC, useEffect, useState} from 'react';
import cl from "./CalendarComponent.module.css";
import MonthComponent from "../MonthComponent/MonthComponent";
import WeekComponent from "../WeekComponent/WeekComponent";
import {Calendar} from "../../models/Calendar";
import {CalendarModes, WeekDays, WeekDaysFull} from "../../models/CalendarTypes";
import Button from "../../../UI/Button/Button";
import {ITasks} from "../../../../types/ITasks";
import ModalFullScreen from "../../../UI/ModalFullScreen/ModalFullScreen";
import CreateNewTask from "../../../CreateNewTask/CreateNewTask";

interface CalendarComponentProps {
    tasks: ITasks[]
}

// const calendarModes = Object.values(CalendarModes)

const CalendarComponent: FC<CalendarComponentProps> = ({tasks}) => {
    if (!localStorage.getItem('CalendarMode')) localStorage.setItem('CalendarMode', 'Неделя')

    const [createTaskWindowIsVisible, setCreateTaskWindowIsVisible] = useState(false)

    const [firstDay, setFirstDay] = useState<WeekDays.MON | WeekDays.SU>(WeekDays.MON);

    const [calendarMode, setCalendarMode] = useState(CalendarModes.MONTH)


    const [calendar, setCalendar] = useState<Calendar>(new Calendar(calendarMode, firstDay, tasks))

    const handleChangeMode = (mode: CalendarModes) => {
        localStorage.setItem('CalendarMode', mode)
        setCalendarMode(mode)
    }

    useEffect(() => {
        setCalendar(new Calendar(calendarMode, firstDay, tasks))

        // if (localStorage.getItem('CalendarMode')
        //     && calendarMode !== localStorage.getItem('CalendarMode')) {
        //     //@ts-ignore
        //     setCalendarMode(localStorage.getItem('CalendarMode'))
        // }
    }, [tasks, calendarMode, firstDay])

    const calendarModes = [
        <MonthComponent firstDay={calendar.getFirstDay()} weekDays={calendar.getWeekDays()}
                        month={calendar.getMonth()}/>,
        <WeekComponent firstDay={calendar.getFirstDay()} weekDayNames={calendar.getWeekDays()}
                       week={calendar.getWeek()}/>
    ]

    return (
        <div className={cl.wrapper}>
            <div className={cl.calendarMenu}>
                <div className={cl.calendarModeBtn}>
                    <input
                        type="radio"
                        id={'month-mode'}
                        // value={calendarModes[0]}
                        checked={calendarMode === CalendarModes.MONTH}
                        onChange={() => setCalendarMode(CalendarModes.MONTH)}
                    /><label htmlFor={'month-mode'}>Месяц</label>
                    <input
                        type="radio"
                        id={'week-mode'}
                        checked={calendarMode === CalendarModes.WEEK}
                        onChange={() => setCalendarMode(CalendarModes.WEEK)}
                    /> <label htmlFor={'week-mode'}>Неделя</label>
                </div>
                {createTaskWindowIsVisible
                    ? <ModalFullScreen visible={createTaskWindowIsVisible} exitBtn={true}
                                       setVisible={setCreateTaskWindowIsVisible} exitBackground={false}>
                        <CreateNewTask
                            startDate={new Date()}
                            setModalVisible={setCreateTaskWindowIsVisible}/>
                    </ModalFullScreen>
                    : ''
                }
                <div className={cl.createTaskBtn}>
                    <Button onClick={() => setCreateTaskWindowIsVisible(true)}>Создать задачу</Button>
                </div>
                <div className={cl.calendarSettingsBtn}>
                    <input
                        type="radio"
                        id={'mon-first'}
                        checked={firstDay === WeekDays.MON}
                        onChange={() => setFirstDay(WeekDays.MON)}
                    /><label htmlFor={'mon-first'}>Понедельник</label>
                    <input
                        type="radio"
                        id={'sun-first'}
                        checked={firstDay === WeekDays.SU}
                        onChange={() => setFirstDay(WeekDays.SU)}
                    /> <label htmlFor={'sun-first'}>Воскресенье</label>
                </div>
            </div>
            {calendarModes[Object.values(CalendarModes).findIndex(value => value === calendarMode)]}
        </div>
    );
};

export default CalendarComponent;
