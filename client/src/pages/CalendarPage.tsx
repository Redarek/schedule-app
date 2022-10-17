import React, {useState} from 'react';
import Month from "../components/Calendar/Month/Month";
import ModalFullScreen from "../components/UI/ModalFullScreen/ModalFullScreen";
import CreateNewTask from "../components/UI/CreateNewTask/CreateNewTask";
import Week from "../components/Calendar/Week/Week";

const CalendarPage = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const [calendarDisplayMode, setCalendarDisplayMode] = useState(1)
    const calendarModes = [<Month/>, <Week/>]
    const styles = (mode:number) => {
        if (mode === calendarDisplayMode) return {background: 'teal'}
    }
    return (
        <div>
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
