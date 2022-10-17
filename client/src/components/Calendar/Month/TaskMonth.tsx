import React, {FC} from 'react';
import cl from './TaskMonth.module.css'
import {ITask} from "../../../types/ITask";
import {IDate} from "../../../types/IDate";

interface TaskMonthProps {
    task: ITask;
    day: IDate;
    week: any
}

const TaskMonth: FC<TaskMonthProps> = ({task, day, week}) => {
    const date = day.date;
    const weekEnd = week.endTime;


    let width1 = 692;
    let width2 = 100;
    let width3 = 100;
    let width4 = 100;

    const widthCalculation = () => {
        if (task.startTime.getDate() === date.getDate() && task.endTime.getDate() >= weekEnd.getDate()) {
            width3 = (7 - task.startTime.getDate() + 1) * 100 - 8;
        }

        if (task.endTime.getDate() <= weekEnd.getDate()) {
            width2 = (task.endTime.getDay()) * 100 - 8;
        }

        if (task.startTime.getDay() !== 1) {
            if (task.endTime.getTime() <= weekEnd.getTime()) {
                width4 = (task.endTime.getDate() - task.startTime.getDate() + 1) * 100 - 8;
            } else {
                if (task.startTime.getDay() === 0) {
                    width4 = 100 - 8;
                } else {
                    width4 = (7 - task.startTime.getDay() + 1) * 100 - 8;
                }
            }
        }
    };

    widthCalculation();

    return (

        <div className={cl.taskWrapper}>
            {task.startTime.getMonth() === date.getMonth() && task.startTime.getFullYear() === date.getFullYear()
                // || task.startTime.getMonth() === date.getMonth()-1
                ? <div>
                    {task.startTime.getDate() === date.getDate()
                        ? <div>
                            {task.startTime.getDay() !== 1
                                ? <div className={cl.taskTitle} style={{width: `${width4}%`}}>{task.title}</div>
                                : <div>
                                    {task.endTime.getTime() >= weekEnd.getTime()
                                        ? <div className={cl.taskTitle} style={{width: `${width3}%`}}>{task.title}</div>
                                        : <div className={cl.taskTitle} style={{width: `${width2}%`}}>
                                            {task.endTime.getDay() === 1
                                                ? ''
                                                : task.title
                                            }
                                        </div>
                                    }
                                </div>
                            }</div>
                        : ''
                    }
                    {date.getDay() === 1 && date.getTime() > task.startTime.getTime() && task.endTime.getTime() > date.getTime()
                        ? <div>{task.endTime.getTime() >= date.getTime() && task.endTime >= weekEnd.getTime()
                            ? <div className={cl.taskTitle} style={{width: `${width1}%`}}>{task.title}</div>
                            : <div className={cl.taskTitle} style={{width: `${width2}%`}}>{task.title}</div>
                        }
                        </div>
                        : ''
                    }
                </div>
                : ''

            }
        </div>
    );
};

export default TaskMonth
