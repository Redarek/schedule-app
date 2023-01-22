import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {checkAuth} from './store/reducers/ActionCreators';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {changeUserId} from "./store/reducers/bonusesSlice";
import {Roles} from "./types/Roles";

function App() {
    const {isAuth, isLoading, user} = useAppSelector(state => state.authSlice)
    const dispatch = useAppDispatch()
    // Проверка наличия токена доступа при первом запуске приложения
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
            dispatch(checkAuth());
        }
    }, [])

    useEffect(() => {
        if (user.user && token && user.user._id !== '')
            // if () {
            dispatch(changeUserId(user.user._id))
        // }
    }, [isAuth])
    return (
        <div className="App">
            <BrowserRouter>
                <div className="loader">
                    {isLoading
                        ? 'Loader will be soon...'
                        : token
                            ? isAuth
                                ? user.user.roles.length === 0 || (user.user.roles.includes(Roles.GUEST) && user.user.roles.length === 1)
                                    ? <div className="isAuth">
                                        <Header user={user.user}/>
                                        <AppRouter/>
                                    </div>
                                    : <div className="isAuth">
                                        <Header user={user.user}/>
                                        <div className="wrapper">
                                            <Navbar/>
                                            <div className="content">
                                                <AppRouter/>
                                            </div>
                                        </div>
                                    </div>
                                : ''
                            : <AppRouter/>
                    }
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
