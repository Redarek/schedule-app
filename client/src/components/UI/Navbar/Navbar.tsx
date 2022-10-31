import React, {FC, useEffect} from 'react';
import cl from './Navbar.module.css'
import NavList from "../NavList/NavList";
import {IList} from "../../../types/INavbar";
import {useAppSelector} from "../../../hooks/redux";


interface NavbarProps {
}


const Navbar: FC<NavbarProps> = () => {
    const {employees, isLoading, error} = useAppSelector(state => state.employeesSlice)
    const {user} = useAppSelector(state => state.authSlice.user)
    const employeesItems: any = []
    useEffect(() => {
        if (employees.length === 0) {
            for (let i = 0; i < employees.length; i++) {
                employeesItems.push({link: `/employee-page/${employees[i].latinName}`, title: `${employees[i].name}`})
            }
        }
    }, [employees])

    if (employees.length !== 0) {
        for (let i = 0; i < employees.length; i++) {
            employeesItems.push({link: `/employee-page/${employees[i].latinName}`, title: `${employees[i].name}`})
        }
    }

    const lists: IList[] = [
        {
            listTitle: 'Сотрудники',
            items: employeesItems
        },
    ]
    if (user.role === "admin") {
        lists.push({
            listTitle: 'Админ',
            items:[{link: `/admin/${user.latinName}`, title: 'Панель админа'}] ,
        })
    }

    return (
        <nav className={cl.navWrap}>
            {isLoading
                ? 'Загрузка списков'
                : lists.map(list =>
                    <NavList key={list.listTitle} list={list}/>
                )
            }

        </nav>
    );
};

export default Navbar;
