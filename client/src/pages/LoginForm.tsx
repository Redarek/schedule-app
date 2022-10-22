import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {login, registration} from "../store/reducers/ActionCreators";

const LoginForm:FC= () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('')
    const dispatch = useAppDispatch();
    const {isAuth, isLoading, error, user} = useAppSelector(state => state.authSlice)
    console.log(user.user);

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type='text'
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type='password'
                placeholder='Пароль'
            />
            <input
                onChange={e => setName(e.target.value)}
                value={name}
                type='text'
                placeholder='Name'
            />
            <button onClick={() => {dispatch(login({email: email, password: password, name: name}))}}>Логин</button>
            <button onClick={() => {dispatch(registration({email: email, password: password, name: name}))}}>Регистрация</button>
        </div>
    );
};

export default LoginForm;
