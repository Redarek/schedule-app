import React, {FC, useState} from 'react';
import cl from './DropDownMenu.module.css'

interface DropDownMenuProps {
    type: "employees" | "string";
    position: "bottom" | "right"
    selectItem: any;
    setSelectItem: (variable: any) => void;
    items: any[];
}

const DropDownMenu: FC<DropDownMenuProps> = ({selectItem, items, setSelectItem, type, position}) => {
    const [visible, setVisible] = useState(false)

    let inputStyles = {}
    let itemsStyles = {}

    if (position === "right") {
        itemsStyles = {left: '60%', width: '40%', top: '0'};
        inputStyles = {width: '60%'};
    }

    let itms = items
    switch (type) {
        case "employees":
            itms = []
            for (let i = 0; i < items.length; i++) {
                itms.push(items[i].name)
            }
            break;
    }
    return (
        <div className={cl.container}>
            <input style={inputStyles} className={cl.input} type="text" value={selectItem} readOnly={true}
                   onFocus={() => setVisible(true)}
                   onBlur={() => setTimeout(() => setVisible(false), 100)}/>
            {visible
                ? <div className={cl.items} style={itemsStyles}>
                    {itms.map(item =>
                        <div className={cl.item} key={item} onClick={() => {
                            setSelectItem(item);
                            setVisible(false)
                        }}>{item}</div>
                    )}
                </div>
                : ''
            }
        </div>
    );
};

export default DropDownMenu;
