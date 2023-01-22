import React, {FC} from 'react';
import {ITasks} from "../../../../types/ITasks";
import cl from "./DayTaskWeek.module.css";
import {IDay} from "../../models/CalendarTypes";
import {Categories} from "../../../../types/Categories";
import {taskColor} from "../../utils/taskColor";

interface DayTaskOnWeekProps {
    task: ITasks,
    day: IDay,
    onClick: () => void
    key?: number
}

const DayTaskWeek: FC<DayTaskOnWeekProps> = ({task, onClick, day}) => {
    const pxInMs = 1200 / 86400000

    function taskPosition() {
        const timeStartInDay = -(day.date.getTime() - task.start.getTime())
        const taskDuration = task.firstEnd.getTime() - task.start.getTime()
        let marginTop = pxInMs * timeStartInDay + 50
        let height = pxInMs * taskDuration

        let tasksForTheDay = day.tasks.filter(tas =>
            tas.start.getDate() === day.date.getDate()
            && task.firstEnd.getDate() === day.date.getDate())

        let index = tasksForTheDay.findIndex(tas => tas._id === task._id)

        let concurrentTasks: ITasks[] = []

        for (let i = 0; i < index + 1; i++) {
            if (task.start.getTime() <= tasksForTheDay[i].firstEnd.getTime()) {
                concurrentTasks.push(tasksForTheDay[i])
            }
        }
        let ind = concurrentTasks.findIndex(ta => ta._id === task._id)
        let marginLeft = (100 / concurrentTasks.length) * ind;
        let width = 100 / concurrentTasks.length;


        let bgColor = taskColor(task)

        return {
            height: `${height}px`,
            marginTop: `${marginTop}px`,
            zIndex: `${index}`,
            marginLeft: `${marginLeft}%`,
            width: `calc(${width}% - 4px)`,
            backgroundColor: bgColor,
        };
    }

    let taskCompleteStyle = 'none';
    if (task.complete) {
        taskCompleteStyle = 'line-through'
    }

    return (
        <div className={cl.task} style={taskPosition()} onClick={() => onClick()}>
            <div style={{textDecoration: taskCompleteStyle}}>
                {task.title}
            </div>
        </div>
    );
};

export default DayTaskWeek;
