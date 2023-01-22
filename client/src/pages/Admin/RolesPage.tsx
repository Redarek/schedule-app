import React, {useEffect} from 'react';
import cl from "./admin-styles/RolesPage.module.css";
import EmployeeTr from "./EmployeeTr";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Roles} from "../../types/Roles";
import {setNavbarObjectIsActiveLink} from "../../store/reducers/navbarSlice";

const RolesPage = () => {
    const {employees, isLoading, error} = useAppSelector(state => state.employeeSlice)
    const {user} = useAppSelector(state => state.authSlice.user)
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(setNavbarObjectIsActiveLink({
            title: `Роли`,
            type: 'item',
            link: `/admin/${user.latinName}/roles`,
            isActive: false,
            items: []
        }))
    }, [])
    return (
        <div className={cl.wrapper}>
            {user.roles && (user.roles.includes(Roles.ADMIN_ROLES) || user.roles.includes(Roles.SUPER_ADMIN))
                ? isLoading
                    ? 'Loading...'
                    : <div className={cl.wrapper}>
                        <table className={cl.employeesTable}>
                            <thead>
                            <tr className={cl.thr}>
                                <th className={cl.nameTh}>
                                    Имя:
                                </th>
                                <th className={cl.emailTh}>
                                    Email:
                                </th>
                                <th className={cl.roleTh}>
                                    Роль:
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.map((employee, index) =>
                                <EmployeeTr
                                    key={employee._id}
                                    employee={employee}
                                />
                            )}
                            </tbody>
                        </table>
                    </div>
                : "Вы не можете назначать роли"
            }
        </div>
    );
};

export default RolesPage;
