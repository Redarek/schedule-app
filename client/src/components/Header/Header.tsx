import React, {FC, Fragment, useEffect} from 'react';
import cl from './Header.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchWeekBonuses, logout} from "../../store/reducers/ActionCreators";
import {setNavbarVisible} from "../../store/reducers/navbarSlice";
import {IUser} from "../../types/IUser";
import {userBonuses} from "../../store/reducers/authSlice";
import Navbar from "../UI/Navbar/Navbar";

interface HeaderProps {
    user: IUser
}

const Header: FC<HeaderProps> = ({user}) => {
    const dispatch = useAppDispatch()
    const {isAuth} = useAppSelector(state => state.authSlice)
    const {userWeekBonuses, userAllBonuses, isLoading} = useAppSelector(state => state.bonusesSlice)

    useEffect(() => {
        if (user) {
            dispatch(fetchWeekBonuses(user._id))
        }
        // dispatch(fetchBonuses(user._id))
    }, [isAuth])

    // useEffect(() => {
    //     // dispatch(setUserBonuses(user._id))
    //     // dispatch(userBonuses({week: userWeekBonuses, all: userAllBonuses}))
    // }, [])

    useEffect(() => {
        if (user) {
            dispatch(userBonuses({week: userWeekBonuses, all: userAllBonuses}))
        }
    }, [userWeekBonuses])

    const wrapper = document.querySelector('.wrapper')
    const showNavbar = () => {
        // if (navbarIsVisible && window.screen.width < 768 && wrapper) {
        // wrapper.scrollBy({left: -1000, behavior: "smooth"})
        dispatch(setNavbarVisible())
        // } else dispatch(setNavbarVisible(navbarIsVisible))
    }

    return (
        <header className={cl.header}>
            {!user
                ? <div className={cl.logo}>Schedule-App</div>
                : <Fragment>
                    <div className={cl.menuBtn}
                         onClick={() => showNavbar()}>
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
                </Fragment>
            }
        </header>
    );
};

export default Header;
