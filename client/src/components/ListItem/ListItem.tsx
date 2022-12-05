import React, {FC} from 'react';
import cl from "./ListItem.module.css";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../hooks/redux";
import {setNavbarVisible} from "../../store/reducers/navbarSlice";

interface ListItemProps {
    title: string;
    link: string;
    index: number;
    activeItem: number;
    setActiveItem: (index: number) => void;
}

const wrapper = document.querySelector(".wrapper")

const ListItem: FC<ListItemProps> = ({title, index, activeItem, setActiveItem, link}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <div className={cl.listItemWrap}
             onClick={(e) => {
                 setActiveItem(index);
                 navigate(link);
                 e.preventDefault()
                 if (window.screen.width < 768) dispatch(setNavbarVisible(true))
                 // wrapper.scrollBy({left: 1000, behavior: "smooth"})
             }}>
            {index === activeItem && link === window.location.pathname
                ? <div className={cl.activeItem}></div>
                : ''
            }
            <div className={cl.itemTitle}><a className={cl.itemLink} rel="stylesheet" href={link}>{title}</a></div>
        </div>
    );
};

export default ListItem;
