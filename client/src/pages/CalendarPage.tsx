import React, {useEffect, useState} from 'react';
import Month from "../components/Calendar/Month/Month";
import ModalFullScreen from "../components/UI/ModalFullScreen/ModalFullScreen";
import CreateNewTask from "../components/UI/CreateNewTask/CreateNewTask";
import Week from "../components/Calendar/Week/Week";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchTasks} from "../store/reducers/ActionCreators";
import cl from '../styles/CalendarPage.module.css'

const CalendarPage = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [calendarDisplayMode, setCalendarDisplayMode] = useState(1)
    const styles = (mode:number) => {
        if (mode === calendarDisplayMode) return {background: 'teal'}
    }
    //@todo сделать лоадер
    const dispatch = useAppDispatch()
    const {tasks, isLoading, error} = useAppSelector(state => state.taskSlice)
    useEffect(() => {
        if (tasks.length === 0) dispatch(fetchTasks())
    }, [])

    const calendarModes = [<Month tasks={tasks}/>, <Week tasks={tasks}/>]
    return (
        <div className={cl.wrapper}>
            <button onClick={()=>setVisible(true)}>Create new Task</button>
            <ModalFullScreen visible={visible} setVisible={setVisible}>
                <CreateNewTask/>
            </ModalFullScreen>
            <div style={styles(0)} onClick={()=>setCalendarDisplayMode(0)}>ChangeMode Month</div>
            <div style={styles(1)} onClick={()=>setCalendarDisplayMode(1)}>ChangeMode Week</div>
            {calendarModes[calendarDisplayMode]}
        </div>
    );
};

export default CalendarPage;
