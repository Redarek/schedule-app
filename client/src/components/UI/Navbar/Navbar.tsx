import React, {FC} from 'react';
import cl from './Navbar.module.css'
import NavList from "../NavList/NavList";
import {IList} from "../../../types/INavbar";


interface NavbarProps {
}


const Navbar: FC<NavbarProps> = () => {
    const lists: IList[] = [
        {
            listTitle: 'Pages',
            items: [
                {link: '/', title: 'MainPage'},
                {link: '/calendar', title: 'Calendar'},
                {link: '/login', title: 'Login'},
                {link: '/registration', title: 'Registration'}
            ]
        },
    ]

    return (
        <nav className={cl.navWrap}>
            {lists.map(list =>
                <NavList key={list.listTitle} list={list}/>
            )}
        </nav>
    );
};

export default Navbar;
