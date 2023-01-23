import React, {FC, useEffect, useState} from 'react';
import cl from '../styles/EmployeePage.module.css'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import CalendarComponent from "../components/Calendar/components/CalendarComponent/CalendarComponent";
import EmployeeCard from "../components/EmployeeCard";
import {fetchBonuses, fetchEmployeeTasks, fetchWeekBonuses} from "../store/reducers/ActionCreators";
import {useParams} from "react-router-dom";
import {changeEmployee} from "../store/reducers/EmployeeSlice";
import {Roles} from "../types/Roles";

const EmployeePage: FC = () => {
    const dispatch = useAppDispatch()
    const {latinName} = useParams()

    const [userCardIsShow, setUserCardIsShow] = useState<boolean>(false)
    const {employee, employees, isLoading, error} = useAppSelector(state => state.employeeSlice)
    const {user} = useAppSelector(state => state.authSlice.user)
    const {
        tasks,
        isLoadingCreate,
        isLoadingDelete,
        isLoadingUpdate,
        isLoadingTasks
    } = useAppSelector(state => state.taskSlice)


    useEffect(() => {
        const index = employees.findIndex(emp => emp.latinName === latinName)
        if (index !== -1) {
            dispatch(changeEmployee(employees[index]))
            dispatch(fetchEmployeeTasks(employees[index]._id))
            dispatch(fetchBonuses(employees[index]._id))
            dispatch(fetchWeekBonuses(employees[index]._id))
        }

    }, [latinName, employees])


    // useEffect(() => {
    //     if (employee._id) dispatch(fetchEmployeeTasks(employee._id))
    //     if (employee._id) dispatch(fetchBonuses(employee._id))
    //     if (employee._id) dispatch(fetchWeekBonuses(employee._id))
    // }, [employee, isLoadingCreate, isLoadingDelete, isLoadingUpdate])


    const [activeComponent, setActiveComponent] = useState<'profile' | 'calendar'>(user.roles.includes(Roles.CALENDAR) ? 'calendar' : 'profile')

    return (
        <div className={cl.wrapper}>
            {!user.roles.includes(Roles.ADMIN) && latinName !== user.latinName
                ? 'Вы не можете просмотреть этот профиль'
                : !isLoading
                    ? <div className={cl.wrapper}>
                        <div className={cl.chooseMenu}>
                            {/*<div className={cl.hideInfoBtn} onClick={() => setUserCardIsShow(!userCardIsShow)}>*/}
                            {/*    {userCardIsShow*/}
                            {/*        ? 'Скрыть профиль'*/}
                            {/*        : 'Показать профиль'*/}
                            {/*    }*/}
                            {/*</div>*/}
                            <div
                                className={[cl.menuBtn, activeComponent === 'profile' ? cl.menuBtnActive : ''].join(' ')}
                                onClick={() => setActiveComponent('profile')}>Профиль
                            </div>
                            {user.roles.includes(Roles.CALENDAR)
                                ? <div
                                    className={[cl.menuBtn, activeComponent === 'calendar' ? cl.menuBtnActive : ''].join(' ')}
                                    onClick={() => setActiveComponent('calendar')}>Задачи
                                </div>
                                : ''
                            }
                        </div>
                        {activeComponent === 'profile'
                            ? <EmployeeCard employee={employee}/>
                            : ''
                        }
                        {user.roles && user.roles.includes(Roles.CALENDAR)
                            ? activeComponent === 'calendar'
                                ? isLoadingTasks
                                    ? 'Загрузка'
                                    : <CalendarComponent tasks={tasks}/>
                                : ''
                            : 'Для доступа к задачам обратитесь к администратору'

                        }
                    </div>
                    : "Загрузка страницы сотрудника"
            }
        </div>
    );
};

export default EmployeePage;
