import React, {FC, useState} from 'react';
import {ITasks} from "../../../types/ITasks";
import cl from "./DayTaskWeek.module.css";
import ModalFullScreen from "../../UI/ModalFullScreen/ModalFullScreen";
import TaskCard from "../../TaskCard/TaskCard";

interface DayTaskOnWeekProps {
    task: ITasks,
    date: Date,
    onClick: () => void
    key?: number
}

const DayTaskWeek: FC<DayTaskOnWeekProps> = ({task, date, onClick}) => {
    const taskPosition = (task: ITasks) => {
        let margin = task.start.getHours() * 50 + 50;
        let height = -(task.start.getHours() - task.firstEnd.getHours()) * 50;
        if (task.start.getMinutes() <= 15 && task.firstEnd.getMinutes() >= 8) {
            margin = margin + 15
            height = height - 15
        }
        if (task.start.getMinutes() > 15 && task.start.getMinutes() <= 30) {
            margin = margin + 25
            height = height - 25

        }
        if (task.start.getMinutes() > 30 && task.start.getMinutes() <= 45) {
            margin = margin + 35
            height = height - 35

        }
        if (task.start.getMinutes() > 45 && task.start.getMinutes() <= 59) {
            margin = margin + 45
            height = height - 45
        }
        if (task.firstEnd.getMinutes() <= 15 && task.firstEnd.getMinutes() >= 8) {
            height = height + 15
        }
        if (task.firstEnd.getMinutes() > 15 && task.firstEnd.getMinutes() <= 30) {
            height = height + 25
        }
        if (task.firstEnd.getMinutes() > 30 && task.firstEnd.getMinutes() <= 45) {
            height = height + 35

        }
        if (task.firstEnd.getMinutes() > 45 && task.firstEnd.getMinutes() <= 59) {
            height = height + 45
        }
        return {height: `${height}px`, marginTop: `${margin}px`};
    };

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    return (
        <div className={cl.task} style={taskPosition(task)} onClick={() => onClick()}>
            <div>
                {task.title}
            </div>
        </div>


    );
};

export default DayTaskWeek;
