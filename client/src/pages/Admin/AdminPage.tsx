import React, {FC, useState} from 'react';
import {FormValidator} from "../../components/UI/Input/models/FormValidator";
import {InputNames} from "../../components/UI/Input/models/InputValidator";
import Input from "../../components/UI/Input/Input";
import {getInputDate} from "../../components/UI/Input/inputDateFormat";

const AdminPage: FC = () => {
    const inputs = [InputNames.DATE_START, InputNames.DATE_FIRST_END, InputNames.DATE_SECOND_END]
    const formValidator = new FormValidator(inputs)

    const [start, setStart] = useState(getInputDate(new Date()))
    const [firstEnd, setFirstEnd] = useState(getInputDate(new Date(new Date().getTime() + 360000)))
    const [secondEnd, setSecondEnd] = useState(getInputDate(new Date(new Date().getTime() + 370000)))

    // useEffect(()=> {
    // },[])
    const setStartI = (data: string) => {
        const date = new Date(`${data}`)
        if (date.getTime())
            setStart(getInputDate(date))
    }

    const setFirstEndI = (data: string) => {
        const date = new Date(`${data}`)
        setFirstEnd(getInputDate(date))
    }
    const setSecondEndI = (data: string) => {
        const date = new Date(`${data}`)
        setSecondEnd(getInputDate(date))
    }

    return (
        <div>
            Страница Администратора
            <Input id={'start'} placeholder={''} type={'datetime-local'} name={InputNames.DATE_START} value={start}
                   setValue={setStartI}
                   indexInValidator={0}
                   formValidator={formValidator}/>
            <Input id={'firstEnd'} placeholder={''} type={'datetime-local'} name={InputNames.DATE_FIRST_END}
                   value={firstEnd}
                   indexInValidator={1}
                   setValue={setFirstEndI}
                   formValidator={formValidator}/>
            <Input id={'secondEnd'} placeholder={''} type={'datetime-local'} name={InputNames.DATE_SECOND_END}
                   value={secondEnd}
                   indexInValidator={2}
                   setValue={setSecondEndI}
                   formValidator={formValidator}/>
        </div>
    )

};

export default AdminPage;
