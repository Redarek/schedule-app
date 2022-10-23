import React, {FC, useState} from 'react';
import {initialDate} from "../../Calendar";
import axios from "axios";
import {ITask} from "../../../types/ITask";
import cl from './CreateNewTask.module.css'

const CreateNewTask: FC = () => {
    const [title, setTitle] = useState<string>('')
    const [startTime, setStartTime] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)
    const [endTime, setEndTime] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)

    const handleCreate = async (e: any) => {
        e.preventDefault()
        const task: ITask = {
            title: title,
            startTime: new Date(startTime),
            endTime: new Date(endTime)
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
                <label htmlFor="startTime">Начало: </label>
                <input id="startTime"
                       className={cl.input}
                       type="datetime-local"
                       value={startTime}
                       onChange={(e) => setStartTime(e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="endTime">Конец: </label>
                <input id="endTime"
                       className={cl.input}
                       type="datetime-local"
                       value={endTime}
                       onChange={(e) => setEndTime(e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <input type="submit" onClick={(e) => handleCreate(e)}/>
            </div>
        </form>
    );
};

export default CreateNewTask;
