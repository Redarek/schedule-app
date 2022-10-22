import React, {FC, useEffect} from 'react';
import cl from "./ListItem.module.css";
import {useNavigate} from "react-router-dom";
import {IList} from "../../../types/INavbar";

interface ListItemProps {
    title: string;
    link: string;
    index: number;
    activeItem: number;
    setActiveItem: (index: number) => void;
}


const ListItem: FC<ListItemProps> = ({title, index, activeItem, setActiveItem, link}) => {
    const navigate = useNavigate()
    return (
        <div className={cl.listItemWrap}
             onClick={(e) => {
                 setActiveItem(index);
                 navigate(link);
                 e.preventDefault()
             }}>
            {index === activeItem
                ? <div className={cl.activeItem}></div>
                : ''
            }
            <div className={cl.itemTitle}><a className={cl.itemLink} rel="stylesheet" href={link}>{title}</a></div>
        </div>
    );
};

export default ListItem;
