import React, {FC, useState} from 'react';
import {IUser} from "../../types/IUser";
import cl from './admin-styles/AdminPage.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {updateEmployee} from "../../store/reducers/ActionCreators";
import {useNavigate} from "react-router-dom";
import {changeEmployee} from "../../store/reducers/EmployeeSlice";
import Button from "../../components/UI/Button/Button";
import CheckBox from "../../components/UI/CheckBox/CheckBox";
import {Roles} from "../../types/Roles";

interface EmployeeTrProps {
    employee: IUser;
    indexOfOpenMenu: number;
    indexOfMenu: number;
    setIndexOfOpenMenu: (index: number) => void;
}


const EmployeeTr: FC<EmployeeTrProps> = ({
                                             employee,
                                             indexOfMenu,
                                             indexOfOpenMenu,
                                             setIndexOfOpenMenu
                                         }) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.authSlice.user)
    // const [rolesList, setRolesList] = useState(["admin", "guest", "user"])


    const [visibleRolesMenu, setVisibleRolesMenu] = useState<boolean>(false)
    if (indexOfMenu !== indexOfOpenMenu && visibleRolesMenu) setVisibleRolesMenu(false)

    const [employeeRoles, setEmployeeRoles] = useState([...employee.roles])

    const handleChangeRoles = (selectedRole: string) => {
        const ind = employeeRoles.findIndex(role => role === selectedRole)
        if (ind === -1) setEmployeeRoles([...employeeRoles, selectedRole])
        else {
            setEmployeeRoles(employeeRoles.filter(role => role !== selectedRole))
        }

    }

    const handleUpdateRole = () => {
        const changedUser: IUser = {
            ...employee,
            roles: employeeRoles
        }
        dispatch(changeEmployee(changedUser))
        dispatch(updateEmployee({user: changedUser, id: changedUser._id}))
    }

    const st = (index: number) => {
        if (index === 0) {
            if (employee._id === user._id) return {backgroundColor: 'rgba(0,120,212, .5)'}
        }
        if (index === 1) {
            if (employee._id === user._id) return {opacity: '.4'}
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
                <Button
                    onClick={() => {
                        if (employee._id !== user._id) {
                            setVisibleRolesMenu(!visibleRolesMenu);
                            setIndexOfOpenMenu(indexOfMenu)
                        }
                    }}><p style={st(1)}>Роли</p></Button>
            </td>
            {visibleRolesMenu
                ? <td className={cl.rolePicker}>
                    <div className={cl.confBtn} onClick={() => handleUpdateRole()}>
                        <span></span>
                        <span></span>
                    </div>
                    {Object.values(Roles).map(role =>
                        <div key={role} className={cl.role}>
                            <CheckBox
                                label={role}
                                value={employeeRoles[employeeRoles.findIndex(r => r === role)]}
                                action={handleChangeRoles}
                            />
                        </div>
                    )}
                </td>
                : ''
            }
        </tr>
    );
};

export default EmployeeTr;
