import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../../hooks/redux";
import cl from './NavbarItem.module.css'

import {CSSTransition, TransitionGroup,} from 'react-transition-group';
import {INavbarObject} from "../../types/INavbar";
import {useNavigate} from "react-router-dom";
import {
    disableNavbarObject,
    setNavbarObjectIsActive,
    setNavbarVisible
} from "../../../../../store/reducers/navbarSlice";


interface NavbarItemProps {
    item: INavbarObject,
}

const NavbarItem: FC<NavbarItemProps> = ({item}) => {
    const navigate = useNavigate()
    const {openItems} = useAppSelector(state => state.navbarSlice)
    const [listItemsIsVisible, setListItemsIsVisible] = useState<boolean>(-1 !== openItems.findIndex(searchItem => searchItem.title === item.title))
    const [itemIsActive, setItemIsActive] = useState<boolean>(-1 !== openItems.findIndex(searchItem => searchItem.title === item.title))
    const dispatch = useAppDispatch()

    useEffect(() => {
            setListItemsIsVisible(-1 !== openItems.findIndex(searchItem => searchItem.title === item.title))
            setItemIsActive(-1 !== openItems.findIndex(searchItem => searchItem.title === item.title))

        }, [openItems]
    )

    useEffect(() => {
        const ind = openItems.findIndex(it => it.link === window.location.pathname)
        if (ind === -1 && window.location.pathname === item.link) {
            dispatch(setNavbarObjectIsActive(item))
        } else {
            const index = openItems.findIndex(it => it.type === 'item')
            if (ind === -1 && index !== -1) {
                dispatch(disableNavbarObject(openItems[index]))
            }
        }
    }, [window.location.pathname])

    return (
        item.type === 'list'
            ? <div className={cl.list}>
                <div
                    className={cl.listTitle}
                    onClick={() => {
                        dispatch(setNavbarObjectIsActive(item))
                    }}
                >
                    <div className={[cl.listTitleBtn, listItemsIsVisible ? cl.listTitleBtnActive : ''].join(' ')}>
                        <span></span><span></span>
                    </div>
                    <p>
                        {item.title}
                    </p>
                </div>
                <TransitionGroup style={{width: '100%'}}>
                    {listItemsIsVisible
                        ?
                        <CSSTransition
                            key={item.title}
                            timeout={800}
                            classNames={{
                                enterActive: cl.itemEnterActive,
                                exitActive: cl.itemExitActive,
                            }}
                        >
                            <div className={cl.item}>
                                {item.items.map(i =>
                                    <NavbarItem key={i.title} item={i}/>
                                )}
                            </div>
                        </CSSTransition>
                        : ''
                    }
                </TransitionGroup>
            </div>
            : <div
                className={cl.itemTitle}
                onClick={() => {
                    if (window.location.pathname !== item.link) {
                        dispatch(setNavbarObjectIsActive(item))
                        navigate(`${item.link}`)
                    }
                    if (window.innerWidth < 768) {
                        dispatch(setNavbarVisible())
                    }
                }}>
                <div className={itemIsActive ? cl.itemTitleFlagActive : cl.itemTitleFlag}><span></span></div>
                {item.title}
            </div>

    );
};

export default NavbarItem;
