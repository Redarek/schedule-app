import React, {FC, useEffect} from 'react';
import cl from './Navbar.module.css'
import NavList from "../NavList/NavList";
import {IList} from "../../../types/INavbar";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchUsers} from "../../../store/reducers/ActionCreators";


interface NavbarProps {
}


const Navbar: FC<NavbarProps> = () => {
    const {user} = useAppSelector(state => state.authSlice)
    const {employees, isLoading, error} = useAppSelector(state => state.employeesSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (employees.length === 0) {
            dispatch(fetchUsers())
        }
    }, [])

    const employeesItems = []
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

    return (
        <nav className={cl.navWrap}>
            {isLoading
                ? 'Загрузка'
                : lists.map(list =>
                    <NavList key={list.listTitle} list={list}/>
                )
            }

        </nav>
    );
};

export default Navbar;
