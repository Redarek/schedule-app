import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { checkAuth } from './store/reducers/ActionCreators';

function App() {
  const { isAuth, user } = useAppSelector(state => state.authSlice)
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
      <h1>{isAuth ? `Пользователь авторизован ${user.user.email}` : 'Авторизуйтесь'}</h1>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
