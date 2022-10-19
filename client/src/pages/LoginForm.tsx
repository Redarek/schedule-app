import React, { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { login, registration, logout } from '../store/reducers/ActionCreators';
import { IUser } from '../types/IUser';
import UserService from '../services/UserService';

const LoginForm:FC= () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [users, setUsers] = useState<IUser[]>([]);
    const dispatch = useAppDispatch();
    const {isAuth, isLoading, error, user} = useAppSelector(state => state.authSlice)
    console.log(user.user);

    async function getUsers() {
        try {
          const response = await UserService.fetchUsers();
          setUsers(response.data);
        } catch (error) {
          console.log(error);
        }
    }
    
    return (
        <div>
            {/* <h1>{user.user.isActivated ? 'Аккаунт активирован по почте' : 'Активируйте аккаунт по почте'}</h1> 
            для проверки активации аккаунта
            не работает тут
            isActivated = undefined до тех пор, пока не залогинишься, поэтому без user в localstorage крашится*/}
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
            <button onClick={() => {dispatch(login({email: email, password: password}))}}>Логин</button>
            <button onClick={() => {dispatch(registration({email: email, password: password}))}}>Регистрация</button>
            <button onClick={() => {dispatch(logout())}}>Выйти</button>
            <button onClick={getUsers}>Получить пользователей</button>
            {users.map(user =>
                <div key={user.email}>{user.email}</div>
            )};
        </div>
    );
};

export default LoginForm;
