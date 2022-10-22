import React, {FC, useEffect} from 'react';
import cl from './Header.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {logout} from "../../../store/reducers/ActionCreators";
import {AuthResponse} from "../../../types/AuthResponse";
import {setNavbarVisible} from "../../../store/reducers/navbarSlice";

interface HeaderProps {
    user: AuthResponse
}

const Header: FC<HeaderProps> = ({user}) => {
    const dispatch = useAppDispatch()
    const {navbarIsVisible} = useAppSelector(state => state.navbarSlice)

    //@todo Email временное решение, ждем бэк чтобы получать имя пользователя НУ и с Icon надо решить
    return (
        <header className={cl.header}>
            <div className={cl.menuBtn} onClick={() => dispatch(setNavbarVisible(navbarIsVisible))}>
                <span className={cl.burgerSpan}></span>
                <span className={cl.burgerSpan}></span>
                <span className={cl.burgerSpan}></span>
            </div>
            <div className={cl.userInfo}>
                <div className={cl.settingsIcon} onClick={() => dispatch(logout())}>
                    <img src='/images/settingsIcon.svg' alt="settings"/>
                </div>
                <div className={cl.userIcon}>
                    {user.user.icon
                        ? <img src={user.user.icon} alt="settings"/>
                        : <img src="/images/userIcon.png" alt="userIcon"/>
                    }
                </div>
                <div className={cl.userName}>
                    {user.user.email
                        ? user.user.email
                        : 'Имя пользователя'
                    }
                </div>
            </div>
        </header>
    );
};

export default Header;
