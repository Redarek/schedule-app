import React, {FC, useState} from 'react';
import cl from '../styles/EmployeePage.module.css'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import CalendarPage from "./CalendarPage";
import DropDownMenu from "../components/UI/DropDownMenu/DropDownMenu";
import Input from "../components/UI/Input/Input";
import {IUser} from "../types/IUser";
import {editUser} from "../store/reducers/authSlice";

const EmployeePage: FC = () => {
    const {user} = useAppSelector(state => state.authSlice.user)

    const [visible, setVisible] = useState<boolean>(false)

    const [email, setEmail] = useState<string>(user.email);
    const [name, setName] = useState<string>(user.name);
    const [spec, setSpec] = useState<string>(user.spec)
    const dispatch = useAppDispatch()

    const handleEditInfo = () => {
        setVisible(!visible)
        const changedUser:IUser = {
            ...user,
            spec: spec,
            email: email,
            name: name,
        }
        dispatch(editUser(changedUser))
    }
    return (
        <div className={cl.wrapper}>
            <div className={cl.employeeCard}>
                <div className={cl.employeeIcon}>
                    <div className={cl.img}>
                        {user.icon
                            ? <img className={cl.img} src={user.icon} alt="employeeIcon"/>
                            : 'img'
                        }
                    </div>
                </div>
                <div className={cl.employeeInfo}>
                    <div className={cl.infoHeader}>
                        Основная информация
                        {visible
                            ? <div className={cl.updateBtnContainer} onClick={() => handleEditInfo()}>
                                <span className={cl.updateBtn}></span>
                                <span className={cl.updateBtn}></span>
                            </div>
                            : ''
                        }
                        <div className={cl.settingsBtnContainer} onClick={() => setVisible(!visible)}>
                            <div className={cl.settingsBtnImg}>
                                <img src="/images/settingsIcon.svg" alt=""/>
                            </div>
                            {visible
                                ? <div className={cl.activeBtn}></div>
                                : ''
                            }
                        </div>
                    </div>
                    {visible
                        ?
                        <div className={cl.infoContainer}>
                                <div className={cl.infoText}>
                                    <Input
                                        name={'Email'}
                                        placeholder={`${email}`}
                                        value={email}
                                        setValue={setEmail}
                                        type={"email"}
                                    />
                                </div>
                                <div className={cl.infoText}>
                                    <Input
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
                            <div className={cl.infoText}>Email: <span>{user.email}</span></div>
                            <div className={cl.infoText}>Имя: <span>{user.name}</span></div>
                            <div className={cl.infoText}>Специализация: <span>{user.spec}</span></div>
                        </div>
                    }
                </div>
            </div>
            <CalendarPage/>
        </div>
    );
};

export default EmployeePage;
