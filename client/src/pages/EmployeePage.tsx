import React, {FC, useEffect, useState} from 'react';
import cl from '../styles/EmployeePage.module.css'
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import CalendarPage from "./CalendarPage";
import DropDownMenu from "../components/UI/DropDownMenu/DropDownMenu";
import EmployeeCard from "../components/EmployeeCard";
import {fetchUsers} from "../store/reducers/ActionCreators";
import {useParams} from "react-router-dom";
import {setNavbarActiveItem} from "../store/reducers/navbarSlice";

const EmployeePage: FC = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.authSlice.user)
    const {employeeId} = useParams()


    //@todo getEmployeeById

    const [userCardIsShow, setUserCardIsShow] = useState<boolean>(false)
    const {employees, isLoading, error} = useAppSelector(state => state.employeesSlice)
    const [employee, setEmployee] = useState<string>('')
    const [indexOfSelectEmployee, setIndexOfSelectEmployee] = useState<number>()

    useEffect(() => {
        // if (employees.length === 0) {
        // dispatch(fetchUsers())
        // if (employees) {
        // setEmployee(user.name)
        // setIndexOfSelectEmployee(employees.findIndex(obj => obj.id === user.id))
        // }
        // }
        if (employeeId)
            dispatch(setNavbarActiveItem(employeeId))
    }, [employeeId])

    return (
        <div className={cl.wrapper}>
            {!isLoading
                ? <div className={cl.wrapper}>
                    <div className={cl.chooseMenu}>
                        {/*<DropDownMenu*/}
                        {/*    menuType={'employees'}*/}
                        {/*    title={'Сотрудник'}*/}
                        {/*    menuItems={employees}*/}
                        {/*    dropMenuItem={employee}*/}
                        {/*    setDropMenuItem={setEmployee}*/}
                        {/*    viewMode={"bottom"}*/}
                        {/*    setIndexOfSelectElem={setIndexOfSelectEmployee}*/}
                        {/*/>*/}
                        <div className={cl.hideInfoBtn} onClick={() => setUserCardIsShow(!userCardIsShow)}>Скрыть</div>
                    </div>
                    {userCardIsShow
                        ? ''
                        : <EmployeeCard user={user}/>
                    }
                    <CalendarPage/>
                </div>
                : "Загрузка"

            }
        </div>
    );
};

export default EmployeePage;
