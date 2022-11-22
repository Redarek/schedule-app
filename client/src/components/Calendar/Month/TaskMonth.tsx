import React, {FC, useEffect, useState} from 'react';
import cl from './TaskMonth.module.css'
import {IDate} from "../../../types/IDate";
import {ITasks} from "../../../types/ITasks";
import ModalFullScreen from "../../UI/ModalFullScreen/ModalFullScreen";
import TaskCard from "../../TaskCard/TaskCard";

interface TaskMonthProps {
    task: ITasks;
    day: IDate;
    week: any
}

const TaskMonth: FC<TaskMonthProps> = ({task, day, week}) => {
    const date = day.date;
    const weekEnd = week.endTime;
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    const [taskTitle, setTaskTitle] = useState(task.title)

    let wholeWeekWidth = 692;
    let endsThisWeekWidth = 100;
    let startsThisWeek = 100;
    let endsThisWeek = 100;

    let taskCompleteStyle = 'none';

    let changedWidth = 100

    if (task.complete) {
        taskCompleteStyle = 'line-through'
    }
    const widthCalculation = () => {
        if (task.start.getDate() === date.getDate() && task.firstEnd.getDate() >= weekEnd.getDate()) {
            startsThisWeek = (7 - task.start.getDay() + 1) * 100 - 8;
            changedWidth = startsThisWeek
        }

        if (task.firstEnd.getTime() <= weekEnd.getTime()) {
            endsThisWeekWidth = task.firstEnd.getDay() * 100 - 8
            changedWidth = endsThisWeekWidth
        }

        if (task.start.getDay() !== 1) {
            if (task.firstEnd.getTime() <= weekEnd.getTime()) {
                endsThisWeek = (task.firstEnd.getDay() - task.start.getDay() + 1) * 100 - 8;
                changedWidth = endsThisWeek
            } else {
                if (task.start.getDay() === 0) {
                    endsThisWeek = 100 * 7 - 8;
                    changedWidth = endsThisWeek
                } else {
                    endsThisWeek = (7 - task.start.getDay() + 1) * 100 - 8;
                    changedWidth = endsThisWeek
                }
            }
        }
    };


    widthCalculation();

    if (changedWidth < 762 && taskTitle.length > 118 && changedWidth > 652) setTaskTitle(taskTitle.substring(0, 115) + '...')
    if (changedWidth < 652 && taskTitle.length > 103 && changedWidth > 540) setTaskTitle(taskTitle.substring(0, 100) + '...')
    if (changedWidth < 540 && taskTitle.length > 85 && changedWidth > 430) setTaskTitle(taskTitle.substring(0, 82) + '...')
    if (changedWidth < 500 && taskTitle.length > 66 && changedWidth > 430) setTaskTitle(taskTitle.substring(0, 63) + '...')
    if (changedWidth < 430 && taskTitle.length > 50 && changedWidth > 319) setTaskTitle(taskTitle.substring(0, 47) + '...')
    if (changedWidth < 319 && taskTitle.length > 50 && changedWidth > 208) setTaskTitle(taskTitle.substring(0, 47) + '...')
    if (changedWidth < 208 && taskTitle.length > 33 && changedWidth > 101) setTaskTitle(taskTitle.substring(0, 30) + '...')
    if (changedWidth < 101 && taskTitle.length > 12 && changedWidth > 0) setTaskTitle(taskTitle.substring(0, 9) + '...')
    console.log(changedWidth)
    console.log(task)

    //@todo Переписать логику отображения таска

    return (
        <div className={cl.taskWrapper} style={{width: `${changedWidth}`}}>
            <ModalFullScreen visible={isModalVisible}
                             setVisible={setIsModalVisible}
                             exitBtn={true}
                             exitBackground={true}
            >
                {isModalVisible
                    ? <TaskCard task={task} setIsModalVisible={setIsModalVisible}/>
                    : ''
                }
            </ModalFullScreen>
            {task
                ? <div onClick={() => setIsModalVisible(true)}>
                    {task.start.getDate() === date.getDate()
                        ? <div>
                            {task.start.getDay() !== 1
                                ? <div className={cl.taskTitle} style={{
                                    width: `${endsThisWeek}%`,
                                    textDecoration: `${taskCompleteStyle}`
                                }}>{taskTitle}</div>
                                : <div>
                                    {task.firstEnd.getTime() >= weekEnd.getTime()
                                        ? <div className={cl.taskTitle}
                                               style={{
                                                   width: `${startsThisWeek}%`,
                                                   textDecoration: `${taskCompleteStyle}`
                                               }}>{taskTitle}</div>
                                        : <div className={cl.taskTitle} style={{
                                            width: `${endsThisWeekWidth}%`,
                                            textDecoration: `${taskCompleteStyle}`
                                        }}>
                                            {task.firstEnd.getDay() === 1
                                                ? ''
                                                : <div>{taskTitle}</div>
                                            }
                                        </div>
                                    }
                                </div>
                            }</div>
                        : ''
                    }
                    {date.getDay() === 1 && task.start.getDate() !== date.getDate() && date.getTime() >= task.start.getTime() && task.firstEnd.getTime() >= date.getTime()
                        ?
                        <div>{task.firstEnd.getTime() >= date.getTime() && task.firstEnd.getTime() >= weekEnd.getTime()
                            ? <div className={cl.taskTitle} style={{
                                width: `${wholeWeekWidth}%`,
                                textDecoration: `${taskCompleteStyle}`
                            }}>{taskTitle}</div>
                            : <div className={cl.taskTitle} style={{
                                width: `${endsThisWeekWidth}%`,
                                textDecoration: `${taskCompleteStyle}`
                            }}>{taskTitle}</div>
                        }
                        </div>
                        : date.getDay() === 1 && task.start.getDay() === 1 && task.firstEnd.getDate() === date.getDate() && task.firstEnd.getMonth() === task.firstEnd.getMonth()
                            ? <div className={cl.taskTitle} style={{
                                width: `${endsThisWeekWidth}%`,
                                textDecoration: `${taskCompleteStyle}`
                            }}>{taskTitle}</div>
                            : ''
                    }
                </div>
                : ''

            }
        </div>
    );
};

export default TaskMonth
