import React, {FC} from 'react';
import {IDate} from "../../../types/IDate";
import {ITask} from "../../../types/ITask";
import cl from './LongTaskWeek.module.css'

interface TaskWeekProps {
    days: IDate[];
    task: ITask;
    date: IDate;
}

const LongTaskWeek: FC<TaskWeekProps> = ({days, task, date}) => {
    const taskStyle = () => {
        let width = 95
        if (task.endTime.getDate() <= days[6].date.getDate()) {
            width = 100 * (task.endTime.getDate() - task.startTime.getDate() + 1) - 5
        }
        if (task.endTime.getDate() >= days[6].date.getDate()) {
            width = 695
        }
        if (task.startTime.getDate() >= days[0].date.getDate()) {
            if (task.endTime.getDate() <= days[6].date.getDate()) {
                width = 100 * (task.endTime.getDate() - task.startTime.getDate() + 1) - 5
            } else width = 695
        }
        return {width: `${width}%`}
    }
    return (
        <div>
            {-task.startTime.getDate() + task.endTime.getDate() !== 0 && task.startTime.getDate() !== task.endTime.getDate()
                ? <div>
                    {date.date.getDate() === task.startTime.getDate()
                    || (date.date.getDay() === 1 && task.startTime.getDate() <= days[0].date.getDate())
                        ? <div style={taskStyle()} className={cl.task}>{task.title}</div>
                        : ''
                    }
                </div>
                : ''
            }
        </div>
    );
};

export default LongTaskWeek;
