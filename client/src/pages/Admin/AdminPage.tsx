import React, {FC, useState} from 'react';
import {useAppSelector} from "../../hooks/redux";
import cl from './admin-styles/AdminPage.module.css'
import EmployeeTr from "./EmployeeTr";

const AdminPage: FC = () => {
    const {employees, isLoading, error} = useAppSelector(state => state.employeeSlice)
    const [indexOfOpenMenu, setIndexOfOpenMenu] = useState<string>('0')
    return (
        <div className={cl.wrapper}>
            {isLoading
                ? ''
                : <div className={cl.wrapper}>
                    <table className={cl.employeesTable}>
                        <thead>
                        <tr className={cl.thr}>
                            <th className={cl.nameTh}>
                                Имя:
                            </th>
                            <th className={cl.specTh}>
                                Специализация:
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
                                setIndexOfOpenMenu={setIndexOfOpenMenu}
                                indexOfOpenMenu={indexOfOpenMenu}
                                indexOfMenu={`${index}`}
                            />
                        )}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )

};

export default AdminPage;
