import React, {FC, ReactNode} from 'react';
import cl from './Button.module.css'

interface ButtonProps {
    children: ReactNode,
    onClick: (v: any) => void
    onFocus?: (v: any) => void
    onBlur?: (v: any) => void
}

const Button: FC<ButtonProps> = ({children, onClick, onFocus, onBlur}) => {

    return (
        onFocus && onBlur
            ? <button className={cl.btn}
                      onClick={(e) => onClick(e)}
                      onFocus={(e) => onFocus(e)}
                      onBlur={(e) => onBlur(e)}
            >
                {children}
            </button>
            : <button className={cl.btn} onClick={(e) => onClick(e)}>
                {children}
            </button>
    );
};

export default Button;
