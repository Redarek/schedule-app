import React, { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { login, registration, logout } from "../store/reducers/ActionCreators";
import cl from "../styles/RegistrationForm.module.css";
import cx from "classnames";
import { useNavigate } from "react-router-dom";

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const { isAuth, isLoading, error, user } = useAppSelector(
    (state) => state.authSlice
  );
  console.log(user.user);

  const navigate = useNavigate();

  return (
    <div className={cl.auth}>
      <form className={cl.auth__form}>
        <label htmlFor="login-email" className={cl.auth__label}>
          Email
        </label>
        <input
          className={cx(cl.auth__input, cl.auth__input_email)}
          placeholder="Введите email"
          name="email"
          id="login-email"
          onChange={e => setEmail(e.target.value)}
          value={email}
          type='text'
        />
        <label htmlFor="login-password" className={cl.auth__label}>
          Пароль
        </label>
        <input
          className={cx(cl.auth__input, cl.auth__input_password)}
          placeholder="Введите пароль"
          type="password"
          name="password"
          id="login-password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <button className={cx(cl.auth__button,cl.auth__button_login)}  onClick={() => {dispatch(login({email: email, password: password}))}}>Войти</button>
        <p
          className={cl.auth__text}
          onClick={(e) => {
            navigate("/registration");
            e.preventDefault();
          }}
        >
          <div className={cl.auth__link}>Регистрация</div>
        </p>
      </form>
      <button onClick={() => {dispatch(logout())}}>Выйти</button>
    </div>
    // <div>
    //     <input
    //         onChange={e => setEmail(e.target.value)}
    //         value={email}
    //         type='text'
    //         placeholder='Email'
    //     />
    //     <input
    //         onChange={e => setPassword(e.target.value)}
    //         value={password}
    //         type='password'
    //         placeholder='Пароль'
    //     />
    //     <button onClick={() => {dispatch(login({email: email, password: password}))}}>Логин</button>
    //     <button onClick={() => {dispatch(registration({email: email, password: password}))}}>Регистрация</button>
    //     <button onClick={() => {dispatch(logout())}}>Выйти</button>
    // </div>
  );
};

export default LoginForm;
