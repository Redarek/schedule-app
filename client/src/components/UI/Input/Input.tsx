import React, {FC, useEffect, useMemo, useState} from 'react';
import cl from './Input.module.css'
import {useDebounce} from "../../../hooks/useDebounce";
import {FormValidator} from "../../../utils/FormValidator";
import {InputValidator} from "../../../utils/InputValidator";


interface InputProps {
    id: string;
    showBtn?: boolean;
    classes?: any;
    placeholder: string;
    type: string;
    name: string
    value: any
    setValue: (e: any) => void;
    inputValidator: InputValidator;
    // setInputValidators: (valid:InputValidator) => void
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
                                   inputValidator
                                   // setInputValidators
                               }) => {

    const [width, setWidth] = useState<number>(window.innerWidth);
    const [inputType, setInputType] = useState(type)
    const isMobile = width <= 768;


    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }


    const [isShow, setIsShow] = useState(false)
    const [clStyles, setClStyles] = useState<any>([cl.inputWrap])

    useEffect(() => {
        if (classes) {
            setClStyles([...clStyles, classes])
        }

        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }

    }, []);


    const showValue = (show: boolean) => {
        setIsShow(show)
        if (show) setInputType("text")
        else setInputType(type)
    }


    const [error, setError] = useState<string | null>(inputValidator.getInputError())
    const debouncedValue = useDebounce(value, 1100)

    inputValidator.checkInput(value)

    useEffect(() => {
        if (value !== '')
            setError(inputValidator.getInputError())
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
