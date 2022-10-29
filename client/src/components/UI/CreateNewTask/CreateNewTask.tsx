import React, {FC, useEffect, useState} from 'react';
import {initialDate} from "../../Calendar";
import {ITask, ITasks} from "../../../types/ITasks";
import cl from './CreateNewTask.module.css'
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import TasksService from "../../../services/TaskService";
import Button from "../Button/Button";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchUsers} from "../../../store/reducers/ActionCreators";

const CreateNewTask: FC = () => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [spec, setSpec] = useState<string>('')
    const [employee, setEmployee] = useState<string>('')
    const [firstReward, setFirstReward] = useState<number>(0)
    const [secondReward, setSecondReward] = useState<number>(0)
    const [penalty, setPenalty] = useState<number>(0)
    const [start, setStart] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)
    const [firstEnd, setFirstEnd] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)
    const [secondEnd, setSecondEnd] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)
    const [openMenuTitle, setOpenMenuTitle] = useState<string>('')

    const {employees, isLoading, error} = useAppSelector(state => state.employeesSlice)
    useEffect(() => {
        if (employees.length === 0) {
            dispatch(fetchUsers())
        }
    })

    const handleCreate = async (e: any) => {
        e.preventDefault()
        if (employee === '' || spec === '' || title === '' || text === '' || firstReward === 0 || penalty === 0) {
        } else {
            const task: ITask = {
                employee: employee,
                spec: spec,
                title: title,
                text: text,
                firstReward: String(firstReward),
                secondReward: String(secondReward),
                penalty: String(penalty),
                start: start,
                firstEnd: firstEnd,
                secondEnd: secondEnd
            }
            setEmployee('')
            setSpec('')
            setTitle('')
            setText('')
            setFirstReward(0)
            setSecondReward(0)
            setPenalty(0)
            await TasksService.createTask(task)
        }
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
                       onChange={(e: any) => setTitle(e.target.value)}
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
                <label htmlFor="firstEnd">Конец: </label>
                <input id="firstEnd"
                       className={cl.input}
                       type="datetime-local"
                       value={firstEnd}
                       onChange={(e) => setFirstEnd(e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="secondEnd">Доп. конец: </label>
                <input id="secondEnd"
                       className={cl.input}
                       type="datetime-local"
                       value={secondEnd}
                       onChange={(e) => setSecondEnd(e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <DropDownMenu
                    openMenuTitle={openMenuTitle}
                    setOpenMenuTitle={setOpenMenuTitle}
                    menuType={'spec'}
                    title={'Специализация...'}
                    menuItems={[]}
                    dropMenuItem={spec}
                    setDropMenuItem={setSpec}
                    viewMode={"bottom"}
                />
            </div>
            <div className={cl.inputWrap}>
                <DropDownMenu
                    openMenuTitle={openMenuTitle}
                    setOpenMenuTitle={setOpenMenuTitle}
                    menuType={'employees'}
                    title={'Сотрудник...'}
                    menuItems={employees}
                    dropMenuItem={employee}
                    setDropMenuItem={setEmployee}
                    viewMode={"bottom"}
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="firstReward">Первая награда: </label>
                <input id="firstReward"
                       required
                       className={cl.input}
                       type="number"
                       placeholder={"0"}
                       value={firstReward}
                       min={0}
                       onChange={(e: any) => setFirstReward(e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="secondReward">Вторая награда: </label>
                <input id="secondReward"
                       required
                       className={cl.input}
                       type="number"
                       placeholder={"0"}
                       value={secondReward}
                       min={0}
                       onChange={(e: any) => setSecondReward(e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="penalty">Штраф: </label>
                <input id="penalty"
                       required
                       className={cl.input}
                       type="number"
                       placeholder={'0'}
                       value={penalty}
                       min={0}
                       onChange={(e: any) => setPenalty(e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="text">Описание: </label>
                <textarea
                    id="text"
                    className={cl.textarea}
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>

            <div className={cl.inputWrap}>
                <Button onClick={(e) => handleCreate(e)}>Создать</Button>
            </div>
        </form>
    );
};

export default CreateNewTask;