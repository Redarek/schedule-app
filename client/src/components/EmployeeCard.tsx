import React, {FC, useEffect, useState} from 'react';
import cl from "../styles/EmployeePage.module.css";
import Input from "./UI/Input/Input";
import {IUser} from "../types/IUser";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {changeEmployee} from "../store/reducers/EmployeeSlice";
import {updateEmployee} from "../store/reducers/ActionCreators";
import {editUser} from "../store/reducers/authSlice";
import {useNavigate} from "react-router-dom";
import {translit} from "../utils/transliter";
import DropDownMenuV2 from "./UI/DropDownMenu/DropDownMenuV2";
import {Specialities} from "../types/Specialities";

interface EmployeeCardProps {
    employee: IUser
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.authSlice.user)
    const {updateEmployeeError} = useAppSelector(state => state.employeeSlice)
    const {isLoading, employeeAllBonuses} = useAppSelector(state => state.bonusesSlice)


    useEffect(() => {
        setEmail(employee.email);
        setName(employee.name);
        setSpec(employee.spec)
    }, [employee])


    const [editMenuIsShow, setEditMenuIsShow] = useState<boolean>(false)

    const [email, setEmail] = useState<string>(employee.email);
    const [name, setName] = useState<string>(employee.name);
    const [spec, setSpec] = useState<string>(employee.spec)

    const [viewMode, setViewMode] = useState<"right" | "bottom">('right')

    useEffect(() => {
        if (window.screen.width < 768) setViewMode("bottom")
    }, [])
    const handleEditInfo = () => {
        // setEditMenuIsShow(!editMenuIsShow)
        const changedUser: IUser = {
            ...employee,
            spec: spec,
            email: email,
            name: name,
            latinName: translit(name),
        }

        dispatch(updateEmployee({user: changedUser, id: changedUser._id}))
        if (updateEmployeeError === '') {
            if (user._id === changedUser._id) {
                dispatch(editUser(changedUser))
            }
            dispatch(changeEmployee(changedUser))
            navigate(`/employee-page/${changedUser.latinName}`)
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
                                    id={'email'}
                                    name={'email'}
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
                                    id={'name'}
                                    name={'name'}
                                    placeholder={`${name}`}
                                    value={name}
                                    setValue={setName}
                                    type={"text"}
                                />
                            </div>
                        </div>
                        <div className={cl.infoText}>
                            <div className={cl.input}>
                                <DropDownMenuV2 type={"string"} position={viewMode} selectItem={spec}
                                                setSelectItem={setSpec} items={Object.values(Specialities)}/>
                            </div>
                        </div>
                    </div>
                    : <div className={cl.infoContainer}>
                        <div className={cl.infoText}
                             onClick={() => navigator.clipboard.writeText(`${employee.email}`)}>Email: <span>{employee.email}</span>
                        </div>
                        <div className={cl.infoText}>Имя: <span>{employee.name}</span></div>
                        <div className={cl.infoText}>Специализация: <span>{employee.spec}</span></div>
                        <div className={cl.infoText}>Все
                            бонусы:<span>{isLoading ? 'loading' : employeeAllBonuses}</span></div>
                    </div>
                }
            </div>
        </div>
    );
};

export default EmployeeCard;
