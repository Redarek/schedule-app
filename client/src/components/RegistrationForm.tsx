import React, {FC, useState} from "react";
import cl from "../styles/RegistrationForm.module.css";
import cx from "classnames";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Input from "./UI/Input/Input";
import DropDownMenu from "./UI/DropDownMenu/DropDownMenu";
import {Categories} from "../types/Categories";
import {registration} from "../store/reducers/ActionCreators";
import {FormValidator} from "./UI/Input/models/FormValidator";
import {InputNames} from "./UI/Input/models/InputValidator";
import CheckBox from "./UI/CheckBox/CheckBox";


const categoriesList = Object.values(Categories)

const RegistrationForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    const {registrationError} = useAppSelector(state => state.authSlice)

    const inputs = [InputNames.EMAIL, InputNames.PASSWORD, InputNames.NAME]
    const formValidator = new FormValidator(inputs);


    const handleRegistration = () => {
        if (formValidator.getFormStatus()) {
            dispatch(registration({email: email, password: password, name: name}))
            if (registrationError === '') navigate("/login");
        }
    }

    return (
        <div className={cl.auth}>
            {registrationError && <span className={cl.formError}>{registrationError}</span>}
            <form className={cl.auth__form}>
                <label htmlFor='registration-email' className={cl.auth__label}>Email</label>
                <Input
                    formValidator={formValidator}
                    indexInValidator={0}
                    classes={cx(cl.auth__input_email)}
                    placeholder="Введите email"
                    name={InputNames.EMAIL}
                    id='registration-email'
                    value={email}
                    setValue={setEmail}
                    type={'email'}
                />
                <label htmlFor='registration-password' className={cl.auth__label}>Пароль</label>
                <Input
                    formValidator={formValidator}
                    indexInValidator={1}
                    classes={cl.auth__input_password}
                    placeholder={"Введите пароль"}
                    type={'password'}
                    name={InputNames.PASSWORD}
                    value={password}
                    setValue={setPassword}
                    showBtn={true}
                    id={"login-password"}
                />
                <label htmlFor='registration-name' className={cl.auth__label}>Имя</label>
                <Input
                    indexInValidator={2}
                    formValidator={formValidator}
                    classes={cl.auth__input_name}
                    placeholder="Введите имя"
                    type="text"
                    name={InputNames.NAME}

                    id='registration-name'
                    value={name}
                    setValue={setName}
                />
                {/*<label className={cl.auth__label}>Категория:</label>*/}
                {/*<div className={cl.categories}>*/}
                {/*    {categoriesList.map((category) =>*/}
                {/*        <div className={cl.category} key={category}>*/}
                {/*            <CheckBox*/}
                {/*                value={category}*/}
                {/*                list={categories}*/}
                {/*                setList={setCategories}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</div>*/}
                <button
                    className={cx(cl.auth__button, cl.auth__button_registration)}
                    onClick={(e) => {
                        e.preventDefault()
                        handleRegistration()
                    }}
                >Зарегистрироваться
                </button>
                <div
                    className={cl.auth__text}
                    onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                    }}
                >
                    <p className={cl.auth__link}>Вход</p>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
