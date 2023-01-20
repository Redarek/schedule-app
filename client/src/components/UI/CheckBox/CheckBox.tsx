import React, {FC, useEffect, useState} from 'react';
import cl from "./CheckBox.module.css";

interface CheckBoxProps {
    value: string,
    list: any[],
    setList: (str: any[]) => void
}

const CheckBox: FC<CheckBoxProps> = ({value, list, setList}) => {
    const [checked, setChecked] = useState<boolean>(list?.includes(value))

    function handleChecked() {
        let newList = list
        if (list.includes(value)) {
            newList = newList.filter(val => val !== value)
        } else {
            newList.push(value)
        }
        setList([...newList])
    }

    return (
        <label htmlFor={value} className={cl.label}>
            <input
                checked={checked}
                className={cl.input}
                type="checkbox"
                id={value}
                onChange={() => {
                    setChecked(!checked)
                    handleChecked()
                }}
            />
            {value}
        </label>
    );
};

export default CheckBox;
