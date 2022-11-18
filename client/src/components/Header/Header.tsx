import React, {FC, useEffect, useState} from 'react';
import cl from './Header.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchBonuses, fetchEmployees, fetchWeekBonuses, logout} from "../../store/reducers/ActionCreators";
import {setNavbarVisible} from "../../store/reducers/navbarSlice";
import {IUser} from "../../types/IUser";
import {userBonuses} from "../../store/reducers/authSlice";

interface HeaderProps {
    user: IUser
}

const Header: FC<HeaderProps> = ({user}) => {
    const dispatch = useAppDispatch()
    const {navbarIsVisible} = useAppSelector(state => state.navbarSlice)
    const {isAuth} = useAppSelector(state => state.authSlice)
    const {userWeekBonuses, userAllBonuses, isLoading} = useAppSelector(state => state.bonusesSlice)
    const {employee} = useAppSelector(state => state.employeeSlice)

    //@todo !!!!!!!!!!!!!!
    useEffect(() => {
        dispatch(fetchEmployees())
        dispatch(fetchBonuses(user._id))
        dispatch(fetchWeekBonuses(user._id))
        // dispatch(fetchWeekBonuses(user._id))
        // dispatch(fetchBonuses(user._id))
    }, [isAuth])

    // useEffect(() => {
    //     // dispatch(setUserBonuses(user._id))
    //     // dispatch(userBonuses({week: userWeekBonuses, all: userAllBonuses}))
    // }, [])

    useEffect(() => {
        dispatch(userBonuses({week: userWeekBonuses, all: userAllBonuses}))
    }, [userWeekBonuses])


    return (
        <header className={cl.header}>
            <div className={cl.menuBtn} onClick={() => dispatch(setNavbarVisible(navbarIsVisible))}>
                <span className={cl.burgerSpan}></span>
                <span className={cl.burgerSpan}></span>
                <span className={cl.burgerSpan}></span>
            </div>
            <div className={cl.userInfo}>
                <div className={cl.userIcon}>
                    {user.icon
                        ? <img src={user.icon} alt="settings"/>
                        : <img src="/images/userIcon.png" alt="userIcon"/>
                    }
                </div>
                <div className={cl.userName}>
                    {user.name
                        ? user.name
                        : 'Имя пользователя'
                    }
                    <span>Баланс: {userWeekBonuses}</span>
                </div>
                <div className={cl.settingsIcon} onClick={() => dispatch(logout())}>
                    <img src='/images/exitIcon.svg' alt="exit"/>
                </div>
            </div>
        </header>
    );
};

export default Header;
