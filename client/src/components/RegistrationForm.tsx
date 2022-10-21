import React, { FC } from "react";
import cl from "../styles/RegistrationForm.module.css";
import cx from "classnames";
import { useNavigate } from "react-router-dom";



const RegistrationForm: FC = () => {
  const date = new Date(2022, 9, 15, 1, 1, 1);
  const navigate = useNavigate();
  console.log(date);
  const newDAte = new Date(date);
  console.log(newDAte);
  console.log(newDAte.getTime());

  return (
    <div className={cl.auth}>
      <form className={cl.auth__form}>
        <label htmlFor='registration-email' className={cl.auth__label}>Email</label>
        <input
          className={cx(cl.auth__input, cl.auth__input_email)}
          placeholder="Введите email"
          name="email"
          id='registration-email'
          //   value={}
          //   onChange={}
        />
        <label htmlFor='registration-password' className={cl.auth__label}>Пароль</label>
        <input
          className={cx(cl.auth__input, cl.auth__input_password)}
          placeholder="Введите пароль"
          type="password"
          name="password"
          id='registration-password'
          //   value={}
          //   onChange={}
        />
        <button className={cx(cl.auth__button,cl.auth__button_registration)}>Зарегистрироватсья</button>
        <p
          className={cl.auth__text}
          onClick={(e) => {
            navigate("/login");
            e.preventDefault();
          }}
        >
          <div className={cl.auth__link}>Вход</div>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
