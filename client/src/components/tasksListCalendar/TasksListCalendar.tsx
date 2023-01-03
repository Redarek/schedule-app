import React, {FC, useState} from 'react';
import cl from './TasksListCalendar.module.css'
import {ITasks} from "../../types/ITasks";
import TaskCard from "../TaskCard/TaskCard";

interface TasksListCalendarProps {
    tasks: ITasks[],
    date: Date
}

const TasksListCalendar: FC<TasksListCalendarProps> = ({tasks, date}) => {
    const [isVisibleTaskCard, setIsVisibleTaskCard] = useState<boolean>(false)
    const [task, setTask] = useState<ITasks>({} as ITasks)

    return (
        <div className={cl.list}>
            <span className={cl.weekday}>{date.toLocaleString('RUS', {weekday: 'short'})}</span>
            <span className={cl.date}>{date.getDate()}</span>
            {tasks.map(task =>
                <div className={cl.task} key={task._id} onClick={() => {
                    setTask(task);
                    setIsVisibleTaskCard(true);
                }}>
                    {task.title}
                </div>
            )}
            {isVisibleTaskCard
                ? <div className={cl.taskCard}>
                    <TaskCard task={task} setIsModalVisible={setIsVisibleTaskCard}/></div>
                : ''
            }
        </div>
    );
};

export default TasksListCalendar;
