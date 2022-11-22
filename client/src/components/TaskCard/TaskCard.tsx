import React, {FC} from 'react';
import cl from './TasckCard.module.css'
import {ITasks} from "../../types/ITasks";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {completeTask, deleteTask} from "../../store/reducers/ActionCreators";

interface TaskCardProps {
    task: ITasks;
    setIsModalVisible: (value: boolean) => void;
}

const TaskCard: FC<TaskCardProps> = ({task, setIsModalVisible}) => {
    const {error, isLoading} = useAppSelector(state => state.taskSlice)
    const {employee} = useAppSelector(state => state.employeeSlice)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const handleDelete = () => {
        dispatch(deleteTask(task._id))
        if (error === '') setIsModalVisible(false)
    }

    const handleCompleteTask = () => {
        dispatch(completeTask(task._id))
        if (error === '') setIsModalVisible(false)
    }
    const date = new Date()
    return (
        <div className={cl.wrap}>
            <div className={cl.cardBtns}>
                {task.complete && task.firstEnd < date
                    ? <div style={{marginLeft: 'auto'}}></div>
                    :
                <div className={cl.btn}>
                        <div className={cl.completeBtn} onClick={() => handleCompleteTask()}><span></span><span></span></div>
                    </div>

                }
                {/*{task.complete*/}
                {/*    ? ''*/}
                {/*    : */}
                <div className={cl.btn} onClick={() => navigate(`/task-edit/${task._id}`)}>
                        <img src='/images/editIcon.png' alt="edit"/>
                    </div>
                {/*}*/}
                <div className={cl.btn} onClick={() => handleDelete()}><img src='/images/binIcon.png' alt="bin"/></div>
            </div>
            <div className={cl.errorMess}>
                {error !== '' && error !== 'null'
                    ? error
                    : ''
                }
            </div>
            <div className={cl.taskInfo}>
                <div className={cl.taskTitle}>{task.title}</div>
                <div className={cl.taskRewards}>
                    <div className={cl.taskReward}>Награда: {task.firstReward}</div>
                    <div className={cl.taskReward}>Штраф: {task.penalty}</div>
                </div>
                <div className={cl.taskTerms}>
                    <div className={cl.taskTerm}>Начало: {task.start.toLocaleString('RUS', {
                        day: 'numeric',
                        month: 'long'
                    })} {task.start.getFullYear()}, {task.start.toLocaleString('RUS', {
                        hour: 'numeric',
                        minute: 'numeric'
                    })}</div>
                    <div className={cl.taskTerm}>Конец: {task.firstEnd.toLocaleString('RUS', {
                        day: 'numeric',
                        month: 'long'
                    })} {task.start.getFullYear()}, {task.firstEnd.toLocaleString('RUS', {
                        hour: 'numeric',
                        minute: 'numeric'
                    })}</div>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
