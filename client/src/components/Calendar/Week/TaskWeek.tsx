import React, {FC} from 'react';
import {IDate} from "../../../types/IDate";
import {ITask} from "../../../types/ITask";
import cl from './TaskWeek.module.css'

interface TaskWeekProps {
    days: IDate[];
    task: ITask;
    date: IDate;
}

const TaskWeek: FC<TaskWeekProps> = ({days, task, date}) => {
    // const check = () => {
    //     let bool = false
    //     for (let i = 0; i < days.length; i++) {
    //         if (days[i].date.getDate() === task.startTime.getDate() && days[6].date.getDate() >= task.endTime.getDate()) {
    //            bool = true
    //         }
    //     }
    //     return bool
    // console.log(days)
    // }
    const taskStyle = () => {
        // console.log(task)
        let width = 95
        if (task.endTime.getDate() <= days[6].date.getDate() ) {
            width = 100 * (task.endTime.getDate() - task.startTime.getDate() + 1) - 5
        }
        if (task.endTime.getDate() >= days[6].date.getDate()) {
            width = 695
        }
        return {width: `${width}%`}
    }
    // console.log(date.date.getDate())
    // console.log(task)
    return (
        <div>
            {-task.startTime.getDate() + task.endTime.getDate() !== 0
                ? <div>
                    {date.date.getDate() === task.startTime.getDate()
                        ? <div style={taskStyle()} className={cl.task}>{task.title}</div>
                        : ''
                    }
                </div>
                : ''
            }
        </div>
    );
};

export default TaskWeek;
