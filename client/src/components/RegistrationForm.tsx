import React, {FC, useState} from "react";
import cl from "../styles/RegistrationForm.module.css";
import cx from "classnames";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import Input from "./UI/Input/Input";
import DropDownMenuV2 from "./UI/DropDownMenu/DropDownMenuV2";
import {Specialities} from "../types/Specialities";
import {registration} from "../store/reducers/ActionCreators";
import {FormValidator} from "../utils/FormValidator";
import {InputNames} from "../utils/InputValidator";


const RegistrationForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [spec, setSpec] = useState<string>('Специальность')


    const {registrationError} = useAppSelector(state => state.authSlice)

    const inputs = [InputNames.EMAIL, InputNames.PASSWORD, InputNames.NAME]
    const formValidator = new FormValidator(inputs);


    const handleRegistration = () => {
        if (!formValidator.getFormStatus() && spec !== 'Специальность') {
            dispatch(registration({email: email, password: password, name: name, spec: spec}))
            if (registrationError === '') navigate("/login");
        }
    }

    return (
        <div className={cl.auth}>
            {registrationError && <span className={cl.formError}>{registrationError}</span>}
            <form className={cl.auth__form}>
                <label htmlFor='registration-email' className={cl.auth__label}>Email</label>
                <Input
                    inputValidator={formValidator.getInput(InputNames.EMAIL)}
                    classes={cx(cl.auth__input_email)}
                    placeholder="Введите email"
                    name="email"
                    id='registration-email'
                    value={email}
                    setValue={setEmail}
                    type={'email'}
                />
                <label htmlFor='registration-password' className={cl.auth__label}>Пароль</label>
                <Input
                    inputValidator={formValidator.getInput(InputNames.PASSWORD)}
                    classes={cl.auth__input_password}
                    placeholder={"Введите пароль"}
                    type={'password'}
                    name={'password'}
                    value={password}
                    setValue={setPassword}
                    showBtn={true}
                    id={"login-password"}
                />
                <label htmlFor='registration-name' className={cl.auth__label}>Имя</label>
                <Input
                    inputValidator={formValidator.getInput(InputNames.NAME)}
                    classes={cl.auth__input_name}
                    placeholder="Введите имя"
                    type="text"
                    name="name"
                    id='registration-name'
                    value={name}
                    setValue={setName}
                    // onChange={(e: any) => setName(e.target.value)}
                />
                <DropDownMenuV2
                    type={"string"}
                    position={"bottom"}
                    selectItem={spec}
                    setSelectItem={setSpec}
                    items={Object.values(Specialities)}
                />
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
