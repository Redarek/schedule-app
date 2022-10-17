import React, {useState} from 'react';
import Month from "../components/Calendar/Month/Month";
import ModalFullScreen from "../components/UI/ModalFullScreen/ModalFullScreen";
import CreateNewTask from "../components/UI/CreateNewTask/CreateNewTask";

const CalendarPage = () => {
    const [visible, setVisible] = useState<boolean>(false)
    return (
        <div>
            <button onClick={()=>setVisible(true)}>Create new Task</button>
            <ModalFullScreen visible={visible} setVisible={setVisible}>
                <CreateNewTask/>
            </ModalFullScreen>
            <Month/>
        </div>
    );
};

export default CalendarPage;
