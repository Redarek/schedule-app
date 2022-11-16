import React, {FC, useState} from 'react';
import cl from './TasksListCalendar.module.css'
import {ITasks} from "../../types/ITasks";
import TaskCard from "../TaskCard/TaskCard";

interface TasksListCalendarPRops {
    tasks: ITasks[],
    date: Date
}

const TasksListCalendar: FC<TasksListCalendarPRops> = ({tasks, date}) => {
    const [isVisibleTaskCard, setIsVisibleTaskCard] = useState<boolean>(false)
    const [task, setTask] = useState<ITasks>({} as ITasks)
    console.log(tasks)
    return (
        <div className={cl.list}>
            {isVisibleTaskCard
                ?<div className={cl.taskCard}><TaskCard task={task} setIsModalVisible={setIsVisibleTaskCard}/></div>
                :''
            }
            <span className={cl.weekday}>{date.toLocaleString('RUS', {weekday: 'short'})}</span>
            <span className={cl.date}>{date.getDate()}</span>
            {tasks.map(task =>
            <div className={cl.task} key={task._id} onClick={()=> {setTask(task);setIsVisibleTaskCard(true); }}>
               {task.title}
            </div>
            )}
        </div>
    );
};

export default TasksListCalendar;
