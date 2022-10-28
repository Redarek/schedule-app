import React, {FC, useState} from 'react';
import cl from './DropDownMenu.module.css'

interface DropDownMenuProps {
    menuType: 'spec' | 'other'
    title: string;
    menuItems: any[];
    dropMenuItem: string;
    setDropMenuItem: (item: string) => void;
    viewMode: 'right' | 'bottom'
}

const DropDownMenu: FC<DropDownMenuProps> = ({title, menuItems, dropMenuItem, setDropMenuItem, menuType, viewMode}) => {
    const specialities = ['Backend', 'Frontend', 'Design'];

    let items: any[]
    switch (menuType) {
        case 'spec':
            items = specialities;
            break;
        case 'other':
            items = menuItems;
            break;
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
    return (
        <div className={cl.wrapper}>
            <div className={cl.wrap} style={wrapStyle} onClick={() => setVisible(!visible)}>
                <div className={cl.menuTitle}>{dropMenuItem === '' ? title : items[items.findIndex(obj => obj === dropMenuItem)]}</div>
                <div className={cl.menuIcon}></div>
            </div>
            {visible
                ?
                <div className={cl.menuListWrap} style={menuListWrapStyle}>
                    {items.map((item, index) =>
                        <div key={item} className={cl.menuItem} onClick={() => {
                            setDropMenuItem(item);
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
