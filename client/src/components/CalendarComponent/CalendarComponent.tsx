import React, {FC, useEffect, useState} from 'react';
import Month from "../Calendar/Month/Month";
import ModalFullScreen from "../UI/ModalFullScreen/ModalFullScreen";
import CreateNewTask from "../CreateNewTask/CreateNewTask";
import Week from "../Calendar/Week/Week";
import cl from './Calendar.module.css'
import Button from "../UI/Button/Button";
import {ITasks} from "../../types/ITasks";
import DropDownMenuV2 from "../UI/DropDownMenu/DropDownMenuV2";

interface CalendarPageProps {
    tasks: ITasks[];
}

const CalendarComponent: FC<CalendarPageProps> = ({tasks}) => {
    const [visible, setVisible] = useState<boolean>(false)

    const modeItems = ['Месяц', 'Неделя']
    const [mode, setMode] = useState<string>(modeItems[0])
    const [calendarModeIndex, setCalendarModeIndex] = useState<number>(0)

    useEffect(() => {
        setCalendarModeIndex(modeItems.findIndex(modeItem => modeItem === mode))
    }, [mode])

    const calendarModes = [<Month tasks={tasks}/>, <Week tasks={tasks}/>]

    return (
        <div className={cl.wrapper}>
            <div className={cl.calendarMenu}>
                <div className={cl.calendarModeBtn}>
                    <DropDownMenuV2 selectItem={mode} setSelectItem={setMode} items={modeItems} type={"string"} position={"bottom"}/>
                </div>
                {visible
                    ? <ModalFullScreen visible={visible} exitBtn={true} setVisible={setVisible} exitBackground={false}>
                        <CreateNewTask setModalVisible={setVisible}/>
                    </ModalFullScreen>
                    : ''
                }

                <div className={cl.createTaskBtn}>
                    <Button onClick={() => setVisible(true)}>Create new Task</Button>
                </div>
            </div>
            {calendarModes[calendarModeIndex]}
        </div>
    );
};

export default CalendarComponent;
