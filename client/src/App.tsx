import React, {useEffect, useState} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {checkAuth} from './store/reducers/ActionCreators';
import Header from "./components/UI/Header/Header";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/UI/Navbar/Navbar";
import RegistrationForm from "./components/RegistrationForm";
import DropDownMenu from "./components/UI/DropDownMenu/DropDownMenu";

function App() {
    const {isAuth, isLoading, user} = useAppSelector(state => state.authSlice)
    const {navbarIsVisible} = useAppSelector(state => state.navbarSlice)
    const dispatch = useAppDispatch()
    // Проверка наличия токена доступа при первом запуске приложения
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth);
        }
    }, [])
    return (
        <div className="App">
            <BrowserRouter>
                <div className="loader">
                    {isLoading
                        ? 'Loader will be soon...'
                        : ''
                    }
                </div>
                {isAuth
                    ? <div className="isAuth">
                        <Header user={user}/>
                        <div className="wrapper">
                            {navbarIsVisible
                                ? <Navbar/>
                                : ''
                            }
                            <AppRouter/>
                        </div>
                    </div>
                    : <div>
                        <h2>Пришла пора заводить аккаунт чтобы видеть красоту =)</h2>
                        <AppRouter/>
                    </div>
                }
            </BrowserRouter>
        </div>
    );
}

export default App;
