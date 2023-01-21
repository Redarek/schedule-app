import React, {FC, useState} from 'react';
import cl from './TasckCard.module.css'
import {ITasks} from "../../types/ITasks";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {completeTask, deleteTask, fetchEmployeeTasks} from "../../store/reducers/ActionCreators";
import Button from "../UI/Button/Button";
import ModalFullScreen from "../UI/ModalFullScreen/ModalFullScreen";

interface TaskCardProps {
    task: ITasks;
    setIsModalVisible: (value: boolean) => void;
}

const TaskCard: FC<TaskCardProps> = ({task, setIsModalVisible}) => {
    const {error, isLoading} = useAppSelector(state => state.taskSlice)
    const {employee} = useAppSelector(state => state.employeeSlice)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [taskDescriptionIsVisible, setTaskDescriptionIsVisible] = useState<boolean>(false)

    const handleDelete = () => {
        dispatch(deleteTask(task._id))
        if (error === '') setIsModalVisible(false)
    }

    const handleCompleteTask = () => {
        const promise = new Promise((resolve, reject) => {
            resolve(dispatch(completeTask(task._id)))

        })
        promise.then(() => {
            dispatch(fetchEmployeeTasks(employee._id))
            setIsModalVisible(false)
        })
    }
    const date = new Date()
    return (
        <div className={cl.wrap}>
            <div className={cl.cardBtns}>
                {task.complete && task.firstEnd < date
                    ? <div style={{marginLeft: 'auto'}}></div>
                    : <div className={cl.completeBtn} onClick={() => handleCompleteTask()}>
                        <Button onClick={() => handleCompleteTask()}>
                            {task.complete
                                ? 'Не выполнено'
                                : 'Выполнено'
                            }
                        </Button>
                    </div>

                }

                <div className={cl.btn} onClick={() => navigate(`/task-edit/${task._id}`)}>
                    <img src='/images/editIcon.png' alt="edit"/>
                </div>
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
                {task.text.length > 0
                    ? <div className={cl.descriptionBtn} onClick={() => setTaskDescriptionIsVisible(true)}>Показать
                        описание</div>
                    : ''
                }
            </div>

            <ModalFullScreen
                visible={taskDescriptionIsVisible}
                setVisible={setTaskDescriptionIsVisible}
                exitBtn={true}
                exitBackground={true}
            >
                {task.text}
            </ModalFullScreen>

        </div>
    );
};

export default TaskCard;
