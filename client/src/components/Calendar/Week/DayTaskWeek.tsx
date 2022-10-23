import React, {FC} from 'react';
import {ITask} from "../../../types/ITask";
import cl from "./DayTaskWeek.module.css";

interface DayTaskOnWeekProps {
    task: ITask,
    date: Date,
    key?: number
}

const DayTaskWeek: FC<DayTaskOnWeekProps> = ({task, date}) => {
    const taskPosition = (task: ITask) => {
        let margin = task.startTime.getHours() * 50 + 50;
        let height = -(task.startTime.getHours() - task.endTime.getHours()) * 50;
        if (task.startTime.getMinutes() <= 15 && task.startTime.getMinutes() >= 8) {
            margin = margin + 15
            height = height - 15
        }
        if (task.startTime.getMinutes() > 15 && task.startTime.getMinutes() <= 30) {
            margin = margin + 25
            height = height - 25

        }
        if (task.startTime.getMinutes() > 30 && task.startTime.getMinutes() <= 45) {
            margin = margin + 35
            height = height - 35

        }
        if (task.startTime.getMinutes() > 45 && task.startTime.getMinutes() <= 59) {
            margin = margin + 45
            height = height - 45
        }
        if (task.endTime.getMinutes() <= 15 && task.endTime.getMinutes() >= 8) {
            height = height + 15
        }
        if (task.endTime.getMinutes() > 15 && task.endTime.getMinutes() <= 30) {
            height = height + 25
        }
        if (task.endTime.getMinutes() > 30 && task.endTime.getMinutes() <= 45) {
            height = height + 35

        }
        if (task.endTime.getMinutes() > 45 && task.endTime.getMinutes() <= 59) {
            height = height + 45
        }
        console.log(height)
        return {height: `${height}px`, marginTop: `${margin}px`};
    };
    return (
        <div className={cl.task} style={taskPosition(task)} >{task.title}</div>
    );
};

export default DayTaskWeek;
