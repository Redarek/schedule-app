import React, {FC, useState} from 'react';
import Month from "../Calendar/Month/Month";
import ModalFullScreen from "../UI/ModalFullScreen/ModalFullScreen";
import CreateNewTask from "../CreateNewTask/CreateNewTask";
import Week from "../Calendar/Week/Week";
import cl from './Calendar.module.css'
import Button from "../UI/Button/Button";
import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import {ITasks} from "../../types/ITasks";

interface CalendarPageProps {
    tasks: ITasks[];
}

const CalendarComponent: FC<CalendarPageProps> = ({tasks}) => {
    const [visible, setVisible] = useState<boolean>(false)
    const [calendarDisplayMode, setCalendarDisplayMode] = useState('Месяц')
    const [calendarModeIndex, setCalendarModeIndex] = useState(0)
    //@todo сделать лоадер
    const calendarModes = [<Month tasks={tasks}/>, <Week tasks={tasks}/>]

    return (
        <div className={cl.wrapper}>
            <div className={cl.calendarMenu}>
                <div className={cl.calendarModeBtn}>
                    <DropDownMenu
                        menuType={"other"}
                        title={'Месяц'}
                        menuItems={['Месяц', 'Неделя']}
                        dropMenuItem={calendarDisplayMode}
                        setDropMenuItem={setCalendarDisplayMode}
                        viewMode={"bottom"}
                        setIndexOfSelectElem={setCalendarModeIndex}
                    />
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
