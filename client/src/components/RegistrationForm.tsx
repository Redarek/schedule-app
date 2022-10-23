import React, {FC, useState} from "react";
import cl from "../styles/RegistrationForm.module.css";
import cx from "classnames";
import { useNavigate } from "react-router-dom";
import {useAppDispatch} from "../hooks/redux";
import {login, registration} from "../store/reducers/ActionCreators";



const RegistrationForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className={cl.auth}>
      <form className={cl.auth__form}>
        <label htmlFor='registration-email' className={cl.auth__label}>Email</label>
        <input
          className={cx(cl.auth__input, cl.auth__input_email)}
          placeholder="Введите email"
          name="email"
          id='registration-email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='registration-password' className={cl.auth__label}>Пароль</label>
        <input
          className={cx(cl.auth__input, cl.auth__input_password)}
          placeholder="Введите пароль"
          type="password"
          name="password"
          id='registration-password'
            value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor='registration-name' className={cl.auth__label}>Имя</label>
        <input
            className={cx(cl.auth__input, cl.auth__input_password)}
            placeholder="Введите имя"
            type="text"
            name="name"
            id='registration-name'
              value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <button
            className={cx(cl.auth__button,cl.auth__button_registration)}
            onClick={()=> dispatch(registration({email: email, password: password, name: name}))}
        >Зарегистрироваться</button>
        <div
          className={cl.auth__text}
          onClick={(e) => {
            navigate("/login");
            e.preventDefault();
          }}
        >
          <p className={cl.auth__link}>Вход</p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
