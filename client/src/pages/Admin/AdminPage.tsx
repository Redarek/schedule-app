import React, {FC} from 'react';
import FileBrowserComponent from "../../components/FileBrowser/components/FileBrowserComponent/FileBrowserComponent";
import {useAppSelector} from "../../hooks/redux";

const AdminPage: FC = () => {
    const {user} = useAppSelector(state => state.authSlice.user)
    return (
        <div>
            {user.name === 'Vladislav' || user.name === 'Радмир Ибрагимов'
                ? <FileBrowserComponent/>
                : 'Страница Администратора'
            }
        </div>
    )

};

export default AdminPage;
