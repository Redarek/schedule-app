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

    const getMonthName = () => {
        const numOfMonth = date.getMonth()
        switch (numOfMonth) {
            case 0:
                return 'Января';
            case 1:
                return 'Февраля';
            case 2:
                return 'Марта';
            case 3:
                return 'Апреля';
            case 4:
                return 'Мая';
            case 5:
                return 'Июня';
            case 6:
                return 'Июля';
            case 7:
                return 'Августа';
            case 8:
                return 'Сентября';
            case 9:
                return 'Октября';
            case 10:
                return 'Ноябрья';
            case 11:
                return 'Декабря';
        }
    }
    return (
        <div className={cl.list}>
            <span className={cl.weekday}>{date.toLocaleString('RUS', {weekday: 'short'})}</span>
            <span className={cl.date}>{date.getDate()} {getMonthName()}</span>
            <div className={cl.tasks}>
                {tasks.map(task =>
                    <div className={cl.task} key={task._id} onClick={() => {
                        setTask(task);
                        setIsVisibleTaskCard(true);
                    }}>
                        {task.title}
                    </div>
                )}
            </div>
            {isVisibleTaskCard
                ? <div className={cl.taskCard}>
                    <TaskCard task={task} setIsModalVisible={setIsVisibleTaskCard}/></div>
                : ''
            }
        </div>
    );
};

export default TasksListCalendar;
