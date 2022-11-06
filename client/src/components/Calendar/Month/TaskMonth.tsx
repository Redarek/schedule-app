import React, {FC} from 'react';
import cl from './TaskMonth.module.css'
import {IDate} from "../../../types/IDate";
import {ITasks} from "../../../types/ITasks";
import {useNavigate} from "react-router-dom";

interface TaskMonthProps {
    task: ITasks;
    day: IDate;
    week: any
}

const TaskMonth: FC<TaskMonthProps> = ({task, day, week}) => {
    const navigate = useNavigate()
    const date = day.date;
    const weekEnd = week.endTime;


    let wholeWeekWidth = 692;
    let endsThisWeekWidth = 100;
    let startsThisWeek = 100;
    let endsThisWeek = 100;

    const widthCalculation = () => {
        if (task.start.getDate() === date.getDate() && task.firstEnd.getDate() >= weekEnd.getDate()) {
            startsThisWeek = (7 - task.start.getDate() + 1) * 100 - 8;
        }

        if (task.firstEnd.getTime() <= weekEnd.getTime()) {
            endsThisWeekWidth = task.firstEnd.getDay()* 100 - 8
        }

        if (task.start.getDay() !== 1) {
            if (task.firstEnd.getTime() <= weekEnd.getTime()) {
                endsThisWeek = (task.firstEnd.getDay() - task.start.getDay() + 1) * 100 - 8;
            } else {
                if (task.start.getDay() === 0) {
                    endsThisWeek = 100 - 8;
                } else {
                    endsThisWeek = (7 - task.start.getDay() + 1) * 100 - 8;
                }
            }
        }
    };

    widthCalculation();

    return (

        <div className={cl.taskWrapper} onClick={()=> navigate(`/task-edit/${task._id}`)}>
            {task
                ? <div>
                    {task.start.getDate() === date.getDate()
                        ? <div>
                            {task.start.getDay() !== 1
                                ? <div className={cl.taskTitle} style={{width: `${endsThisWeek}%`}}>{task.title}</div>
                                : <div>
                                    {task.firstEnd.getTime() >= weekEnd.getTime()
                                        ? <div className={cl.taskTitle} style={{width: `${startsThisWeek}%`}}>{task.title}</div>
                                        : <div className={cl.taskTitle} style={{width: `${endsThisWeekWidth}%`}}>
                                            {task.firstEnd.getDay() === 1
                                                ? ''
                                                : <div>{task.title}</div>
                                            }
                                        </div>
                                    }
                                </div>
                            }</div>
                        : ''
                    }
                    {date.getDay() === 1 &&task.start.getDate() !==date.getDate() && date.getTime() >= task.start.getTime() && task.firstEnd.getTime() >= date.getTime()
                        ? <div>{task.firstEnd.getTime() >= date.getTime() && task.firstEnd.getTime() >= weekEnd.getTime()
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
