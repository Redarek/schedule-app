import React, {FC, useEffect, useState} from 'react';
import cl from './NavList.module.css'
import ListItem from "../ListItem/ListItem";
import {IList} from "../../../types/INavbar";


interface NavListProps {
    list: IList
}

const NavList: FC<NavListProps> = ({list}) => {
    const [visible, setVisible] = useState(false)
    const [styles, setStyles] = useState([cl.icon])

    useEffect(() => {
        if (localStorage.getItem(list.listTitle)) {
            setVisible(true)
            setStyles([...styles, cl.active]);
        } else setStyles([cl.icon]);
    }, [visible])

    const openList = () => {
        setVisible(!visible)
        if (!visible) localStorage.setItem(list.listTitle, list.listTitle)
        else localStorage.removeItem(list.listTitle)
    }

    const [activeItem, setActiveItem] = useState(list.items.findIndex(obj => obj.link === window.location.pathname));

    return (
        <div className={cl.navListWrap}>
            <div className={cl.navList} onClick={() => openList()}>
                <div className={styles.join(' ')}>
                    <span></span>
                    <span></span>
                </div>
                <div className={cl.listTitle}>{list.listTitle}</div>
            </div>
            <div className={cl.list}>
                {visible
                    ? list.items.map((item, index) =>
                        <ListItem
                            title={item.title}
                            link={item.link}
                            index={index}
                            key={item.title}
                            activeItem={activeItem}
                            setActiveItem={() => setActiveItem(index)}
                        />
                    )
                    : ''

                }
            </div>
        </div>
    );
};

export default NavList;
