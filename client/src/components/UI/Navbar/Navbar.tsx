import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Roles} from "../../../types/Roles";
import {INavbarObject} from "./types/INavbar";
import NavbarItem from "./components/NavbarItem/NavbarItem";
import cl from './Navbar.module.css'
import {CSSTransition} from "react-transition-group";
import {setNavbarVisible} from "../../../store/reducers/navbarSlice";
import {fetchEmployees} from "../../../store/reducers/ActionCreators";


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
                    type: "item",
                    items: [],
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
                        })
                }
                setNavbarList([...navBarList,
                    {
                        link: null,
                        title: `Сотрудники`,
                        type: "list",
                        items: [...employeesList],
                    },
                    {
                        link: null,
                        title: `Администратор`,
                        type: "list",
                        items: [
                            {
                                link: `/admin/${user.latinName}`,
                                title: `Страница администратора`,
                                type: "item",
                                items: [],
                            },
                            {
                                link: `/admin/${user.latinName}/roles`,
                                title: `Роли`,
                                type: "item",
                                items: [],
                            }
                        ]
                    }
                ])
            }
        } else if (employees.length === 0) {
            dispatch(fetchEmployees())
        }
    }, [employees])

    return (
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
            <div
                className={cl.background}
                onClick={() => dispatch(setNavbarVisible())}
                // style={{width: navbarIsVisible ? '100%' : 'auto'}}
            >

                <nav className={cl.navBar} onClick={(e) => e.stopPropagation()}>
                    {isLoading
                        ? 'Загрузка'
                        : navBarList.map((list) =>
                            <NavbarItem key={list.title} item={list}/>
                        )

                    }
                </nav>
            </div>
        </CSSTransition>
    );
};

export default Navbar;
