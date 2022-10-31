import React, {FC, useEffect} from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {authRoutes, privateRoutes, publicRoutes} from "../router";
import {useAppSelector} from "../hooks/redux";

const AppRouter: FC = () => {
    const {user, isAuth, isLoading} = useAppSelector(state => state.authSlice)
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
            {user.user && isAuth
                ? user.user.role === 'admin'
                    ? privateRoutes.map(route =>
                        <Route
                            key={route.path}
                            element={route.element}
                            path={route.path}
                        />)
                    : ''
                : ''
            }
            {isAuth && user.user
                ? <Route path="*" element={<Navigate replace to={`/employee-page/${user.user.latinName}`}/>}/>

                : localStorage.getItem('userId')
                    ? ''
                    : <Route path="*" element={<Navigate replace to="/login"/>}/>
            }
        </Routes>
    );
};

export default AppRouter;
