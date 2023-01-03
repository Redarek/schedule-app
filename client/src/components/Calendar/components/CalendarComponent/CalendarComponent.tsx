import React, {FC, useEffect, useState} from 'react';

import cl from "./CalendarComponent.module.css";
import DropDownMenu from "../../../UI/DropDownMenu/DropDownMenu";
import MonthComponent from "../MonthComponent/MonthComponent";
import WeekComponent from "../WeekComponent/WeekComponent";
import {Calendar, CalendarModes, WeekDays} from "../../models/Calendar";
import Button from "../../../UI/Button/Button";
import {ITasks} from "../../../../types/ITasks";
import ModalFullScreen from "../../../UI/ModalFullScreen/ModalFullScreen";
import CreateNewTask from "../../../CreateNewTask/CreateNewTask";

interface CalendarComponentProps {
    tasks: ITasks[]
}

const CalendarComponent: FC<CalendarComponentProps> = ({tasks}) => {
    const [createTaskWindowIsVisible, setCreateTaskWindowIsVisible] = useState(false)
    const [firstDay, setFirstDay] = useState<WeekDays.MON | WeekDays.SU>(WeekDays.MON);
    const [calendar, setCalendar] = useState<Calendar>(new Calendar(firstDay, tasks))

    useEffect(() => {
        setCalendar(new Calendar(firstDay, tasks))
    }, [tasks])

    const calendarModes = [
        <MonthComponent calendarLocation={calendar.getFirstDay()} weekDays={calendar.getWeekDays()}
                        month={calendar.getMonth()}/>,
        <WeekComponent calendarLocation={calendar.getFirstDay()} weekDays={calendar.getWeekDays()}/>
    ]

    const [calendarMode, setCalendarMode] = useState(calendar.getMode())
    const [calendarIndex, setCalendarIndex] = useState(calendar.getModeIndex())

    const setMode = (mode: CalendarModes) => {
        calendar.setMode(mode)
        setCalendarMode(calendar.getMode())
        setCalendarIndex(calendar.getModeIndex())
    }

    const changeFirstDay = () => {
        firstDay === WeekDays.MON ? setFirstDay(WeekDays.SU) : setFirstDay(WeekDays.MON)
        setCalendar(new Calendar(firstDay === WeekDays.MON ? WeekDays.SU : WeekDays.MON, tasks))
    }

    return (
        <div className={cl.wrapper}>

            <div className={cl.calendarMenu}>
                <div className={cl.calendarModeBtn}>
                    <DropDownMenu selectItem={calendarMode} setSelectItem={setMode}
                                  items={Object.values(CalendarModes)} type={"string"}
                                  position={"bottom"}/>
                </div>

                {createTaskWindowIsVisible
                    ? <ModalFullScreen visible={createTaskWindowIsVisible} exitBtn={true}
                                       setVisible={setCreateTaskWindowIsVisible} exitBackground={false}>
                        <CreateNewTask setModalVisible={setCreateTaskWindowIsVisible}/>
                    </ModalFullScreen>
                    : ''
                }

                <div className={cl.createTaskBtn}>
                    <Button onClick={() => setCreateTaskWindowIsVisible(true)}>Create new Task</Button>
                </div>


                {/*<div className={cl.calendarSettingsBtn}>*/}
                {/*    <Button onClick={changeFirstDay}>ChangeMode</Button>*/}
                {/*</div>*/}
            </div>

            {calendarModes[calendarIndex]}
        </div>
    );
};

export default CalendarComponent;
