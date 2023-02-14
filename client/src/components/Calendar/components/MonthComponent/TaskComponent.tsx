import React, {FC, useEffect, useState} from 'react';
import cl from "./TaskComponent.module.css";
import {ITasks} from "../../../../types/ITasks";
import {IDay} from "../../models/CalendarTypes";
import {taskColor} from "../../utils/taskColor";


interface TaskComponentProps {
    day: IDay
    task: ITasks,
    indexOfFirstDay: number,
    setSelectTask: (task: ITasks) => void;
    setTaskInfoIsVisible: (bool: boolean) => void;
}

const TaskComponent: FC<TaskComponentProps> = ({
                                                   day,
                                                   task,
                                                   indexOfFirstDay,
                                                   setSelectTask,
                                                   setTaskInfoIsVisible
                                               }) => {

    const index = indexOfFirstDay
    let width = 100
    // if (task.firstEnd.getTime() <= day.weekEnd.getTime()) {    //Если заканчивается на этой неделе
    //     if (task.start.getTime() >= day.weekStart.getTime()) { // Если начинается на этой неделе
    //         width = (task.firstEnd.getDay() - task.start.getDay() + 1) * 100
    //     } else {    // Если начинается не на этой неделе
    //         width = task.firstEnd.getDay() * 100
    //         if (task.firstEnd.getDay() === 0 && index === 1) width = 700
    //         if (index === 0) width += 100
    //     }
    // } else {  //Если заканчивается не на этой неделе
    //     if (task.start.getTime() >= day.weekStart.getTime()) {  // Если начинается на этой неделе
    //         width = (7 - task.start.getDay() + index) * 100
    //         if (day.date.getDay() === 0 && index === 1) width = 100
    //     } else { // Если начинается не на этой неделе
    //         width = 700
    //     }
    // }

    width -= 10


    let taskCompleteStyle = 'none';
    if (task.complete) {
        taskCompleteStyle = 'line-through'
    }

    let minStrLength = 12;
    const [taskTitle, setTaskTitle] = useState(task.title)

    useEffect(() => {
        if (window.innerWidth < 700) minStrLength = 10
        if (window.innerWidth < 600) minStrLength = 8
        if (window.innerWidth < 540) minStrLength = 6
        if (window.innerWidth < 460) minStrLength = 4
        if (window.innerWidth < 320) minStrLength = 3
        if (((width + 10) / 100) * minStrLength < taskTitle.length) {
            setTaskTitle(taskTitle.substring(0, ((width + 10) / 100) * minStrLength) + '...')
        }
    }, [])




    return (
        <div className={cl.task} style={{width: `${width}%`}}>
            <div className={cl.taskInfo} onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                event.stopPropagation()
                setTaskInfoIsVisible(true);
                setSelectTask(task)
            }} style={{textDecoration: taskCompleteStyle, backgroundColor: `${taskColor(task)}`}}>{taskTitle}</div>
        </div>
    );
};

export default TaskComponent;
