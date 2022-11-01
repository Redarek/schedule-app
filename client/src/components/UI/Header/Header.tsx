import React, {FC, useEffect} from 'react';
import cl from './Header.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchEmployees, logout} from "../../../store/reducers/ActionCreators";
import {setNavbarVisible} from "../../../store/reducers/navbarSlice";
import {IUser} from "../../../types/IUser";

interface HeaderProps {
    user: IUser
}

const Header: FC<HeaderProps> = ({user}) => {
    const dispatch = useAppDispatch()
    const {navbarIsVisible} = useAppSelector(state => state.navbarSlice)
    const {isAuth} = useAppSelector(state => state.authSlice)

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [isAuth])

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
                </div>
                <div className={cl.settingsIcon} onClick={() => dispatch(logout())}>
                    <img src='/images/exitIcon.svg' alt="exit"/>
                </div>
            </div>
        </header>
    );
};

export default Header;
