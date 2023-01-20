import React, {FC, useEffect, useState} from 'react';
import cl from "./CheckBox.module.css";

interface CheckBoxProps {
    value: string,
    type: 'radio' | 'checkbox'
    list: any[],
    setList: (str: any[]) => void
}

const CheckBox: FC<CheckBoxProps> = ({value, list, setList, type}) => {
    const [checked, setChecked] = useState<boolean>(list?.includes(value))

    useEffect(() => {
        setChecked(list?.includes(value))
    }, [list])

    function handleChecked() {
        let newList = list
        switch (type) {
            case "radio":
                if (list.includes(value)) {
                    setList([])
                } else {
                    setList([value])
                }
                break;
            case "checkbox":
                if (list.includes(value)) {
                    newList = newList.filter(val => val !== value)
                } else {
                    newList.push(value)
                }
                setList([...newList])
                break;
            default:
                break;
        }
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
