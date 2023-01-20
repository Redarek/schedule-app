import React, {FC, Fragment, useEffect, useState} from 'react';
import {ITask} from "../../types/ITasks";
import cl from './CreateNewTask.module.css'
import Button from "../UI/Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {createTask, fetchEmployeeTasks} from "../../store/reducers/ActionCreators";
import DropDownMenu from "../UI/DropDownMenu/DropDownMenu";
import {Categories} from "../../types/Categories";
import {FormValidator} from "../UI/Input/models/FormValidator";
import {InputNames} from "../UI/Input/models/InputValidator";
import Input from "../UI/Input/Input";
import {getInputDate} from "../UI/Input/inputDateFormat";
import CheckBox from "../UI/CheckBox/CheckBox";

interface CreateNewTaskProps {
    setModalVisible: (isShow: boolean) => void;
    startDate: Date
}

const categoriesList = Object.values(Categories)

const CreateNewTask: FC<CreateNewTaskProps> = ({setModalVisible, startDate}) => {
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [categories, setCategories] = useState<Categories[]>([])
    const [employeeName, setEmployeeName] = useState<string>('Сотрудник')
    const [firstReward, setFirstReward] = useState<number>(0)
    const [secondReward, setSecondReward] = useState<number>(0)
    const [penalty, setPenalty] = useState<number>(0)

    const [start, setStart] = useState<string>(getInputDate(startDate))
    const [firstEnd, setFirstEnd] = useState<string>(getInputDate(new Date(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime() + 85800000)))
    const [secondEnd, setSecondEnd] = useState<string>(getInputDate(new Date(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime() + 85800000)))


    const setStartDate = (data: string) => {
        const date = new Date(`${data}`)
        if (date.getTime())
            setStart(getInputDate(date))
    }


    const setFirstEndDate = (data: string) => {
        const date = new Date(`${data}`)
        setFirstEnd(getInputDate(date))
    }

    const setSecondEndDate = (data: string) => {
        const date = new Date(`${data}`)
        setSecondEnd(getInputDate(date))
    }

    const inputNames = [
        InputNames.TASK_TITLE,
        InputNames.DATE_START,
        InputNames.DATE_FIRST_END,
        InputNames.DATE_SECOND_END,
        InputNames.TASK_REWARD,
        InputNames.TASK_REWARD,
        InputNames.TASK_REWARD,
    ]
    const formValidator = new FormValidator(inputNames)

    const {employees, isLoading, error, employee} = useAppSelector(state => state.employeeSlice)

    const handleCreate = (e: any) => {
        e.preventDefault()
        if (
            employeeName !== "Сотрудник"
            && text !== ''
            && formValidator.getFormStatus()
        ) {
            const task: ITask = {
                _id: '',
                employee: employeeName,
                categories: categories,
                title: title,
                text: text,
                firstReward: firstReward,
                secondReward: secondReward,
                penalty: penalty,
                start: Number(new Date(start).getTime()),
                firstEnd: Number(new Date(firstEnd).getTime()),
                secondEnd: Number(new Date(secondEnd).getTime())
            }
            // console.log(task)
            dispatch(createTask(task))
            setTimeout(() => {
                dispatch(fetchEmployeeTasks(employee._id))
            }, 700)
            setEmployeeName('Сотрудник')
            setCategories([])
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
                {/*<label htmlFor="title">Заголовок: </label>*/}
                <Input
                    id="title"
                    name={InputNames.TASK_TITLE}
                    formValidator={formValidator}
                    setValue={setTitle}
                    type="text"
                    placeholder={'Название'}
                    value={title}
                    indexInValidator={0}
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="start">Начало: </label>
                <Input id="start"
                       placeholder={''}
                       type="datetime-local"
                       value={start}
                       formValidator={formValidator}
                       setValue={setStartDate}
                       name={InputNames.DATE_START}
                       indexInValidator={1}
                       pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="firstEnd">Конец: </label>
                <Input id="firstEnd"
                       placeholder={''}
                       name={InputNames.DATE_FIRST_END}
                       type="datetime-local"
                       value={firstEnd}
                       setValue={setFirstEndDate}
                       formValidator={formValidator}
                       indexInValidator={2}
                       pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                />
            </div>
            <div className={cl.inputWrap}>
                <label htmlFor="secondEnd">Доп. конец: </label>
                <Input id="secondEnd"
                       placeholder={''}
                       formValidator={formValidator}
                       name={InputNames.DATE_SECOND_END}
                       setValue={setSecondEndDate}
                       type="datetime-local"
                       value={secondEnd}
                       indexInValidator={3}
                       pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                />
            </div>
            <div className={cl.inputWrap}>
                <label>Категория:</label>
                <div className={cl.categories}>
                    {categoriesList.map((category) =>
                        <div className={cl.category} key={category}>
                            <CheckBox
                                value={category}
                                list={categories}
                                setList={setCategories}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={cl.inputWrap}>
                <DropDownMenu selectItem={employeeName} setSelectItem={setEmployeeName} items={employees}
                              type={"employees"} position={"bottom"}/>
            </div>
            <div className={cl.rewards}>
                <div className={cl.rewardsInputWrap}>
                    <label htmlFor="firstReward">Первая награда: </label>
                    <Input id="firstReward"
                           formValidator={formValidator}
                           setValue={setFirstReward}
                           indexInValidator={4}
                           name={InputNames.TASK_REWARD}
                           type="number"
                           placeholder={"0"}
                           value={firstReward}
                           min={0}
                    />
                </div>
                <div className={cl.rewardsInputWrap}>
                    <label htmlFor="secondReward">Вторая награда: </label>
                    <Input id="secondReward"
                           formValidator={formValidator}
                           name={InputNames.TASK_REWARD}
                           setValue={setSecondReward}
                           type="number"
                           placeholder={"0"}
                           indexInValidator={5}
                           value={secondReward}
                           min={0}
                    />
                </div>
                <div className={cl.rewardsInputWrap}>
                    <label htmlFor="penalty">Штраф: </label>
                    <Input id="penalty"
                           formValidator={formValidator}
                           name={InputNames.TASK_REWARD}
                           setValue={setPenalty}
                           type="number"
                           placeholder={'0'}
                           indexInValidator={6}
                           value={penalty}
                           min={0}
                    />
                </div>
            </div>
            <div className={cl.inputWrap}>
                {/*<label htmlFor="text">Описание: </label>*/}
                <textarea
                    placeholder={'Описание'}
                    id="text"
                    className={cl.textarea}
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>

            <div className={cl.inputWrap}>
                <div className={cl.submit}>
                    <Button onClick={(e) => handleCreate(e)}>Создать</Button>
                </div>
            </div>
        </form>
    );
};

export default CreateNewTask;
