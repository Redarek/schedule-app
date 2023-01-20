import React, {FC} from 'react';
import FileBrowserComponent from "../../components/FileBrowser/components/FileBrowserComponent/FileBrowserComponent";
import {useAppSelector} from "../../hooks/redux";
import KanbanComponent from "../../components/Kanban/KanbanComponent";

const AdminPage: FC = () => {
    const {user} = useAppSelector(state => state.authSlice.user)
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
