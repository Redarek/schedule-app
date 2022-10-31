import React, {FC, useState} from 'react';
import cl from "../styles/EmployeePage.module.css";
import Input from "./UI/Input/Input";
import DropDownMenu from "./UI/DropDownMenu/DropDownMenu";
import {IUser} from "../types/IUser";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {editEmployee} from "../store/reducers/EmployeeSlice";
import {updateEmployee} from "../store/reducers/ActionCreators";
import {editUser} from "../store/reducers/authSlice";
import {useNavigate} from "react-router-dom";
import {translit} from "../utils/transliter";
import {editEmployees} from "../store/reducers/EmployeesSlice";

interface EmployeeCardProps {
    employee: IUser
}

const EmployeeCard: FC<EmployeeCardProps> = ({employee}) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.authSlice.user)

    const [editMenuIsShow, setEditMenuIsShow] = useState<boolean>(false)

    const [email, setEmail] = useState<string>(employee.email);
    const [name, setName] = useState<string>(employee.name);
    const [spec, setSpec] = useState<string>(employee.spec)

    const handleEditInfo = () => {
        setEditMenuIsShow(!editMenuIsShow)
        const changedUser: IUser = {
            ...employee,
            spec: spec,
            email: email,
            name: name,
            latinName: translit(name),
        }
        if (user._id === changedUser._id) {
            dispatch(editUser(changedUser))
        }
        dispatch(editEmployee(changedUser))
        dispatch(editEmployees(changedUser))
        dispatch(updateEmployee({user: changedUser, id: changedUser._id}))
        navigate(`/employee-page/${changedUser.latinName}`)
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
                    Основная информация
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
                            <Input
                                id={'email'}
                                name={'Email'}
                                placeholder={`${email}`}
                                value={email}
                                setValue={setEmail}
                                type={"email"}
                            />
                        </div>
                        <div className={cl.infoText}>
                            <Input
                                id={'name'}
                                name={'Name'}
                                placeholder={`${name}`}
                                value={name}
                                setValue={setName}
                                type={"text"}
                            />
                        </div>
                        <div className={cl.infoText}>
                            <DropDownMenu menuItems={[]} menuType={'spec'}
                                          dropMenuItem={spec}
                                          setDropMenuItem={setSpec}
                                          viewMode={"right"}
                                          title={"Специализация"}
                            />
                        </div>
                    </div>
                    : <div className={cl.infoContainer}>
                        <div className={cl.infoText}>Email: <span>{employee.email}</span></div>
                        <div className={cl.infoText}>Имя: <span>{employee.name}</span></div>
                        <div className={cl.infoText}>Специализация: <span>{employee.spec}</span></div>
                    </div>
                }
            </div>
        </div>
    );
};

export default EmployeeCard;
