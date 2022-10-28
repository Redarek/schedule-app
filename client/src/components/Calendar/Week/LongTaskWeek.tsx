import React, {FC} from 'react';
import {IDate} from "../../../types/IDate";
import cl from './LongTaskWeek.module.css'
import {ITasks} from "../../../types/ITasks";

interface TaskWeekProps {
    days: IDate[];
    task: ITasks;
    date: IDate;
}

const LongTaskWeek: FC<TaskWeekProps> = ({days, task, date}) => {
    const taskStyle = () => {
        let width = 95
        if (task.firstEnd.getDate() <= days[6].date.getDate()) {
            width = 100 * (task.firstEnd.getDate() - task.start.getDate() + 1) - 5
        }
        if (task.firstEnd.getDate() >= days[6].date.getDate()) {
            width = 695
        }
        if (task.start.getDate() >= days[0].date.getDate()) {
            if (task.firstEnd.getDate() <= days[6].date.getDate()) {
                width = 100 * (task.firstEnd.getDate() - task.start.getDate() + 1) - 5
            } else width = 695
        }
        return {width: `${width}%`}
    }
    return (
        <div>
            {-task.start.getDate() + task.firstEnd.getDate() !== 0 && task.start.getDate() !== task.firstEnd.getDate()
                ? <div>
                    {date.date.getDate() === task.start.getDate()
                    || (date.date.getDay() === 1 && task.start.getDate() <= days[0].date.getDate())
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
