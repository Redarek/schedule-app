import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {login} from "../store/reducers/ActionCreators";
import cl from "../styles/RegistrationForm.module.css";
import cx from "classnames";
import {useNavigate} from "react-router-dom";
import Input from "./UI/Input/Input";
import {FormValidator} from "./UI/Input/models/FormValidator";
import {InputNames} from "./UI/Input/models/InputValidator";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {error} = useAppSelector(state => state.authSlice);

    const inputs = [InputNames.EMAIL, InputNames.PASSWORD]
    const formValidator = new FormValidator(inputs)

    const handleLogin = () => {

        if (formValidator.getFormStatus()) {
            dispatch(login({email: email, password: password}));
            if (error === '') navigate(`/employee-page`)
        }
    }

    return (
        <div className={cl.auth}>
            {error && <span className={cl.formError}>{error}</span>}
            <form className={cl.auth__form}>
                <label htmlFor="login-email" className={cl.auth__label}>
                    Email
                </label>
                <Input
                    formValidator={formValidator}
                    classes={cl.auth__input_email}
                    placeholder="Введите email"
                    name={InputNames.EMAIL}
                    indexInValidator={0}
                    id="login-email"
                    setValue={setEmail}
                    value={email}
                    type='email'
                />
                <label htmlFor="login-password" className={cl.auth__label}>
                    Пароль
                </label>
                <Input
                    classes={cl.auth__input_password}
                    formValidator={formValidator}
                    placeholder={"Введите пароль"}
                    type={'password'}
                    name={InputNames.PASSWORD}
                    indexInValidator={1}
                    value={password}
                    setValue={setPassword}
                    showBtn={true}
                    id={"login-password"}
                />
                <button className={cx(cl.auth__button, cl.auth__button_login)}
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogin()
                        }
                        }
                >Войти
                </button>
                <div
                    className={cl.auth__text}
                    onClick={(e) => {
                        navigate("/registration");
                        e.preventDefault();
                    }}
                >
                    <p className={cl.auth__link}>Регистрация</p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
