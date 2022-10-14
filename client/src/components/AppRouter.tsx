import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {publicRoutes} from "../router";

const AppRouter:FC = () => {
    return (
        <Routes>
            {publicRoutes.map(route =>
                <Route
                    key={route.path}
                    element={route.element}
                    path={route.path}
                />
            )}
        </Routes>
    );
};

export default AppRouter;
