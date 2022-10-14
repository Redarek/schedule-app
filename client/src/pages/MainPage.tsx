import React, {FC} from 'react';
import {useNavigate} from "react-router-dom";
import cl from '../styles/MainPage.module.css'

const MainPage = () => {
    const navigate = useNavigate()


    return (
        <div className={cl.wrapper}>
            //Simple Page for Work
            <div className={cl.linkDesc} onClick={(e) => {
                navigate('/');
                e.preventDefault()
            }}>
                MainPage -
                <a rel="stylesheet" href="/">"/"</a>
            </div>
            <div className={cl.linkDesc} onClick={(e) => {
                navigate('/month');
                e.preventDefault()
            }}>
                MonthCalendar -
                <a rel="stylesheet" href="/month">"/month"</a>
            </div>
            <div className={cl.linkDesc} onClick={(e) => {
                navigate('/login');
                e.preventDefault()
            }}>
                Login -
                <a rel="stylesheet" href="/login">"/login"</a>
            </div>
            <div className={cl.linkDesc} onClick={(e) => {
                navigate('/reg');
                e.preventDefault()
            }}>
                Employee Registration Component-
                <a rel="stylesheet" href="/reg">"/reg"</a>
            </div>
        </div>
    );
};

export default MainPage;
