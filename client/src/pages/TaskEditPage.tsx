import React, {FC, useEffect, useState} from 'react';
import cl from '../styles/TaskEditPage.module.css'
import {useAppDispatch, useAppSelector,} from "../hooks/redux";
import {useNavigate, useParams} from "react-router-dom";
import {editTask, fetchTaskById} from "../store/reducers/ActionCreators";
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
    const [start, setStart] = useState<Date>()
    const [firstEnd, setFirstEnd] = useState<Date>()
    const [secondEnd, setSecondEnd] = useState<Date>()
    const [indexOfOpenMenu, setIndexOfOpenMenu] = useState<string>('')


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

        if (data !== undefined && typeof data !== "string") {
            console.log(typeof data)
            //@ts-ignore
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
            //@ts-ignore
            setStart(getDate(task.start))
            //@ts-ignore
            setFirstEnd(getDate(task.firstEnd))
            //@ts-ignore
            setSecondEnd(getDate(task.secondEnd))
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
                    employee: empl,
                    firstReward: String(firstReward),
                    secondReward: String(secondReward),
                    penalty: String(penalty),
                    start: start?.getTime(),
                    firstEnd: firstEnd?.getTime(),
                    secondEnd: secondEnd?.getTime(),
                    _id: taskId
                }
            }
            //@ts-ignore
            dispatch(editTask(updateTask))
            // dispatch(fetchTaskById(employee._id))
            navigate('/')
        }
    }


    //@todo Сделать обработку инпутов
    const inputs = [InputNames.NAME, InputNames.DATE]
    const formValidator = new FormValidator(inputs)

    return (
        <div className={cl.wrapper} onClick={() => setIndexOfOpenMenu('')}>
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
                        <Input
                            inputValidator={formValidator.getInput(InputNames.DATE)}
                            id={'first-reward'}
                            placeholder={'first-reward'}
                            type={'number'}
                            name={'first-reward'}
                            value={firstReward}
                            setValue={setFirstReward}
                        />
                    </div>
                    <div className={cl.inputWrap}>
                        <label htmlFor="second-reward" className={cl.label}>Вторая награда:</label>
                        <Input
                            inputValidator={formValidator.getInput(InputNames.DATE)}
                            id={'second-reward'}
                            placeholder={'second-reward'}
                            type={'number'}
                            name={'second-reward'}
                            value={secondReward}
                            setValue={setSecondReward}
                        />
                    </div>
                    <div className={cl.inputWrap}>
                        <label htmlFor="penalty" className={cl.label}>Штраф:</label>
                        <Input
                            inputValidator={formValidator.getInput(InputNames.DATE)}
                            id={'penalty'}
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
                            inputValidator={formValidator.getInput(InputNames.DATE)}
                            id={'start'}
                            placeholder={'start'}
                            type={'datetime-local'}
                            name={'start'}
                            //@ts-ignore
                            value={getDate(start)}
                            setValue={setStart}
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'firstEnd'} className={cl.label}>Конец:</label>
                        <Input
                            inputValidator={formValidator.getInput(InputNames.DATE)}
                            id={'firstEnd'}
                            placeholder={'firstEnd'}
                            type={'datetime-local'}
                            name={'firstEnd'}
                            //@ts-ignore
                            value={getDate(firstEnd)}
                            setValue={setFirstEnd}
                        />
                    </div>
                </div>
                <div className={cl.dateWrap}>
                    <div className={cl.inputWrap}>
                        <label htmlFor={'secondEnd'} className={cl.label}>Доп. дата:</label>
                        <Input
                            inputValidator={formValidator.getInput(InputNames.DATE)}
                            id={'secondEnd'}
                            placeholder={'secondEnd'}
                            type={'datetime-local'}
                            name={'secondEnd'}
                            //@ts-ignore
                            value={getDate(secondEnd)}
                            setValue={setSecondEnd}
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
