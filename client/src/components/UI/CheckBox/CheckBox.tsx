import React, {FC, useState} from 'react';
import cl from "./CheckBox.module.css";

interface CheckBoxProps {
    label: string;
    action: (st: string) => void;
    value: string
}

const CheckBox: FC<CheckBoxProps> = ({label, value, action}) => {
    const [checked, setChecked] = useState<boolean>(false)

    if (value === label && !checked) setChecked(true)

    const handleChecked = () => {
        action(label)
        setChecked(!checked)
    }

    return (
        <label>
            <input className={cl.input}
                   type="checkbox"
                   checked={checked}
                   onChange={() => handleChecked()}
            />
            {label}
        </label>
    );
};

export default CheckBox;
