import React, {FC, useEffect, useState} from 'react';
import cl from "./CalendarComponent.module.css";
import DropDownMenu from "../../../UI/DropDownMenu/DropDownMenu";
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

const CalendarComponent: FC<CalendarComponentProps> = ({tasks}) => {
    if (!localStorage.getItem('CalendarMode')) localStorage.setItem('CalendarMode', 'Месяц')

    const [createTaskWindowIsVisible, setCreateTaskWindowIsVisible] = useState(false)

    const [firstDayFull, setFirstDayFull] = useState<WeekDaysFull.MONDAY | WeekDaysFull.SUNDAY>(WeekDaysFull.MONDAY);
    const [firstDay, setFirstDay] = useState<WeekDays.MON | WeekDays.SU>(WeekDays.MON);

    const [calendarMode, setCalendarMode] = useState(CalendarModes.MONTH)

    const modes = ["Месяц", "Неделя"]
    const firstDays = ['Понедельник', 'Воскресенье']

    const [calendar, setCalendar] = useState<Calendar>(new Calendar(calendarMode, firstDay, tasks))

    const handleChangeMode = (mode: CalendarModes) => {
        localStorage.setItem('CalendarMode', mode)
        setCalendarMode(mode)
    }

    useEffect(() => {
        // if (tasks.length !== 0)
        setCalendar(new Calendar(calendarMode, firstDay, tasks))

        if (localStorage.getItem('CalendarMode')
            && calendarMode !== localStorage.getItem('CalendarMode')) {
            //@ts-ignore
            setCalendarMode(localStorage.getItem('CalendarMode'))
        }
    }, [tasks.length, calendarMode])

    const calendarModes = [
        <MonthComponent firstDay={calendar.getFirstDay()} weekDays={calendar.getWeekDays()}
                        month={calendar.getMonth()}/>,
        <WeekComponent firstDay={calendar.getFirstDay()} weekDayNames={calendar.getWeekDays()}
                       week={calendar.getWeek()}/>
    ]

    const changeFirstDay = (day: WeekDaysFull.MONDAY | WeekDaysFull.SUNDAY) => {
        setFirstDayFull(day)
        switch (day) {
            case WeekDaysFull.SUNDAY:
                setFirstDay(WeekDays.SU)
                setCalendar(new Calendar(calendarMode, WeekDays.SU, tasks))
                break;
            case WeekDaysFull.MONDAY:
                setFirstDay(WeekDays.MON)
                setCalendar(new Calendar(calendarMode, WeekDays.MON, tasks))
        }
    }

    return (
        <div className={cl.wrapper}>
            <div className={cl.calendarMenu}>
                <div className={cl.calendarModeBtn}>
                    <DropDownMenu selectItem={calendarMode} setSelectItem={handleChangeMode}
                                  items={modes} type={"string"}
                                  position={"bottom"}/>
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
                    <Button onClick={() => setCreateTaskWindowIsVisible(true)}>Create new Task</Button>
                </div>


                <div className={cl.calendarSettingsBtn}>
                    <DropDownMenu selectItem={firstDayFull} setSelectItem={changeFirstDay}
                                  items={firstDays} type={"string"}
                                  position={"bottom"}/>
                </div>
            </div>
            {calendarModes[Object.values(CalendarModes).findIndex(value => value === calendarMode)]}
        </div>
    );
};

export default CalendarComponent;
