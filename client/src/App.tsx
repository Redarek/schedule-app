import React, {useEffect, useMemo} from 'react';
import './App.css';
import {BrowserRouter, useNavigate} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {checkAuth, fetchEmployees, fetchUser} from './store/reducers/ActionCreators';
import Header from "./components/UI/Header/Header";
import Navbar from "./components/UI/Navbar/Navbar";

function App() {
    const {isAuth, isLoading, user} = useAppSelector(state => state.authSlice)
    const {navbarIsVisible} = useAppSelector(state => state.navbarSlice)
    const dispatch = useAppDispatch()
    // Проверка наличия токена доступа при первом запуске приложения
    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(checkAuth());
        }
    }, [])
    return (
        <div className="App">
            <BrowserRouter>
                <div className="loader">
                    {isLoading
                        ? 'Loader will be soon...'
                        : isAuth
                            ? <div className="isAuth">
                                <Header user={user.user}/>
                                <div className="wrapper">
                                    {navbarIsVisible
                                        ? <Navbar/>
                                        : ''
                                    }
                                    <AppRouter/>
                                </div>
                            </div>
                            : isLoading
                                ? ''
                                : <AppRouter/>
                    }
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
