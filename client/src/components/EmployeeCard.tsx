import React, {FC, useState} from 'react';
import cl from "../styles/EmployeePage.module.css";
import Input from "./UI/Input/Input";
import DropDownMenu from "./UI/DropDownMenu/DropDownMenu";
import {IUser} from "../types/IUser";
import {editUser} from "../store/reducers/authSlice";
import {useAppDispatch} from "../hooks/redux";

interface EmployeeCardProps {
    user: IUser
}
const EmployeeCard: FC<EmployeeCardProps> = ({user}) => {
    const dispatch = useAppDispatch()

    const [editMenuIsShow, setEditMenuIsShow] = useState<boolean>(false)
    const [email, setEmail] = useState<string>(user.email);
    const [name, setName] = useState<string>(user.name);
    const [spec, setSpec] = useState<string>(user.spec)

    const handleEditInfo = () => {
        setEditMenuIsShow(!editMenuIsShow)
        const changedUser: IUser = {
            ...user,
            spec: spec,
            email: email,
            name: name,
        }
        dispatch(editUser(changedUser))
    }

    return (
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
                    {editMenuIsShow
                        ? <div className={cl.updateBtnContainer} onClick={() => handleEditInfo()}>
                            <span className={cl.updateBtn}></span>
                            <span className={cl.updateBtn}></span>
                        </div>
                        : ''
                    }
                    <div className={cl.settingsBtnContainer} onClick={() => setEditMenuIsShow(!editMenuIsShow)}>
                        <div className={cl.settingsBtnImg}>
                            <img src="/images/settingsIcon.svg" alt=""/>
                        </div>
                        {editMenuIsShow
                            ? <div className={cl.activeBtn}></div>
                            : ''
                        }
                    </div>
                </div>
                {editMenuIsShow
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
    );
};

export default EmployeeCard;
