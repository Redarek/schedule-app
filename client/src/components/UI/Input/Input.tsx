import React, {CSSProperties, FC, useEffect, useState} from 'react';
import cl from './Input.module.css'


interface Interface {
    id: string;
    showBtn?: boolean;
    classes?: any;
    placeholder: string;
    type: string;
    name: string
    value: any
    setValue: (e: any) => void
}


const Input: FC<Interface> = ({
                                  placeholder,
                                  id,
                                  type,
                                  name,
                                  value,
                                  setValue,
                                  showBtn,
                                  classes
                              }) => {
    const [isShow, setIsShow] = useState(false)
    const [clStyles, setClStyles] = useState<any>([cl.inputWrap])
    useEffect(() => {
        if (classes) {
            setClStyles([...clStyles, classes])
        }
    }, [])
    const [inputType, setInputType] = useState(type)
    const showValue = (show: boolean) => {
        setIsShow(show)
        if (show) setInputType("text")
        else setInputType(type)
    }
    return (
        <div className={clStyles.join(' ')}>
            <input
                className={cl.input}
                placeholder={placeholder}
                type={inputType}
                name={name}
                id={id}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            {showBtn
                ? <div className={cl.inputBtn}
                       onMouseLeave={() => showValue(false)}
                       onMouseDown={() => showValue(true)}
                       onMouseUp={() => showValue(false)}>
                    {isShow
                        ? <img draggable={false} src="/images/eyeOpen.png" alt=""/>
                        : <img draggable={false} src="images/eyeClose.png" alt=""/>
                    }
                </div>
                : ''
            }
        </div>
    );
};

export default Input;
