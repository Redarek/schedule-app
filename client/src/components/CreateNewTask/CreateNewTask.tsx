import React, {FC, useEffect, useState} from 'react';
import {ITask} from "../../types/ITasks";
import cl from './CreateNewTask.module.css'
import Button from "../UI/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createTask} from "../../store/reducers/ActionCreators";
import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import {Specialities} from "../../types/Specialities";
import {FormValidator} from "../../models/FormValidator";
import {InputNames} from "../../models/InputValidator";

interface CreateNewTaskProps {
    setModalVisible: (isShow: boolean) => void;
}

const CreateNewTask: FC<CreateNewTaskProps> = ({setModalVisible}) => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [spec, setSpec] = useState<string>('Специальность')
    const [employeeName, setEmployeeName] = useState<string>('Сотрудник')
    const [firstReward, setFirstReward] = useState<number>(0)
    const [secondReward, setSecondReward] = useState<number>(0)
    const [penalty, setPenalty] = useState<number>(0)

    const [start, setStart] = useState<Date>(new Date())
    const [firstEnd, setFirstEnd] = useState<Date>(new Date(new Date().getTime() + 1800000))
    const [secondEnd, setSecondEnd] = useState<Date>(new Date(new Date().getTime() + 3600000))


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

    const {employees, isLoading, error, employee} = useAppSelector(state => state.employeeSlice)
    // useEffect(() => {
    //     if (employees.length === 0) {
    //         dispatch(fetchEmployees())
        // }
    // }, [])

    const handleCreate = (e: any) => {
        e.preventDefault()
        if (employeeName === ''
            || spec === ''
            || title === ''
            || text === ''
            || firstReward < 0
            || penalty < 0
            || secondReward < 0
        ) {
        } else if (start < firstEnd && start < secondEnd && firstEnd < secondEnd && employeeName !== "Сотрудник" && spec !== 'Специальность') {
            const task: ITask = {
                _id: '',
                employee: employeeName,
                spec: spec,
                title: title,
                text: text,
                firstReward: String(firstReward),
                secondReward: String(secondReward),
                penalty: String(penalty),
                start: Number(start.getTime()),
                firstEnd: Number(firstEnd.getTime()),
                secondEnd: Number(secondEnd.getTime())
            }
            dispatch(createTask(task))
            setEmployeeName('')
            setSpec('')
            setTitle('')
            setText('')
            setFirstReward(0)
            setSecondReward(0)
            setPenalty(0)
            setModalVisible(false)
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
                       value={getDate(start)}
                       onChange={(e) => setDate(0, e.target.value)}
                       pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="firstEnd">Конец: </label>
                <input id="firstEnd"
                       className={cl.input}
                       type="datetime-local"
                       value={getDate(firstEnd)}
                       onChange={(e) => setDate(1, e.target.value)}
                       pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="secondEnd">Доп. конец: </label>
                <input id="secondEnd"
                       className={cl.input}
                       type="datetime-local"
                       value={getDate(secondEnd)}
                       pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                       onChange={(e) => setDate(2, e.target.value)}
                />
            </div>
            <div className={cl.inputWrap}>
                <DropDownMenu selectItem={spec} setSelectItem={setSpec} items={Object.values(Specialities)}
                              type={"string"}
                              position={"bottom"}/>
            </div>
            <div className={cl.inputWrap}>
                <DropDownMenu selectItem={employeeName} setSelectItem={setEmployeeName} items={employees}
                              type={"employees"} position={"bottom"}/>
            </div>
            <div className={cl.rewards}>
                <div className={cl.rewardsInputWrap}>
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
                <div className={cl.rewardsInputWrap}>
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
                <div className={cl.rewardsInputWrap}>
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
