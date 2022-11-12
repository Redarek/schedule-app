import React, {FC, useEffect, useState} from 'react';
import DropDownMenu from "../../components/UI/DropDownMenu/DropDownMenu";
import {IUser} from "../../types/IUser";
import cl from './admin-styles/AdminPage.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {updateEmployee} from "../../store/reducers/ActionCreators";
import {useNavigate} from "react-router-dom";
import {changeEmployee} from "../../store/reducers/EmployeeSlice";

interface EmployeeTrProps {
    employee: IUser;
    indexOfMenu?: string;
    indexOfOpenMenu?: string;
    setIndexOfOpenMenu?: (index: string) => void;
}


const EmployeeTr: FC<EmployeeTrProps> = ({
                                             employee,
                                             indexOfMenu,
                                             indexOfOpenMenu,
                                             setIndexOfOpenMenu
                                         }) => {

    const [role, setRole] = useState<string>(employee.role)
    const {user} = useAppSelector(state => state.authSlice.user)

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleUpdateRole = () => {
        if (employee.role !== role && employee._id !== user._id) {
            const changedUser: IUser = {
                ...employee,
                role: role
            }
            dispatch(changeEmployee(changedUser))
            dispatch(updateEmployee({user: changedUser, id: changedUser._id}))
        }
    }
    const st = (index: number) => {
        if (index === 0) {
            if (employee._id === user._id) return {backgroundColor: '#0078D4'}
        }
        if (index === 1) {
            if (role === employee.role) return {opacity: '.4'}
        }
    }

    return (
        <tr className={cl.empTr} style={st(0)}>
            <td className={cl.nameTd} onClick={() => navigate(`/employee-page/${employee.latinName}`)}>
                {employee.name}
            </td>
            <td className={cl.specTd}>
                {employee.spec}
            </td>
            <td className={cl.emailTd}>
                {employee.email.length >= 24
                    ? employee.email.substring(0, 24) + '...'
                    : employee.email
                }
            </td>
            <td className={cl.roleTd}>
                <DropDownMenu
                    menuType={'role'}
                    title={'Роль'}
                    menuItems={[]}
                    dropMenuItem={role}
                    setDropMenuItem={setRole}
                    viewMode={'bottom'}
                    indexOfMenu={indexOfMenu}
                    setIndexOfOpenMenu={setIndexOfOpenMenu}
                    indexOfOpenMenu={indexOfOpenMenu}
                />
            </td>
            {employee._id === user._id
                ? ''
                : <td className={cl.confBtn} style={st(1)} onClick={() => handleUpdateRole()}>
                    <span></span>
                    <span></span>
                </td>
            }
        </tr>
    );
};

export default EmployeeTr;
