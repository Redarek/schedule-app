import React, {FC} from 'react';
import cl from './Navbar.module.css'
import NavList from "../NavList/NavList";
import {IList} from "../../types/INavbar";
import {useAppSelector} from "../../hooks/redux";
import {Roles} from "../../types/Roles";


interface NavbarProps {
}

interface EmployeesItems {
    link: string;
    title: string
}

const Navbar: FC<NavbarProps> = () => {
    const {employees, isLoading, error} = useAppSelector(state => state.employeeSlice)
    const {user} = useAppSelector(state => state.authSlice.user)
    // const [employeesItems, setEmployeesItems] = useState<EmployeesItems[]>([])
    let employeesItems: EmployeesItems[] = []
    // useEffect(() => {
    //     console.log(employees)
    // if (employees.length !== 0) {
    //     for (let i = 0; i < employees.length; i++) {
    // setEmployeesItems([...employeesItems, {
    //     link: `/employee-page/${employees[i].latinName}`,
    //     title: `${employees[i].name}`
    // }])

    // employeesItems.push({link: `/employee-page/${employees[i].latinName}`, title: `${employees[i].name}`})
    // }
    // }
    // }, [employees])

    if (employees.length !== 0) {
        //Если есть роль User показываем только его страницу//
        if (user.roles.includes(Roles.USER)) {
            employeesItems = [{link: `/employee-page/${user.latinName}`, title: `${user.name}`}]
        }

        if (user.roles.includes(Roles.ADMIN)) {
            employeesItems = []
            for (let i = 0; i < employees.length; i++) {
                employeesItems.push({link: `/employee-page/${employees[i].latinName}`, title: `${employees[i].name}`})
            }
        }
    }


    const lists: IList[] = [
        {
            listTitle: 'Сотрудники',
            items: employeesItems
        },
    ]
    if (user.roles.includes(Roles.ADMIN) || user.roles.includes(Roles.SUPER_ADMIN)) {
        lists.push({
            listTitle: 'Администратор',
            items: [
                {link: `/admin/${user.latinName}`, title: 'Администратор'},
                {link: `/admin/${user.latinName}/roles`, title: 'Настройка ролей'}
            ],
        })
    }

    return (
        <nav className={cl.navWrap} onClick={(e) => e.stopPropagation()}>
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
