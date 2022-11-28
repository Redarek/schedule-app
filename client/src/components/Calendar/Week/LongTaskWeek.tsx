import React, {FC, useState} from 'react';
import {IDate} from "../../../types/IDate";
import cl from './LongTaskWeek.module.css'
import {ITasks} from "../../../types/ITasks";
import ModalFullScreen from "../../UI/ModalFullScreen/ModalFullScreen";
import TaskCard from "../../TaskCard/TaskCard";

interface TaskWeekProps {
    days: IDate[];
    task: ITasks;
    date: IDate;
}

const LongTaskWeek: FC<TaskWeekProps> = ({days, task, date}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
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
            {isModalVisible
                ? <ModalFullScreen visible={isModalVisible}
                                   setVisible={setIsModalVisible}
                                   exitBtn={true}
                                   exitBackground={true}
                >
                    <TaskCard task={task} setIsModalVisible={setIsModalVisible}/>
                </ModalFullScreen>
                : ''
            }
            {-task.start.getDate() + task.firstEnd.getDate() !== 0 && task.start.getDate() !== task.firstEnd.getDate()
                ? <div>
                    {date.date.getDate() === task.start.getDate()
                    || (date.date.getDay() === 1 && task.start.getDate() <= days[0].date.getDate())
                        ? <div style={taskStyle()} className={cl.task} onClick={()=>setIsModalVisible(!isModalVisible)}>{task.title}</div>
                        : ''
                    }
                </div>
                : ''
            }
        </div>
    );
};

export default LongTaskWeek;
