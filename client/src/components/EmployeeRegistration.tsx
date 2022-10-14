import React, {FC} from 'react';

const EmployeeRegistration: FC= () => {
    const date = new Date(2022, 9,15,1,1,1)
    console.log(date)
    const newDAte = new Date(date)
    console.log(newDAte)
    console.log(newDAte.getTime())
    return (
        <div>
            КОМПОНЕНТ РЕГИСТРАЦИИ СОТРУДНИКА
            Прописать в типах интерфейс IUser
        </div>
    );
};

export default EmployeeRegistration;
