import React, {useEffect, useState} from 'react';
import Month from "../components/Calendar/Month/Month";
import ModalFullScreen from "../components/UI/ModalFullScreen/ModalFullScreen";
import CreateNewTask from "../components/UI/CreateNewTask/CreateNewTask";
import Week from "../components/Calendar/Week/Week";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchTasks} from "../store/reducers/ActionCreators";
import cl from '../styles/CalendarPage.module.css'
import Button from "../components/UI/Button/Button";
import DropDownMenu from "../components/UI/DropDownMenu/DropDownMenu";

const CalendarPage = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [calendarDisplayMode, setCalendarDisplayMode] = useState('Месяц')
    const [calendarModeIndex, setCalendarModeIndex] = useState(0)
    //@todo сделать лоадер
    const dispatch = useAppDispatch()

    const {tasks, isLoading, error} = useAppSelector(state => state.taskSlice)

    useEffect(() => {
        if (tasks.length === 0) dispatch(fetchTasks())
    }, [])

    const calendarModes = [<Month tasks={tasks}/>, <Week tasks={tasks}/>]

    return (
        <div className={cl.wrapper}>
            <div className={cl.calendarMenu}>
                <div className={cl.createTaskBtn}>
                    <Button onClick={() => setVisible(true)}>Create new Task</Button>
                </div>
                {visible
                    ? <ModalFullScreen visible={visible} setVisible={setVisible}>
                        <CreateNewTask/>
                    </ModalFullScreen>
                    : ''
                }
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
            </div>
            {calendarModes[calendarModeIndex]}
        </div>
    );
};

export default CalendarPage;
