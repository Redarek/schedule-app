import React, {FC, useEffect} from 'react';
import FileBrowserComponent from "../../components/FileBrowser/components/FileBrowserComponent/FileBrowserComponent";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import KanbanComponent from "../../components/Kanban/KanbanComponent";
import {setNavbarObjectIsActiveLink} from "../../store/reducers/navbarSlice";

const AdminPage: FC = () => {
    const {user} = useAppSelector(state => state.authSlice.user)
    const dispatch = useAppDispatch()
    useEffect(()=> {
        dispatch(setNavbarObjectIsActiveLink({
            title: `Страница администратора`,
            type: 'item',
            link: `/admin/${user.latinName}`,
            isActive: false,
            items: []
        }))
    }, [])
    return (
        <div>
            {process.env.NODE_ENV === 'development'
                ? <FileBrowserComponent/>
                : 'Страница Администратора'
            }
            {process.env.NODE_ENV === 'development'
                ? <KanbanComponent/>
                : 'Страница Администратора'
            }
        </div>
    )

};

export default AdminPage;
