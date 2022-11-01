import React, {FC, useEffect, useState} from 'react';
import cl from './DropDownMenu.module.css'
import {log} from "util";

interface DropDownMenuProps {
    menuType: 'spec' | 'other' | 'employees' | 'role';
    title: string;
    menuItems: any[];
    dropMenuItem: string;
    setDropMenuItem: (item: string) => void;
    viewMode: 'right' | 'bottom'
    setIndexOfSelectElem?: (index: number) => void;
    indexOfMenu?: string;
    indexOfOpenMenu?: string;
    setIndexOfOpenMenu?: (index: string) => void;
}

const DropDownMenu: FC<DropDownMenuProps> = ({
                                                 title,
                                                 menuItems,
                                                 dropMenuItem,
                                                 setDropMenuItem,
                                                 menuType,
                                                 viewMode,
                                                 setIndexOfSelectElem,
                                                 indexOfMenu,
                                                 indexOfOpenMenu,
                                                 setIndexOfOpenMenu,
                                             }) => {
    //@todo Список specialities
    const specialities = ['Backend', 'Frontend', 'Design'];
    const roles = ['guest', 'user', 'admin'];

    let items: any[] = []
    switch (menuType) {
        case 'spec':
            items = specialities;
            break;
        case 'other':
            items = menuItems;
            break;
        case "employees":
            for (let i = 0; i < menuItems.length; i++) {
                items = [...items, menuItems[i].name]
            }
            break;
        case "role":
            items = roles
    }

    const wrapStyle = {width: '75%'}
    const menuListWrapStyle = {width: '240px', left: '75%', marginTop: '0'}

    switch (viewMode) {
        case "bottom":
            wrapStyle.width = '100%'
            menuListWrapStyle.width = '100%'
            menuListWrapStyle.left = '0'
            menuListWrapStyle.marginTop = '32px'
            break;
    }

    const [visible, setVisible] = useState(false)
    // console.log(numberOfMenu)
    // console.log(numberOfOpenMenu)
    useEffect(() => {
        if (indexOfOpenMenu !== indexOfMenu) setVisible(false)
    }, [indexOfOpenMenu])

    const checkSetOpenMenuTitle = () => {
        // console.log(indexOfOpenMenu)
        // console.log(setIndexOfOpenMenu)
        // console.log(indexOfMenu)
        // console.log(indexOfMenu)
        if (setIndexOfOpenMenu && indexOfMenu) {
            setIndexOfOpenMenu(indexOfMenu);
            // console.log(indexOfMenu)
        }
        // console.log(setNumberOfOpenMenu)
        // console.log(numberOfOpenMenu)
        // console.log(numberOfMenu)
        // console.log(numberOfOpenMenu)
        // console.log(numberOfMenu)
        setVisible(!visible);
    }

    return (
        <div className={cl.wrapper}>
            <div className={cl.wrap} style={wrapStyle} onClick={() => {
                checkSetOpenMenuTitle();
                setVisible(!visible);
            }}>
                <div
                    className={cl.menuTitle}>{dropMenuItem === '' ? title : items[items.findIndex(obj => obj === dropMenuItem)]}</div>
                <div className={cl.menuIcon}></div>
            </div>
            {visible
                ?
                <div className={cl.menuListWrap} style={menuListWrapStyle}>
                    {items.map((item, index) =>
                        <div key={item} className={cl.menuItem} onClick={() => {
                            setDropMenuItem(item);
                            if (setIndexOfSelectElem) setIndexOfSelectElem(index)
                            setVisible(false)
                        }}>
                            {item}
                        </div>
                    )}
                </div>
                : ''
            }
        </div>
    );
};

export default DropDownMenu;
