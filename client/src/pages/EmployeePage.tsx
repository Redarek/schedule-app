import React, {FC, useEffect, useState} from 'react';
import cl from '../styles/EmployeePage.module.css'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import CalendarComponent from "../components/CalendarComponent/CalendarComponent";
import EmployeeCard from "../components/EmployeeCard";
import {fetchEmployeeTasks} from "../store/reducers/ActionCreators";
import {useParams} from "react-router-dom";
import {setNavbarActiveItem} from "../store/reducers/navbarSlice";
import {changeEmployee} from "../store/reducers/EmployeeSlice";

const EmployeePage: FC = () => {
    const dispatch = useAppDispatch()
    const {latinName} = useParams()

    const [userCardIsShow, setUserCardIsShow] = useState<boolean>(true)
    const {employee, employees, isLoading, error} = useAppSelector(state => state.employeeSlice)
    const {tasks} = useAppSelector(state => state.taskSlice)


    useEffect(() => {
        const index = employees.findIndex(emp => emp.latinName === latinName)
        if (index !== -1) dispatch(changeEmployee(employees[index]))
        if (latinName) dispatch(setNavbarActiveItem(latinName))
    }, [latinName, employees])

    useEffect(() => {
        if (employee._id) dispatch(fetchEmployeeTasks(employee._id))
    }, [employee])

    console.log(tasks)
    return (
        <div className={cl.wrapper}>
            {!isLoading
                ? <div className={cl.wrapper}>
                    <div className={cl.chooseMenu}>
                        <div className={cl.hideInfoBtn} onClick={() => setUserCardIsShow(!userCardIsShow)}>Скрыть</div>
                    </div>
                    {!userCardIsShow
                        ? ''
                        : <EmployeeCard employee={employee}/>
                    }
                    <CalendarComponent tasks={tasks}/>
                </div>
                : "Загрузка страницы сотрудника"
            }
        </div>
    );
};

export default EmployeePage;
