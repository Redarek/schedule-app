import React, {FC, useEffect, useState} from 'react';
import cl from '../styles/TaskEditPage.module.css'
import {useAppDispatch, useAppSelector,} from "../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import {EditedTask, editTask, fetchEmployeeTasks, fetchTaskById} from "../store/reducers/ActionCreators";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import {FormValidator} from "../components/UI/Input/models/FormValidator";
import {InputNames} from "../components/UI/Input/models/InputValidator";
import DropDownMenu from "../components/UI/DropDownMenu/DropDownMenu";
import {Specialities} from "../types/Specialities";
import {getInputDate} from "../components/UI/Input/inputDateFormat";

interface TaskEditPageProps {

}


const TaskEditPage: FC<TaskEditPageProps> = () => {
    const navigate = useNavigate()
    const {task, error, isLoading} = useAppSelector(state => state.taskSlice)
    const {user} = useAppSelector(state => state.authSlice.user)
    const {employees, employee} = useAppSelector(state => state.employeeSlice)
    const {taskId} = useParams()
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTaskById(`${taskId}`))
    }, [taskId])

    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [spec, setSpec] = useState<string>('')
    const [empl, setEmpl] = useState<string>('')
    const [firstReward, setFirstReward] = useState<number>(Number(''))
    const [secondReward, setSecondReward] = useState<number>(Number(''))
    const [penalty, setPenalty] = useState<number>(Number(''))

    const [start, setStart] = useState<string>(getInputDate(new Date()))
    const setStartDate = (data: string) => {
        const date = new Date(`${data}`)
        if (date.getTime())
            setStart(getInputDate(date))
    }

    const [firstEnd, setFirstEnd] = useState<string>(getInputDate(new Date(new Date().getTime() + 1800000)))
    const setFirstEndDate = (data: string) => {
        const date = new Date(`${data}`)
        setFirstEnd(getInputDate(date))
    }

    const [secondEnd, setSecondEnd] = useState<string>(getInputDate(new Date(new Date().getTime() + 3600000)))
    const setSecondEndDate = (data: string) => {
        const date = new Date(`${data}`)
        setSecondEnd(getInputDate(date))
    }


    useEffect(() => {
        if (task._id) {
            setTitle(task.title)
            setText(task.text)
            setSpec(task.spec)
            setEmpl(task.employee)
            setFirstReward(Number(task.firstReward))
            setSecondReward(Number(task.secondReward))
            setPenalty(Number(task.penalty))
            setStart(getInputDate(task.start))
            setFirstEnd(getInputDate(task.firstEnd))
            setSecondEnd(getInputDate(task.secondEnd))
        }
    }, [isLoading])

    const [textAreaHeight, setTextAreaHeight] = useState(162)

    const resize = (e: any) => {
        if (e.target.scrollHeight <= 162)
            setTextAreaHeight(162)
        else
            setTextAreaHeight(e.target.scrollHeight)
        setText(e.target.value)
    }

    const handleSave = () => {
        if (taskId) {
            const updateTask: EditedTask = {
                id: taskId,
                task: {
                    _id: taskId,
                    title: title,
                    text: text,
                    spec: spec,
                    employee: empl,
                    firstReward: firstReward,
                    secondReward: secondReward,
                    penalty: penalty,
                    start: Number(new Date(start).getTime()),
                    firstEnd: Number(new Date(firstEnd).getTime()),
                    secondEnd: Number(new Date(secondEnd).getTime())
                }
            }
            dispatch(editTask(updateTask))

            setTimeout(() => {
                dispatch(fetchEmployeeTasks(user._id))
            }, 500)
            setTimeout(() => {
                // dispatch(fetchEmployeeTasks(user._id))
                navigate('/')
            }, 1000)

        }
    }


    const inputNames = [
        InputNames.TASK_TITLE,
        InputNames.TASK_REWARD,
        InputNames.TASK_REWARD,
        InputNames.TASK_REWARD,
        InputNames.DATE_START,
        InputNames.DATE_FIRST_END,
        InputNames.DATE_SECOND_END,
    ]
    const formValidator = new FormValidator(inputNames)

    return (
        <div className={cl.wrapper}>
            <div className={cl.wrap}>
                <div className={cl.titleEdit}>
                    <div className={cl.inputWrap}>
                        <label htmlFor="title" className={cl.label}>Заголовок:</label>
                        <Input
                            formValidator={formValidator}
                            indexInValidator={0}
                            type="text"
                            value={title}
                            name={InputNames.TASK_TITLE}
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
                            type={"string"}
                            position={'bottom'}
                            selectItem={spec}
                            setSelectItem={setSpec}
                            items={Object.values(Specialities)}/>
                    </div>
                </div>
                <div className={cl.pointsEdit}>
                    <div className={cl.inputWrap}>
                        <label htmlFor="first-reward" className={cl.label}>Первая награда:</label>
                        <Input
                            formValidator={formValidator}
                            id={'first-reward'}
                            placeholder={'0'}
                            type='number'
                            min={0}
                            name={InputNames.TASK_REWARD}
                            setValue={setFirstReward}
                            indexInValidator={1}
                            value={firstReward}
                        />
                    </div>
                    <div className={cl.inputWrap}>
                        <label htmlFor="second-reward" className={cl.label}>Вторая награда:</label>
                        <Input
                            id={'second-reward'}
                            placeholder={'0'}
                            formValidator={formValidator}
                            indexInValidator={2}
                            type={'number'}
                            min={0}
                            name={InputNames.TASK_REWARD}
                            value={secondReward}
                            setValue={setSecondReward}
                        />
                    </div>
                    <div className={cl.inputWrap}>
                        <label htmlFor="penalty" className={cl.label}>Штраф:</label>
                        <Input
                            name={InputNames.TASK_REWARD}
                            formValidator={formValidator}
                            indexInValidator={3}
                            setValue={setPenalty}
                            id={'penalty'}
                            placeholder={'0'}
                            type={'number'}
                            value={penalty}
                            min={0}
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'start'} className={cl.label}>Начало:</label>
                        <Input
                            id="start"
                            type="datetime-local"
                            value={start}
                            placeholder={''}
                            name={InputNames.DATE_START}
                            formValidator={formValidator}
                            indexInValidator={4}
                            setValue={setStartDate}
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'firstEnd'} className={cl.label}>Конец:</label>
                        <Input
                            id="firstEnd"
                            placeholder={''}
                            name={InputNames.DATE_FIRST_END}
                            formValidator={formValidator}
                            indexInValidator={5}
                            setValue={setFirstEndDate}
                            type="datetime-local"
                            value={firstEnd}
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'secondEnd'} className={cl.label}>Доп. дата:</label>
                        <Input
                            id="secondEnd"
                            placeholder={''}
                            name={InputNames.DATE_SECOND_END}
                            formValidator={formValidator}
                            indexInValidator={6}
                            setValue={setSecondEndDate}
                            type="datetime-local"
                            value={secondEnd}
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                        />
                    </div>
                </div>
                <div>
                    <div className={cl.employeeEdit}>
                        <div className={cl.inputWrap}>
                            <label htmlFor="employee" className={cl.label}>Сотрудник:</label>
                            <DropDownMenu
                                setSelectItem={setEmpl}
                                selectItem={empl}
                                items={employees}
                                position={'bottom'}
                                type={'employees'}
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
