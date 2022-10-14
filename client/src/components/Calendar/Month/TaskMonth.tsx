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
        if (task.startTime.date === date.getDate() && task.endTime.date >= weekEnd.getDate()) {
            width3 = (7 - task.startTime.day + 1) * 100 - 8;
        }

        if (task.endTime.date <= weekEnd) {
            width2 = (task.endTime.day) * 100 - 8;
        }

        if (task.startTime.day !== 1) {
            if (task.endTime.date <= weekEnd.getDate()) {
                width4 = (task.endTime.date - task.startTime.date + 1) * 100 - 8;
            } else {
                if (task.startTime.day === 0) {
                    width4 = 100 - 8;
                } else {

                    width4 = (7 - task.startTime.day + 1) * 100 - 8;
                }
            }
        }
    };

    widthCalculation();

    return (

        <div className={cl.taskWrapper}>
            {task.startTime.month === date.getMonth() && task.startTime.year === date.getFullYear()
                || task.startTime.month === date.getMonth()-1
                ? <div>
                    {task.startTime.date === date.getDate()
                        ? <div>
                            {task.startTime.day !== 1
                                ? <div className={cl.taskTitle} style={{width: `${width4}%`}}>{task.title}</div>
                                : <div>
                                    {task.endTime.time >= weekEnd.getTime()
                                        ? <div className={cl.taskTitle} style={{width: `${width3}%`}}>{task.title}</div>
                                        : <div className={cl.taskTitle} style={{width: `${width2}%`}}>
                                            {task.endTime.day === 1
                                                ? ''
                                                : task.title
                                            }
                                        </div>
                                    }
                                </div>
                            }</div>
                        : ''
                    }
                    {date.getDay() === 1 && date.getTime() > task.startTime.time && task.endTime.time > date.getTime()
                        ? <div>{task.endTime.time >= date.getTime() && task.endTime >= weekEnd.getTime()
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
