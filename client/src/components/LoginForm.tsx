import React, {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {login, logout} from "../store/reducers/ActionCreators";
import cl from "../styles/RegistrationForm.module.css";
import cx from "classnames";
import {useNavigate} from "react-router-dom";
import Input from "./UI/Input/Input";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {user, isAuth} = useAppSelector(state => state.authSlice);

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
                <Input
                    classes={cl.auth__input_password}
                    placeholder={"Введите пароль"}
                    type={'password'}
                    name={'password'}
                    value={password}
                    setValue={setPassword}
                    showBtn={true}
                    id={"login-password"}
                />
                <button className={cx(cl.auth__button, cl.auth__button_login)}
                        onClick={(e) => {
                            e.preventDefault()
                            dispatch(login({email: email, password: password}));
                            navigate(`/employee-page`)
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
