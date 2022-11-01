import React, {FC, useEffect, useState} from 'react';
import cl from '../styles/EmployeePage.module.css'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import CalendarPage from "./CalendarPage";
import EmployeeCard from "../components/EmployeeCard";
import {fetchEmployeeTasks} from "../store/reducers/ActionCreators";
import {useParams} from "react-router-dom";
import {setNavbarActiveItem} from "../store/reducers/navbarSlice";
import {editEmployee} from "../store/reducers/EmployeeSlice";

const EmployeePage: FC = () => {
    const dispatch = useAppDispatch()
    const {latinName} = useParams()

    const [userCardIsShow, setUserCardIsShow] = useState<boolean>(false)
    const {employee, isLoading, error} = useAppSelector(state => state.employeeSlice)
    const {employees} = useAppSelector(state => state.employeesSlice)
    const {tasks} = useAppSelector(state => state.taskSlice)

    useEffect(() => {
        const index = employees.findIndex(emp => emp.latinName === latinName)

        if (index !== -1) dispatch(editEmployee(employees[index]))
        if (latinName) dispatch(setNavbarActiveItem(latinName))
    }, [latinName, employees])

    useEffect(() => {
        if (employee._id) dispatch(fetchEmployeeTasks(employee._id))
    }, [employee])
    return (
        <div className={cl.wrapper}>
            {!isLoading
                ? <div className={cl.wrapper}>
                    <div className={cl.chooseMenu}>
                        <div className={cl.hideInfoBtn} onClick={() => setUserCardIsShow(!userCardIsShow)}>Скрыть</div>
                    </div>
                    {userCardIsShow
                        ? ''
                        : <EmployeeCard employee={employee}/>
                    }
                    <CalendarPage tasks={tasks}/>
                </div>
                : "Загрузка страницы сотрудника"
            }
        </div>
    );
};

export default EmployeePage;
