import React, {FC, useEffect, useState} from 'react';
import cl from './TaskMonth.module.css'
import {IDate} from "../../../types/IDate";
import {ITasks} from "../../../types/ITasks";
import ModalFullScreen from "../../UI/ModalFullScreen/ModalFullScreen";
import TaskCard from "../../TaskCard/TaskCard";

interface TaskMonthProps {
    task: ITasks;
    day: IDate;
    week: any;
}

const TaskMonth: FC<TaskMonthProps> = ({task, day, week}) => {
    const date = day.date;
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [taskTitle, setTaskTitle] = useState(task.title)

    let taskCompleteStyle = 'none';
    if (task.complete) {
        taskCompleteStyle = 'line-through'
    }

    let taskWidth = 10
    let taskStart = task.start.getTime()
    let taskEnd = task.firstEnd.getTime()
    let weekStart = week.startTime.getTime()
    let nextWeekStart = week.firstDayOfNextWeek

    if (taskStart < weekStart) taskStart = weekStart;
    if (taskEnd >= nextWeekStart) {
        taskWidth = 100 * Math.floor(((nextWeekStart - taskStart) / 1000 / 3600 / 24 * 100) / 100) - 5;
        if (taskWidth < 695) taskWidth = taskWidth + 100
    }

    if (taskEnd < nextWeekStart) {
        taskWidth = 100 * Math.floor(((taskEnd - taskStart) / 1000 / 3600 / 24 * 100) / 100) + 95;
        if (taskWidth === 0) taskWidth = 95
    }

    const minStrLength = 12;
    useEffect(() => {
        setTaskTitle(taskTitle.substring(0, ((taskWidth + 5) / 100) * minStrLength) + '...')
    }, [])

    return (
        <div className={cl.taskWrapper} style={{width: `${taskWidth}%`}}>
            {isModalVisible
                ? <ModalFullScreen visible={isModalVisible}
                                   setVisible={setIsModalVisible}
                                   exitBtn={true}
                                   exitBackground={true}
                >
                    <TaskCard task={task} setIsModalVisible={setIsModalVisible}/>
                </ModalFullScreen>
                : ''
            }
            {task
                ? <div onClick={() => setIsModalVisible(true)}>
                    {task.start.getDate() === date.getDate()
                        ? <div className={cl.taskTitle} style={{
                            textDecoration: `${taskCompleteStyle}`
                        }}>{taskTitle}</div>
                        : ''
                    }
                    {date.getDay() === 1 && task.firstEnd.getTime() >= date.getTime()
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

export default TaskMonth
