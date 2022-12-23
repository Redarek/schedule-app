import React, {FC, useEffect, useState} from 'react';
import cl from './Input.module.css'
import {useDebounce} from "../../../hooks/useDebounce";
import {Validator} from "../../../utils/Validator";


interface InputProps {
    id: string;
    showBtn?: boolean;
    classes?: any;
    placeholder: string;
    type: string;
    name: string
    value: any
    setValue: (e: any) => void;
}


const Input: FC<InputProps> = ({
                                   placeholder,
                                   id,
                                   type,
                                   name,
                                   value,
                                   setValue,
                                   showBtn,
                                   classes,
                               }) => {

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [inputType, setInputType] = useState(type)
    const isMobile = width <= 768;

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const [isShow, setIsShow] = useState(false)
    const [clStyles, setClStyles] = useState<any>([cl.inputWrap])

    useEffect(() => {
        if (classes) {
            setClStyles([...clStyles, classes])
        }
    }, [])

    const showValue = (show: boolean) => {
        setIsShow(show)
        if (show) setInputType("text")
        else setInputType(type)
    }


    const [error, setError] = useState<string | null>(null)
    const debouncedValue = useDebounce(value, 1100)
    const validator = new Validator()

    useEffect(() => {
        if (value !== '')
            switch (name) {
                case 'email':
                    if (validator.checkMinLength(value, 5)) setError(`Минимальная длина 5 символов`)
                    else if (validator.checkSymbols(value)) setError(`Недопустимые символы`)
                    else if (validator.checkMaxLength(value, 50)) setError('Масимальная длина 50 символов')
                    else if (validator.checkEmailSymbol(value)) setError("Пропушены символы @domain.com")
                    else setError(null)
                    break;
                case'password':
                    if (validator.checkMinLength(value, 5)) setError("Длинна пароля не менее 5 символов")
                    else setError(null)
                    break;
                case'name':
                    if (validator.checkMinLength(value, 3)) setError("Длинна имени не менее 3 символов")
                    else setError(null)

                    break;
                default:
                    setError(null)
            }
    }, [debouncedValue])

    return (
        <div className={clStyles.join(' ')}>
            {error && <div className={cl.errorFlag}></div>}
            <input
                className={cl.input}
                placeholder={placeholder}
                type={inputType}
                name={name}
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {error && <label htmlFor={id} className={cl.error}>{error}</label>}
            {showBtn
                ? <div>
                    {isMobile
                        ? <div className={cl.inputBtn}
                               onClick={() => showValue(!isShow)}>
                            {isShow
                                ? <img draggable={false} src="/images/eyeOpen.png" alt=""/>
                                : <img draggable={false} src="images/eyeClose.png" alt=""/>
                            }
                        </div>
                        : <div className={cl.inputBtn}
                               onMouseLeave={() => showValue(false)}
                               onMouseDown={() => showValue(true)}
                               onMouseUp={() => showValue(false)}>
                            {isShow
                                ? <img draggable={false} src="/images/eyeOpen.png" alt=""/>
                                : <img draggable={false} src="images/eyeClose.png" alt=""/>
                            }
                        </div>
                    }
                </div>
                : ''
            }
        </div>
    );
};

export default Input;
