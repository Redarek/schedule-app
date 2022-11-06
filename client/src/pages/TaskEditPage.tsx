import React, {FC, useEffect, useState} from 'react';
import cl from '../styles/TaskEditPage.module.css'
import {ITask} from "../types/ITasks";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import {editTask, fetchEmployees, fetchTaskById} from "../store/reducers/ActionCreators";
import Input from "../components/UI/Input/Input";
import {initialDate} from "../components/Calendar";
import DropDownMenu from "../components/UI/DropDownMenu/DropDownMenu";
import Button from "../components/UI/Button/Button";

interface TaskEditPage {
}

const TaskEditPage: FC<TaskEditPage> = () => {
    const navigate = useNavigate()
    const {task} = useAppSelector(state => state.taskSlice)
    const {employees} = useAppSelector(state => state.employeesSlice)
    const {taskId} = useParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTaskById(`${taskId}`))
    }, [])

    const [title, setTitle] = useState<string>(task.title)
    const [text, setText] = useState<string>(task.text)
    const [spec, setSpec] = useState<string>(task.spec)
    const [employee, setEmployee] = useState<string>(task.employee)
    const [firstReward, setFirstReward] = useState<number>(Number(task.firstReward))
    const [secondReward, setSecondReward] = useState<number>(Number(task.secondReward))
    const [penalty, setPenalty] = useState<number>(Number(task.penalty))
    const [start, setStart] = useState<string>(task.start)
    const [firstEnd, setFirstEnd] = useState<string>(task.firstEnd)
    const [secondEnd, setSecondEnd] = useState<string>(task.secondEnd)
    const [indexOfOpenMenu, setIndexOfOpenMenu] = useState<string>('')

    useEffect(() => {
        if (task._id) {
            setTitle(task.title)
            setText(task.text)
            setSpec(task.spec)
            setEmployee(task.employee)
            setFirstReward(Number(task.firstReward))
            setSecondReward(Number(task.secondReward))
            setPenalty(Number(task.penalty))
            setStart(task.start.slice(0, 23))
            setFirstEnd(task.firstEnd.slice(0, 23))
            setSecondEnd(task.secondEnd.slice(0, 23))
        }
    }, [task._id])

    const [textAreaHeight, setTextAreaHeight] = useState(162)
    const resize = (e: any) => {
        if (e.target.scrollHeight <= 162)
            setTextAreaHeight(162)
        else setTextAreaHeight(e.target.scrollHeight)
        setText(e.target.value)
    }

    const handleSave = () => {
        if (taskId) {
            const updateTask = {
                id: taskId,
                task: {
                    title: title,
                    text: text,
                    spec: spec,
                    employee: employee,
                    firstReward: String(firstReward),
                    secondReward: String(secondReward),
                    penalty: String(penalty),
                    start: start,
                    firstEnd: firstEnd,
                    secondEnd: secondEnd,
                    _id: taskId
                }
            }
            dispatch(editTask(updateTask))
            navigate('/')
        }
    }

    return (
        <div className={cl.wrapper}>
            <div className={cl.wrap}>
                <div className={cl.titleEdit}>
                    <div className={cl.inputWrap}>
                        <label htmlFor="title" className={cl.label}>Заголовок:</label>
                        <Input
                            type="text"
                            value={title}
                            name={title}
                            id={"title"}
                            setValue={setTitle}
                            placeholder={"title"}
                        />
                    </div>
                    <div className={cl.saveBtn}>
                        <Button onClick={() => handleSave()}>Сохранить</Button>
                    </div>
                </div>
                <div className={cl.specEdit}>
                    <div className={cl.inputWrap}>
                        <label className={cl.label} htmlFor="spec">Специализация:</label>
                        <DropDownMenu
                            title={"Специалилазция"}
                            setDropMenuItem={setSpec}
                            viewMode={'right'}
                            dropMenuItem={spec}
                            menuType={"spec"}
                            menuItems={[]}
                            indexOfMenu={'0'}
                            setIndexOfOpenMenu={setIndexOfOpenMenu}
                            indexOfOpenMenu={indexOfOpenMenu}
                        />
                    </div>
                </div>
                <div className={cl.pointsEdit}>
                    <div className={cl.inputWrap}>
                        <label htmlFor="first-reward" className={cl.label}>Первая награда:</label>
                        <Input id={'first-reward'}
                               placeholder={'first-reward'}
                               type={'number'}
                               name={'first-reward'}
                               value={firstReward}
                               setValue={setFirstReward}
                        />
                    </div>
                    <div className={cl.inputWrap}>
                        <label htmlFor="second-reward" className={cl.label}>Вторая награда:</label>
                        <Input id={'second-reward'}
                               placeholder={'second-reward'}
                               type={'number'}
                               name={'second-reward'}
                               value={secondReward}
                               setValue={setSecondReward}
                        />
                    </div>
                    <div className={cl.inputWrap}>
                        <label htmlFor="penalty" className={cl.label}>Штраф:</label>
                        <Input id={'penalty'}
                               placeholder={'penalty'}
                               type={'number'}
                               name={'penalty'}
                               value={penalty}
                               setValue={setPenalty}
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'start'} className={cl.label}>Начало:</label>
                        <Input
                            id={'start'}
                            placeholder={'start'}
                            type={'datetime-local'}
                            name={'start'}
                            value={start}
                            setValue={setStart}
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'firstEnd'} className={cl.label}>Конец:</label>
                        <Input
                            id={'firstEnd'}
                            placeholder={'firstEnd'}
                            type={'datetime-local'}
                            name={'firstEnd'}
                            value={firstEnd}
                            setValue={setFirstEnd}
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'secondEnd'} className={cl.label}>Доп. дата:</label>
                        <Input
                            id={'secondEnd'}
                            placeholder={'secondEnd'}
                            type={'datetime-local'}
                            name={'secondEnd'}
                            value={secondEnd}
                            setValue={setSecondEnd}
                        />
                    </div>
                </div>
                <div>
                    <div className={cl.employeeEdit}>
                        <div className={cl.inputWrap}>
                            <label htmlFor="employee" className={cl.label}>Сотрудник:</label>
                            <DropDownMenu
                                title={"Сотрудник"}
                                setDropMenuItem={setEmployee}
                                viewMode={'right'}
                                dropMenuItem={employee}
                                menuType={"employees"}
                                menuItems={employees}
                                indexOfMenu={'1'}
                                setIndexOfOpenMenu={setIndexOfOpenMenu}
                                indexOfOpenMenu={indexOfOpenMenu}
                            />
                        </div>
                    </div>
                    <div className={cl.textEdit}>
                        <div className={cl.inputWrap}>
                            <label htmlFor="text" className={cl.label}>Описание:</label>
                            <textarea className={cl.textarea}
                                      value={text}
                                      id={'text'}
                                      onChange={(e) => resize(e)}
                                      style={{height: textAreaHeight}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskEditPage;
