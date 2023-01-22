import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {Roles} from "../../types/Roles";
import {INavbarObject} from "./types/INavbar";
import NavbarItem from "./components/NavbarItem/NavbarItem";
import cl from './Navbar.module.css'
import {CSSTransition} from "react-transition-group";
import {setNavbarVisible} from "../../store/reducers/navbarSlice";


interface NavbarProps {
}


const Navbar: FC<NavbarProps> = ({}) => {
    const {navbarIsVisible} = useAppSelector(state => state.navbarSlice)
    const {employees, isLoading} = useAppSelector(state => state.employeeSlice)
    const {user} = useAppSelector(state => state.authSlice.user)
    const [navBarList, setNavbarList] = useState<INavbarObject[]>([])
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (employees.length !== 0 && navBarList.length === 0) {
            if (user.roles.includes(Roles.USER)) {
                setNavbarList([...navBarList, {
                    link: `/employee-page/${user.latinName}`,
                    title: `${user.name}`,
                    type: "list",
                    items: [],
                    isActive: false,
                }])
            }

            if (user.roles.includes(Roles.ADMIN)) {
                let employeesList: INavbarObject[] = []
                for (let i = 0; i < employees.length; i++) {
                    employeesList.push(
                        {
                            link: `/employee-page/${employees[i].latinName}`,
                            title: `${employees[i].name}`,
                            type: "item",
                            items: [],
                            isActive: false,
                        })
                }
                setNavbarList([...navBarList,
                    {
                        link: null,
                        title: `Сотрудники`,
                        type: "list",
                        items: [...employeesList],
                        isActive: false,
                    },
                    {
                        link: null,
                        title: `Администратор`,
                        type: "list",
                        isActive: false,
                        items: [
                            {
                                link: `/admin/${user.latinName}`,
                                title: `Страница администратора`,
                                type: "item",
                                items: [],
                                isActive: false,
                            },
                            {
                                link: `/admin/${user.latinName}/roles`,
                                title: `Роли`,
                                type: "item",
                                items: [],
                                isActive: false,
                            }
                        ]
                    }
                ])
            }
        }
    }, [employees])

    return (
        <div
            className={cl.background}
            onClick={() => dispatch(setNavbarVisible())}
            style={{width: navbarIsVisible? '100%': '0'}}
        >
            <CSSTransition
                in={navbarIsVisible}
                classNames={{
                    enterActive: cl.navBarEnterActive,
                    exitActive: cl.navBarExitActive
                }}
                timeout={1000}
                mountOnEnter
                unmountOnExit
            >

                <nav className={cl.navBar} onClick={(e) => e.stopPropagation()}>
                    {isLoading
                        ? 'Загрузка'
                        : navBarList.map((list) =>
                            <NavbarItem key={list.title} item={list}/>
                        )

                    }
                </nav>
            </CSSTransition>
        </div>
    );
};

export default Navbar;
