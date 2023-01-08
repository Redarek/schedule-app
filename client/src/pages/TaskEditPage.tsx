import React, {FC, useEffect, useState} from 'react';
import cl from '../styles/TaskEditPage.module.css'
import {useAppDispatch, useAppSelector,} from "../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import {EditedTask, editTask, fetchEmployeeTasks, fetchTaskById} from "../store/reducers/ActionCreators";
import Input from "../components/UI/Input/Input";
import Button from "../components/UI/Button/Button";
import {FormValidator} from "../models/FormValidator";
import {InputNames} from "../models/InputValidator";
import DropDownMenu from "../components/UI/DropDownMenu/DropDownMenu";
import {Specialities} from "../types/Specialities";

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

    const [start, setStart] = useState<Date>(new Date())
    const [firstEnd, setFirstEnd] = useState<Date>(new Date(new Date().getTime() + 1800000))
    const [secondEnd, setSecondEnd] = useState<Date>(new Date(new Date().getTime() + 3600000))


    const setDate = (index: 0 | 1 | 2, data: string) => {
        const date = new Date(`${data}`)
        if (date.getTime())
            switch (index) {
                case 0:
                    setStart(date)
                    break;
                case 1:
                    setFirstEnd(date)
                    break;
                case 2:
                    setSecondEnd(date)
                    break;
            }
    }

    const getDate = (data: Date) => {
        let date = `${data.getDate()}`
        let month = `${data.getMonth() + 1}`;
        let year = `${data.getFullYear()}`;
        let hours = `${data.getHours()}`;
        let minutes = `${data.getMinutes()}`;
        if (month.length === 1) month = `0${month}`
        if (date.length === 1) date = `0${date}`
        if (hours.length === 1) hours = `0${hours}`
        if (minutes.length === 1) minutes = `0${minutes}`
        if (year.length === 1) year = `000${year}`
        if (year.length === 2) year = `00${year}`
        if (year.length === 3) year = `0${year}`
        return `${year}-${month}-${date}T${hours}:${minutes}`
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
            setStart(task.start)
            setFirstEnd(task.firstEnd)
            setSecondEnd(task.secondEnd)
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
                    title: title,
                    text: text,
                    spec: spec,
                    employee: empl,
                    firstReward: firstReward,
                    secondReward: secondReward,
                    penalty: penalty,
                    start: start.getTime(),
                    firstEnd: firstEnd.getTime(),
                    secondEnd: secondEnd.getTime(),
                    _id: taskId
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


    //@todo Сделать обработку инпутов
    const inputs = [InputNames.NAME]
    const formValidator = new FormValidator(inputs)

    return (
        <div className={cl.wrapper}>
            <div className={cl.wrap}>
                <div className={cl.titleEdit}>
                    <div className={cl.inputWrap}>
                        <label htmlFor="title" className={cl.label}>Заголовок:</label>
                        <Input
                            inputValidator={formValidator.getInput(InputNames.NAME)}
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
                        <input
                            id={'first-reward'}
                            placeholder={'0'}
                            className={cl.input}
                            type='number'
                            min={0}
                            name={'first-reward'}
                            value={firstReward}
                            onChange={(e: any) => setFirstReward(e.target.value)}
                        />
                    </div>
                    <div className={cl.inputWrap}>
                        <label htmlFor="second-reward" className={cl.label}>Вторая награда:</label>
                        <input
                            id={'second-reward'}
                            placeholder={'0'}
                            className={cl.input}
                            type={'number'}
                            min={0}
                            name={'second-reward'}
                            value={secondReward}
                            onChange={(e: any) => setSecondReward(e.target.value)}
                        />
                    </div>
                    <div className={cl.inputWrap}>
                        <label htmlFor="penalty" className={cl.label}>Штраф:</label>

                        <input
                            id={'penalty'}
                            className={cl.input}
                            placeholder={'0'}
                            type={'number'}
                            name={'penalty'}
                            value={penalty}
                            min={0}
                            onChange={(e: any) => setPenalty(e.target.value)}
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'start'} className={cl.label}>Начало:</label>
                        <input
                            id="start"
                            className={cl.input}
                            type="datetime-local"
                            value={getDate(start)}
                            onChange={(e) => setDate(0, e.target.value)}
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'firstEnd'} className={cl.label}>Конец:</label>
                        {/*<input*/}
                        {/*    inputValidator={formValidator.getInput(InputNames.DATE)}*/}
                        {/*    id={'firstEnd'}*/}
                        {/*    placeholder={'firstEnd'}*/}
                        {/*    type={'datetime-local'}*/}
                        {/*    name={'firstEnd'}*/}
                        {/*    //@ts-ignore*/}
                        {/*    value={getDate(firstEnd)}*/}
                        {/*    setValue={setFirstEnd}*/}
                        {/*/>*/}
                        <input
                            id="firstEnd"
                            className={cl.input}
                            type="datetime-local"
                            value={getDate(firstEnd)}
                            onChange={(e) => setDate(1, e.target.value)}
                            pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'secondEnd'} className={cl.label}>Доп. дата:</label>
                        {/*<input*/}
                        {/*    inputValidator={formValidator.getInput(InputNames.DATE)}*/}
                        {/*    id={'secondEnd'}*/}
                        {/*    placeholder={'secondEnd'}*/}
                        {/*    type={'datetime-local'}*/}
                        {/*    name={'secondEnd'}*/}
                        {/*    //@ts-ignore*/}
                        {/*    value={getDate(secondEnd)}*/}
                        {/*    setValue={setSecondEnd}*/}
                        {/*/>*/}
                        <input
                            id="secondEnd"
                            className={cl.input}
                            type="datetime-local"
                            value={getDate(secondEnd)}
                            onChange={(e) => setDate(2, e.target.value)}
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
