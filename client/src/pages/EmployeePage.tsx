import React, {FC, useEffect, useState} from 'react';
import cl from '../styles/EmployeePage.module.css'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import CalendarPage from "./CalendarPage";
import EmployeeCard from "../components/EmployeeCard";
import {fetchUserById, fetchUsers} from "../store/reducers/ActionCreators";
import {useParams} from "react-router-dom";
import {setNavbarActiveItem} from "../store/reducers/navbarSlice";

const EmployeePage: FC = () => {
    const dispatch = useAppDispatch()
    const {latinName} = useParams()

    const [userCardIsShow, setUserCardIsShow] = useState<boolean>(false)
    const {employee, isLoading, error} = useAppSelector(state => state.employeeSlice)
    const {employees} = useAppSelector(state => state.employeesSlice)


    useEffect(() => {
        const index = employees.findIndex(emp => emp.latinName === latinName)
        if (index !== -1) dispatch(fetchUserById(employees[index]._id))
        if (latinName) dispatch(setNavbarActiveItem(latinName))
    }, [employees, latinName])

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
                    <CalendarPage/>
                </div>
                : "Загрузка"
            }
        </div>
    );
};

export default EmployeePage;
