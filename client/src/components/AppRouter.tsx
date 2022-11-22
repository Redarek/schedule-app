import React, {FC, useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {authRoutes, privateRoutes, publicRoutes} from "../router";
import {useAppSelector} from "../hooks/redux";

const AppRouter: FC = () => {
    const {user, isAuth} = useAppSelector(state => state.authSlice)
    return (
        <Routes>
            {!isAuth
                ? publicRoutes.map(route =>
                    <Route
                        key={route.path}
                        element={route.element}
                        path={route.path}
                    />
                )
                : authRoutes.map(route =>
                    <Route
                        key={route.path}
                        element={route.element}
                        path={route.path}
                    />
                )
            }
            {isAuth
                ? user.user.roles.filter((role) => role === "admin")
                    ? privateRoutes.map(route =>
                        <Route
                            key={route.path}
                            element={route.element}
                            path={route.path}
                        />)
                    : ''
                : ''
            }
            {isAuth
                ? <Route path="*" element={<Navigate replace to={`/employee-page/${user.user.latinName}`}/>}/>
                : <Route path="*" element={<Navigate replace to="/login"/>}/>
            }
        </Routes>
    );
};

export default AppRouter;
