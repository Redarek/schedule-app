import React, {FC, useEffect, useState} from 'react';
import cl from "../styles/EmployeePage.module.css";
import Input from "./UI/Input/Input";
import {IUser} from "../types/IUser";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {fetchEmployeeById, fetchUser, updateEmployee} from "../store/reducers/ActionCreators";
import {useNavigate} from "react-router-dom";
import {FormValidator} from "./UI/Input/models/FormValidator";
import {InputNames} from "./UI/Input/models/InputValidator";

interface EmployeeCardProps {
    employee: IUser
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.authSlice.user)
    const {updateEmployeeError} = useAppSelector(state => state.employeeSlice)
    const {isLoading, employeeAllBonuses, employeeWeekBonuses} = useAppSelector(state => state.bonusesSlice)


    useEffect(() => {
        setEmail(employee.email);
        setName(employee.name);
    }, [employee])


    const [editMenuIsShow, setEditMenuIsShow] = useState<boolean>(false)

    const [email, setEmail] = useState<string>(employee.email);
    const [name, setName] = useState<string>(employee.name);

    const [viewMode, setViewMode] = useState<"right" | "bottom">('right')

    const inputs = [InputNames.EMAIL, InputNames.NAME]
    const formValidator = new FormValidator(inputs)

    const [changedUser, setChangedUser] = useState<IUser>({...employee})

    useEffect(() => {
        if (window.screen.width < 768) setViewMode("bottom")

    }, [])


    const handleEditInfo = () => {
        // setEditMenuIsShow(!editMenuIsShow)
        const changedUser: IUser = {
            ...employee,
            email: email,
            name: name,
        }
        setChangedUser(changedUser)
        if (formValidator.getFormStatus()) {
            const promise = new Promise((resolve, reject) => {
                resolve(() => {
                    dispatch(updateEmployee({user: changedUser, id: changedUser._id}))
                })
            })
            promise
                .then(() => {
                    if (user._id === employee._id) {
                        console.log('Запрос пользователя')
                    }
                    dispatch(fetchEmployeeById(employee._id))
                })
                .then(() => {
                    navigate(`/employee-page/${employee.latinName}`)
                })
        }
    }

    return (
        <div className={cl.employeeCard}>
            <div className={cl.employeeIcon}>
                <div className={cl.img}>
                    {employee.icon
                        ? <img className={cl.img} src={employee.icon} alt="employeeIcon"/>
                        : 'img'
                    }
                </div>
            </div>
            <div className={cl.employeeInfo}>
                <div className={cl.infoHeader}>
                    Основная информация <br/>
                    {updateEmployeeError}
                    {editMenuIsShow
                        ? <div className={cl.updateBtnContainer} onClick={() => handleEditInfo()}>
                            <span className={cl.updateBtn}></span>
                            <span className={cl.updateBtn}></span>
                        </div>
                        : ''
                    }
                    {user._id === employee._id
                        ?
                        <div className={cl.settingsBtnContainer} onClick={() => setEditMenuIsShow(!editMenuIsShow)}>
                            <div className={cl.settingsBtnImg}>
                                <img src="/images/settingsIcon.svg" alt=""/>
                            </div>
                            {editMenuIsShow
                                ? <div className={cl.activeBtn}></div>
                                : ''
                            }
                        </div>
                        : ''
                    }
                </div>
                {editMenuIsShow
                    ?
                    <div className={cl.infoContainer}>
                        <div className={cl.infoText}>
                            <div className={cl.input}>
                                <Input
                                    indexInValidator={0}
                                    formValidator={formValidator}
                                    id={'email'}
                                    name={InputNames.EMAIL}
                                    placeholder={`${email}`}
                                    value={email}
                                    setValue={setEmail}
                                    type={"email"}
                                />
                            </div>
                        </div>
                        <div className={cl.infoText}>
                            <div className={cl.input}>
                                <Input
                                    indexInValidator={1}
                                    formValidator={formValidator}
                                    id={'name'}
                                    name={InputNames.NAME}
                                    placeholder={`${name}`}
                                    value={name}
                                    setValue={setName}
                                    type={"text"}
                                />
                            </div>
                        </div>
                        {/*<div className={cl.infoText}>*/}
                        {/*    <div className={cl.input}>*/}
                        {/*        <DropDownMenu type={"string"} position={viewMode} selectItem={spec}*/}
                        {/*                      setSelectItem={setSpec} items={Object.values(Categories)}/>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                    : <div className={cl.infoContainer}>
                        <div className={cl.infoText}
                             onClick={() => navigator.clipboard.writeText(`${employee.email}`)}>Email: <span>{employee.email}</span>
                        </div>
                        <div className={cl.infoText}>Имя: <span>{employee.name}</span></div>
                        {/*<div className={cl.infoText}>Категории: <span>{employee.categories}</span></div>*/}
                        <div className={cl.infoText}>
                            Все бонусы:<span>{isLoading ? 'loading' : employeeAllBonuses}</span>
                        </div>
                        <div className={cl.infoText}>
                            Бонусы за неделю: <span>{employeeWeekBonuses}</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default EmployeeCard;
