import React, {FC} from 'react';
import cl from './Input.module.css'

interface Interface {
    placeholder: string;
    type: string;
    name: string
    value: any
    setValue: (e: any) => void
}


const Input: FC<Interface> = ({placeholder, type, name, value, setValue}, ...props) => {
    return (
        <input
            className={cl.input}
            placeholder={placeholder}
            type={type}
            name={name}
            id='registration-name'
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
};

export default Input;
