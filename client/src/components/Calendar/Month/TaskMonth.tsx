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


    let wholeWeekWidth = 692;
    let endsThisWeekWidth = 100;
    let startsThisWeek = 100;
    let endsThisWeek = 100;

    const widthCalculation = () => {
        if (task.startTime.getDate() === date.getDate() && task.endTime.getDate() >= weekEnd.getDate()) {
            startsThisWeek = (7 - task.startTime.getDate() + 1) * 100 - 8;
        }

        if (task.endTime.getTime() <= weekEnd.getTime()) {
            endsThisWeekWidth = task.endTime.getDay()* 100 - 8
        }

        if (task.startTime.getDay() !== 1) {
            if (task.endTime.getTime() <= weekEnd.getTime()) {
                endsThisWeek = (task.endTime.getDay() - task.startTime.getDay() + 1) * 100 - 8;
            } else {
                if (task.startTime.getDay() === 0) {
                    endsThisWeek = 100 - 8;
                } else {
                    endsThisWeek = (7 - task.startTime.getDay() + 1) * 100 - 8;
                }
            }
        }
    };

    widthCalculation();

    return (

        <div className={cl.taskWrapper}>
            {task
                ? <div>
                    {task.startTime.getDate() === date.getDate()
                        ? <div>
                            {task.startTime.getDay() !== 1
                                ? <div className={cl.taskTitle} style={{width: `${endsThisWeek}%`}}>{task.title}</div>
                                : <div>
                                    {task.endTime.getTime() >= weekEnd.getTime()
                                        ? <div className={cl.taskTitle} style={{width: `${startsThisWeek}%`}}>{task.title}</div>
                                        : <div className={cl.taskTitle} style={{width: `${endsThisWeekWidth}%`}}>
                                            {task.endTime.getDay() === 1
                                                ? ''
                                                : <div>{task.title}</div>
                                            }
                                        </div>
                                    }
                                </div>
                            }</div>
                        : ''
                    }
                    {date.getDay() === 1 &&task.startTime.getDate() !==date.getDate() && date.getTime() >= task.startTime.getTime() && task.endTime.getTime() >= date.getTime()
                        ? <div>{task.endTime.getTime() >= date.getTime() && task.endTime.getTime() >= weekEnd.getTime()
                            ? <div className={cl.taskTitle} style={{width: `${wholeWeekWidth}%`}}>{task.title}</div>
                            : <div className={cl.taskTitle} style={{width: `${endsThisWeekWidth}%`}}>{task.title}</div>
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
