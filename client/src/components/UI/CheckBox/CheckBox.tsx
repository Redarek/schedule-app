import React, {FC, useEffect, useState} from 'react';
import cl from "./CheckBox.module.css";

interface CheckBoxProps {
    value: string,
    list: any[],
    setList: (str:any[]) => void
}

const CheckBox: FC<CheckBoxProps> = ({value, list, setList}) => {
    const [checked, setChecked] = useState<boolean>(false)

    useEffect(() => {
        let newList = list
        if (!checked) {
            newList = newList.filter(val => val !== value)
        } else {
            newList.push(value)
        }
        setList([...newList])
    }, [checked])


    return (
        <label htmlFor={value} className={cl.label}>
            <input
                checked={checked}
                className={cl.input}
                type="checkbox"
                id={value}
                onChange={() => setChecked(!checked)}
            />
            {value}
        </label>
    );
};

export default CheckBox;
