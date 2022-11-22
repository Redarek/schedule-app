import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {checkAuth, fetchBonuses, fetchWeekBonuses} from './store/reducers/ActionCreators';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import {CSSTransition} from "react-transition-group";
import {changeUserId} from "./store/reducers/bonusesSlice";

function App() {
    const {isAuth, isLoading, user} = useAppSelector(state => state.authSlice)
    const {navbarIsVisible} = useAppSelector(state => state.navbarSlice)
    const dispatch = useAppDispatch()
    // Проверка наличия токена доступа при первом запуске приложения
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
            dispatch(checkAuth());
        }
    }, [])

    useEffect(() => {
        if (user.user)
            if (token && user.user._id !== '') {
                dispatch(changeUserId(user.user._id))
            }
    }, [isAuth])
    return (
        <div className="App">
            <BrowserRouter>
                <div className="loader">
                    {isLoading
                        ? 'Loader will be soon...'
                        : token
                            ? isAuth
                                ? <div className="isAuth">
                                    <Header user={user.user}/>
                                    <div className="wrapper">
                                        <CSSTransition
                                            in={navbarIsVisible}
                                            classNames={'navBar'}
                                            timeout={600}
                                            mountOnEnter
                                            unmountOnExit
                                        >
                                            <div className={'navBar'}>
                                                <Navbar/>
                                            </div>
                                        </CSSTransition>
                                        <AppRouter/>
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
