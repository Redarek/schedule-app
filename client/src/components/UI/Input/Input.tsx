import React, {FC, useEffect, useState} from 'react';
import cl from './Input.module.css'
import {useDebounce} from "../../../hooks/useDebounce";
import {InputNames} from "./models/InputValidator";
import {FormValidator} from "./models/FormValidator";


interface InputProps {
    id: string;
    type: string;
    name: InputNames
    formValidator: FormValidator;
    indexInValidator: number
    value: any
    setValue: (e: any) => void;
    placeholder: string;
    showBtn?: boolean;
    classes?: any;
    pattern?: string;
    min?: number;
    readonly?: boolean
}


const Input: FC<InputProps> = ({
                                   id,
                                   type,
                                   name,
                                   formValidator,
                                   indexInValidator,
                                   value,
                                   setValue,
                                   placeholder,
                                   showBtn,
                                   classes,
                                   pattern,
                                   min,
                                   readonly
                               }) => {

    //SHOW INPUT VALUE start
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [inputType, setInputType] = useState(type)
    const isMobile = width <= 768;

    const [isShowValue, setIsShowValue] = useState(false)
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
        setIsShowValue(show)
        if (show) setInputType("text")
        else setInputType(type)
    }

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    //SHOW INPUT VALUE end

    //INPUT VALIDATION start

    const inputValidator = formValidator.getInputByIndex(indexInValidator)

    if (type === 'datetime-local') {
        switch (name) {
            case InputNames.DATE_FIRST_END:
                inputValidator.checkDateInput(value, formValidator.getInputByName(InputNames.DATE_START).getInputValue())
                break;
            case InputNames.DATE_SECOND_END:
                inputValidator.checkDateInput(value, formValidator.getInputByName(InputNames.DATE_FIRST_END).getInputValue())
                break;
            default:
                break;
        }
    }
    const [error, setError] = useState<string | null>(inputValidator.getInputError())
    const debouncedValue = useDebounce(value, 1100)

    inputValidator.checkInput(value)
    useEffect(() => {
        if (value !== '')
            setError(inputValidator.getInputError())
    }, [debouncedValue])

    //INPUT VALIDATION end

    return (
        <div className={clStyles.join(' ')}>
            {error && <div className={cl.errorFlag}></div>}
            <input
                readOnly={readonly}
                pattern={pattern}
                className={cl.input}
                placeholder={placeholder}
                type={inputType}
                name={name}
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                min={min}
            />
            {error && <label htmlFor={id} className={cl.error}>{error}</label>}
            {showBtn
                ? <div>
                    {isMobile
                        ? <div className={cl.inputBtn}
                               onClick={() => showValue(!isShowValue)}>
                            {isShowValue
                                ? <img draggable={false} src="/images/eyeOpen.png" alt=""/>
                                : <img draggable={false} src="images/eyeClose.png" alt=""/>
                            }
                        </div>
                        : <div className={cl.inputBtn}
                               onMouseLeave={() => showValue(false)}
                               onMouseDown={() => showValue(true)}
                               onMouseUp={() => showValue(false)}>
                            {isShowValue
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
