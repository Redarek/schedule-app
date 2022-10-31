import React, {FC, useEffect, useState} from 'react';
import cl from './NavList.module.css'
import ListItem from "../ListItem/ListItem";
import {IList} from "../../../types/INavbar";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {setNavbarOpenListsTitle} from "../../../store/reducers/navbarSlice";


interface NavListProps {
    list: IList
}

const NavList: FC<NavListProps> = ({list}) => {
    const dispatch = useAppDispatch()
    const [visible, setVisible] = useState(false)
    const [styles, setStyles] = useState([cl.icon])

    const {navbarActiveItem, openListsTitle} = useAppSelector(state => state.navbarSlice)

    const [activeItem, setActiveItem] = useState(list.items.findIndex(obj => obj.link === window.location.pathname));

    useEffect(() => {
        setActiveItem(list.items.findIndex(obj => obj.link === window.location.pathname))
        if (openListsTitle.length > 0) {
            // console.log(list.listTitle)
            const listIndex = openListsTitle.findIndex(obj => obj.listTitle === list.listTitle)
            // console.log(listIndex)
            if (listIndex > -1) {
                setVisible(true)
                setStyles([...styles, cl.active]);
            } else setStyles([cl.icon]);
        }
    }, [navbarActiveItem, visible, openListsTitle])

    console.log(openListsTitle)
    const openList = () => {
        // if (openListTitle === list.listTitle) {
        setVisible(!visible)
        if (!visible)
            dispatch(setNavbarOpenListsTitle(list))
        else dispatch(setNavbarOpenListsTitle(list))
        // }
    }


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
