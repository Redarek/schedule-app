import React, {FC, useEffect, useState} from 'react';
import {initialDate} from "../Calendar/utils";
import {ITask} from "../../types/ITasks";
import cl from './CreateNewTask.module.css'
import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import Button from "../UI/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createTask, fetchEmployees, fetchEmployeeTasks} from "../../store/reducers/ActionCreators";

interface CreateNewTaskProps {
    setModalVisible: (isShow: boolean) => void;
}

const CreateNewTask: FC<CreateNewTaskProps> = ({setModalVisible}) => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [spec, setSpec] = useState<string>('')
    const [employeeName, setEmployeeName] = useState<string>('')
    const [firstReward, setFirstReward] = useState<number>(0)
    const [secondReward, setSecondReward] = useState<number>(0)
    const [penalty, setPenalty] = useState<number>(0)
    const [start, setStart] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)
    const [firstEnd, setFirstEnd] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)
    const [secondEnd, setSecondEnd] = useState<string>(`${initialDate.getFullYear()}-${initialDate.getMonth() + 1}-${initialDate.getDate()}T00:00`)
    const [indexOfOpenMenu, setIndexOfOpenMenu] = useState<string>('0')

    const {employees, isLoading, error, employee} = useAppSelector(state => state.employeeSlice)

    useEffect(() => {
        if (employees.length === 0) {
            // dispatch(fetchEmployees())
        }
    }, [])

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
        } else {
            const task: ITask = {
                _id: '',
                employee: employeeName,
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
                       value={start}
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
                    indexOfMenu={'0'}
                    indexOfOpenMenu={indexOfOpenMenu}
                    setIndexOfOpenMenu={setIndexOfOpenMenu}
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
                    indexOfMenu={'1'}
                    indexOfOpenMenu={indexOfOpenMenu}
                    setIndexOfOpenMenu={setIndexOfOpenMenu}
                    menuType={'employees'}
                    title={'Сотрудник...'}
                    menuItems={employees}
                    dropMenuItem={employeeName}
                    setDropMenuItem={setEmployeeName}
                    viewMode={"bottom"}
                />
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
