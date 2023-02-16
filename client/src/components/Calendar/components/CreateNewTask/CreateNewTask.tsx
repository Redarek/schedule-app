import React, {FC, useEffect, useState} from 'react';
import {ITask} from "../../../../types/ITasks";
import cl from './CreateNewTask.module.css'
import Button from "../../../UI/Button/Button";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {createTask, fetchEmployeeTasks} from "../../../../store/reducers/ActionCreators";
import DropDownMenu from "../../../UI/DropDownMenu/DropDownMenu";
import {Categories} from "../../../../types/Categories";
import {FormValidator} from "../../../UI/Input/models/FormValidator";
import {InputNames} from "../../../UI/Input/models/InputValidator";
import Input from "../../../UI/Input/Input";
import {getInputDate} from "../../../UI/Input/inputDateFormat";
import CheckBox from "../../../UI/CheckBox/CheckBox";
import {Roles} from "../../../../types/Roles";

interface CreateNewTaskProps {
    setModalVisible: (isShow: boolean) => void;
    startDate: Date
}

const categoriesList = Object.values(Categories)

function Fragment() {
    return null;
}

const CreateNewTask: FC<CreateNewTaskProps> = ({setModalVisible, startDate}) => {
    const {user} = useAppSelector(state => state.authSlice.user)
    const dispatch = useAppDispatch()
    const [title, setTitle] = useState<string>('')
    const [text, setText] = useState<string>('')
    const [categories, setCategories] = useState<Categories[]>([Categories.CATEGORY_C])
    const [employeeName, setEmployeeName] = useState<string>(user.name)
    const [firstReward, setFirstReward] = useState<number>(0)
    const [secondReward, setSecondReward] = useState<number>(0)
    const [penalty, setPenalty] = useState<number>(0)

    const [start, setStart] = useState<string>(getInputDate(startDate))
    const [firstEnd, setFirstEnd] = useState<string>(getInputDate(new Date(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime() + 86399000)))
    const [secondEnd, setSecondEnd] = useState<string>(getInputDate(new Date(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime() + 86399000)))

    const [taskDeadline, setTaskDeadline] = useState(false)
    const [taskDescription, setTaskDescription] = useState(false)
    const [taskRewards, setTaskRewards] = useState(false)

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

    useEffect(() => {
        if (categories.length > 0) {
            switch (categories[0]) {
                case Categories.CATEGORY_A:
                    setFirstReward(7)
                    setSecondReward(0)
                    setPenalty(0)
                    if (!taskDeadline) {
                        setSecondReward(7)
                        setPenalty(0)
                    }
                    break;
                case Categories.CATEGORY_B:
                    setFirstReward(4)
                    setSecondReward(0)
                    setPenalty(0)
                    if (!taskDeadline) {
                        setSecondReward(4)
                        setPenalty(0)
                    }
                    break;
                case Categories.CATEGORY_C:
                    setFirstReward(2)
                    setSecondReward(0)
                    setPenalty(0)
                    if (!taskDeadline) {
                        setSecondReward(2)
                        setPenalty(0)
                    }
                    break;
                default:
                    break;
            }
        } else {
            setFirstReward(0)
            setSecondReward(0)
            setPenalty(0)
        }
    }, [categories])
    useEffect(() => {
        if (!taskDeadline) {
            setStart(getInputDate(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())))
            // setSecondReward(0)
            // setPenalty(0)
        } else {
            setStart(getInputDate(startDate))
        }
        setFirstEnd(getInputDate(new Date(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime() + 86399000)))
        setSecondEnd(getInputDate(new Date(new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).getTime() + 86399000)))
    }, [taskDeadline])
    let inputNames = [
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
            // && formValidator.getFormStatus()
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

            const promise = new Promise((resolve, reject) => {
                resolve(dispatch(createTask(task)))
            })
            promise.then(() => {
                dispatch(fetchEmployeeTasks(employee._id))
            })
            setEmployeeName(user.name)
            setCategories([])
            setTitle('')
            setText('')
            setFirstReward(0)
            setSecondReward(0)
            setPenalty(0)
            setModalVisible(false)
        }
    }

    console.log(start, firstEnd, secondEnd)
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
            {taskDeadline
                ?
                <div className={cl.inputWrap}>
                    <label htmlFor="start">Начало: </label>
                    <Input id="start"
                           readonly={!taskDeadline}
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
                : ''
            }
            {taskDeadline
                ?
                <div className={cl.inputWrap}>
                    <label htmlFor="firstEnd">Конец: </label>
                    <Input id="firstEnd"
                           readonly={!taskDeadline}
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
                : ''
            }
            {taskDeadline
                ? <div className={cl.inputWrap}>
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
                : ''
            }
            <div className={cl.inputWrap}>
                <label>Категория:</label>
                <div className={cl.categories}>
                    {categoriesList.map((category) =>
                        <div className={cl.category} key={category}>
                            <CheckBox
                                type={"radio"}
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
            {user.roles.includes(Roles.TASK_MANAGER) && taskRewards || categories.length !== 0 && !taskRewards
                ? <div className={cl.rewards}>
                    <div className={cl.rewardsInputWrap}>
                        <label htmlFor="firstReward">{!taskDeadline ? 'Награда:' : 'Первая награда:'} </label>
                        <Input id="firstReward"
                               readonly={categories.length !== 0}
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
                    {taskDeadline
                        ? <div className={cl.rewardsInputWrap}>
                            <label htmlFor="secondReward">Вторая награда: </label>
                            <Input id="secondReward"
                                   readonly={categories.length !== 0}
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
                        : ''
                    }
                    {taskDeadline
                        ? <div className={cl.rewardsInputWrap}>
                            <label htmlFor="penalty">Штраф: </label>
                            <Input id="penalty"
                                   readonly={categories.length !== 0}
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
                        : ''
                    }
                </div>
                : ''
            }
            {taskDescription
                ? <div className={cl.inputWrap}>
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
                : ''
            }

            <div className={cl.settings}>
                <div className={[cl.settingBtn, taskDeadline ? cl.settingBtnActive : ''].join(' ')}
                     onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                         e.preventDefault()
                         setTaskDeadline(!taskDeadline)
                     }}>Дедлайн
                </div>
                <div
                    className={[cl.settingBtn, taskDescription ? cl.settingBtnActive : ''].join(' ')}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        e.preventDefault()
                        setTaskDescription(!taskDescription)
                    }}>Описание
                </div>
                {user.roles.includes(Roles.TASK_MANAGER)
                    ? <div
                        className={[cl.settingBtn, taskRewards ? cl.settingBtnActive : ''].join(' ')}
                        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.preventDefault()
                            setTaskRewards(!taskRewards)
                        }}>Очки
                    </div>
                    : ''
                }
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
