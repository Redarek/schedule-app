import React, {FC, useEffect, useState} from 'react';
import {IUser} from "../../types/IUser";
import cl from './admin-styles/RolesPage.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchEmployees, updateEmployee} from "../../store/reducers/ActionCreators";
import {useNavigate} from "react-router-dom";
import Button from "../../components/UI/Button/Button";
import {Roles} from "../../types/Roles";
import ModalFullScreen from "../../components/UI/ModalFullScreen/ModalFullScreen";

interface EmployeeTrProps {
    employee: IUser;
}


const EmployeeTr: FC<EmployeeTrProps> = ({
                                             employee,
                                         }) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.authSlice.user)


    const [visibleRolesMenu, setVisibleRolesMenu] = useState<boolean>(false)


    useEffect(() => {
        setEmployeeRoles([...employee.roles])
        setOtherRoles([...Object.values(Roles).filter(role => !employeeRoles.includes(role))])
    }, [visibleRolesMenu])


    const [employeeRoles, setEmployeeRoles] = useState([...employee.roles])
    const [otherRoles, setOtherRoles] = useState([...Object.values(Roles).filter(role => !employeeRoles.includes(role))])


    const addRole = (role: Roles) => {
        // if ((role === Roles.ADMIN_ROLES || role === Roles.SUPER_ADMIN)&& user.roles.includes()) {
        //
        // } else {
        //
        // }
        // if (user.roles.includes(Roles.SUPER_ADMIN)) {
        //     setEmployeeRoles([...employeeRoles, role])
        //     setOtherRoles(otherRoles.filter(emplRole => emplRole !== role))
        // } else {
        //     if (role === Roles.ADMIN_ROLES || role === Roles.SUPER_ADMIN) {
        //
        //     } else {
        //         setEmployeeRoles([...employeeRoles, role])
        //         setOtherRoles(otherRoles.filter(emplRole => emplRole !== role))
        //     }
        //
        // }

        if (role !== Roles.SUPER_ADMIN) {
            setEmployeeRoles([...employeeRoles, role])
            setOtherRoles(otherRoles.filter(emplRole => emplRole !== role))
        } else {
            if (user.roles.includes(Roles.SUPER_ADMIN)) {
                setEmployeeRoles([...employeeRoles, role])
                setOtherRoles(otherRoles.filter(emplRole => emplRole !== role))
            } else {

            }
        }

    }

    const removeRole = (role: Roles) => {
        // if (role === Roles.SUPER_ADMIN || role === Roles.ADMIN) {
        //     if (employee._id === user._id) {
        //
        //     } else {
        //         setEmployeeRoles(employeeRoles.filter(empRole => empRole !== role))
        //         setOtherRoles([...otherRoles, role])
        //     }
        // } else {
        //     setEmployeeRoles(employeeRoles.filter(empRole => empRole !== role))
        //     setOtherRoles([...otherRoles, role])
        // }
        if (role === Roles.SUPER_ADMIN
            && user._id === employee._id
        ) {

        } else {
            setEmployeeRoles(employeeRoles.filter(empRole => empRole !== role))
            setOtherRoles([...otherRoles, role])
        }
    }

    const handleUpdateRole = () => {
        const changedUser: IUser = {
            ...employee,
            roles: employeeRoles
        }
        dispatch(updateEmployee({user: changedUser, id: changedUser._id}))
        setTimeout(() => {
            dispatch(fetchEmployees())
        }, 1000)
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
                <img src="/images/settingsIcon.svg" alt="" onClick={() => setVisibleRolesMenu(true)}/>
                {/*{employee._id !== user._id*/}
                {/*    ? employee.roles.includes(Roles.SUPER_ADMIN)*/}
                {/*        ? ''*/}
                {/*        : <img src="/images/settingsIcon.svg" alt="" onClick={() => setVisibleRolesMenu(true)}/>*/}
                {/*    : employee.roles.includes(Roles.SUPER_ADMIN)*/}
                {/*        ? <img src="/images/settingsIcon.svg" alt="" onClick={() => setVisibleRolesMenu(true)}/>*/}
                {/*        : ''*/}
                {/*}*/}
            </td>
            <td>
                {visibleRolesMenu
                    ? <ModalFullScreen visible={visibleRolesMenu} setVisible={setVisibleRolesMenu} exitBtn={true}
                                       exitBackground={true}>
                        Роли пользователя
                        <div className={cl.employeeActiveRoles}>
                            {employeeRoles.map(role =>
                                <div className={cl.roleActive} key={role} onClick={() => removeRole(role)}>
                                    {role}
                                </div>
                            )}
                        </div>
                        Доступные роли
                        <div className={cl.employeeInactiveRoles}>
                            {otherRoles.map(role =>
                                <div className={cl.roleInactive} key={role} onClick={() => addRole(role)}>
                                    {role}
                                </div>
                            )}
                        </div>
                        <Button onClick={handleUpdateRole}>Обновить</Button>
                    </ModalFullScreen>
                    : ''
                }
            </td>
        </tr>
    );
};

export default EmployeeTr;
