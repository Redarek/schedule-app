import React, {FC, useEffect, useState} from 'react';
import {IDate} from "../../../types/IDate";
import cl from './LongTaskWeek.module.css'
import {ITasks} from "../../../types/ITasks";
import ModalFullScreen from "../../UI/ModalFullScreen/ModalFullScreen";
import TaskCard from "../../TaskCard/TaskCard";

interface TaskWeekProps {
    days: IDate[];
    task: ITasks;
    date: IDate;
    onClick: () => void;
}

const LongTaskWeek: FC<TaskWeekProps> = ({days, task, date, onClick}) => {
    let taskWidth = 100
    let taskStart = task.start.getTime()
    let taskEnd = task.firstEnd.getTime()
    let weekStart = days[0].date.getTime()
    let nextWeekStart = days[6].date.getTime() + 1000 * 3600 * 24


    if (taskStart < weekStart) taskStart = weekStart;

    if (taskEnd >= nextWeekStart) {
        taskWidth = Math.floor(((nextWeekStart - taskStart) / 1000 / 3600 / 24 * 100) / 100) - 5;
        // if (taskWidth < 695) taskWidth = taskWidth + 100
    }

    if (taskEnd < nextWeekStart) {
        taskWidth = 100 * Math.floor(((taskEnd - taskStart) / 1000 / 3600 / 24 * 100) / 100) + 95;
        if (taskWidth === 0) taskWidth = 95
    }


    let taskCompleteStyle = 'none';
    if (task.complete) {
        taskCompleteStyle = 'line-through'
    }

    const [taskTitle, setTaskTitle] = useState(task.title)
    const minStrLength = 12;
    useEffect(() => {
        // setTaskTitle(taskTitle.substring(0, ((taskWidth + 5) / 100) * minStrLength) + '...')
    }, [])

    return (
        <div style={{width: `${taskWidth}%`}} className={cl.task} onClick={() => onClick()}>
            {task
                ? <div>
                    {task.start.getDate() === date.date.getDate()
                        ? <div className={cl.taskTitle} style={{
                            textDecoration: `${taskCompleteStyle}`
                        }}>{taskTitle}</div>
                        : ''
                    }
                    {date.date.getDay() === 1 && task.firstEnd.getTime() >= date.date.getTime()
                        ? <div className={cl.taskTitle} style={{
                            textDecoration: `${taskCompleteStyle}`
                        }}>{taskTitle}</div>
                        : ''
                    }
                </div>
                : ''
            }
        </div>
    );
};

export default LongTaskWeek;
