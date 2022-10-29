import React, {FC, ReactNode} from 'react';
import cl from './Button.module.css'

interface ButtonProps {
    children: ReactNode,
    onClick: (v: any) => void

}
const Button:FC<ButtonProps> = ({children, onClick}) => {
    return (
        <div className={cl.btn} onClick={(e) => onClick(e)}>
            {children}
        </div>
    );
};

export default Button;
