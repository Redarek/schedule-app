import React, {FC, useState} from 'react';
import {initialDate} from "../../Calendar";
import axios from "axios";
import {ITask, ITasks} from "../../../types/ITasks";
import cl from './CreateNewTask.module.css'
import {useAppSelector} from "../../../hooks/redux";
import {logout} from "../../../store/reducers/ActionCreators";

const CreateNewTask: FC = () => {
    //@todo Сделать функцию создания тасков
    //@todo Список сотрудников поле Employee
    //@todo Список сотрудников поле Spec
    //@todo Проверить правильность создание даты строки 18 19 20
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [firstReward, setFirstReward] = useState<number>(0)
    const [secondReward, setSecondReward] = useState<number>(0)
    const [penalty, setPenalty] = useState<number>(0)
    const [start, setStart] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)
    const [firstEnd, setFirstEnd] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)
    const [secondEnd, setSecondEnd] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)

    console.log(String(new Date()))
    const {user} = useAppSelector(state => state.authSlice)
    const handleCreate = async (e: any) => {
        e.preventDefault()
        const task: ITask = {
            user: user.user.id,
            employee: '',
            spec: '',
            timestamp: String(new Date()),
            title: title,
            text: text,
            complete: false,
            firstReward: firstReward,
            secondReward: secondReward,
            penalty: penalty,
            start: start,
            firstEnd: firstEnd,
            secondEnd: secondEnd,
        }
        await axios.post('http://localhost:5050/events', task)
    }
    return (
        <form className={cl.form}>
            <div className={cl.inputWrap}>
                <label htmlFor="title">Заголовок: </label>
                <input id="title"
                       required
                       className={cl.input}
                       type="text"
                       placeholder={"Title"}
                       value={title}
                       onChange={(e:any) => setTitle(e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="start">Начало: </label>
                <input id="start"
                       className={cl.input}
                       type="datetime-local"
                       value={String(start)}
                       onChange={(e) => setStart(e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="endTime">Конец: </label>
                <input id="endTime"
                       className={cl.input}
                       type="datetime-local"
                       value={firstEnd}
                       onChange={(e) => setFirstEnd(e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <input type="submit" onClick={(e) => handleCreate(e)}/>
            </div>
        </form>
    );
};

export default CreateNewTask;
