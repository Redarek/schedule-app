import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {authRoutes, guestRoutes, privateRoutes, publicRoutes} from "../router";
import {useAppSelector} from "../hooks/redux";
import {Roles} from "../types/Roles";

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
                : user.user.roles.length === 0 || (user.user.roles.includes(Roles.GUEST) && user.user.roles.length === 1)
                    ? guestRoutes.map(route =>
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
                ? user.user.roles.includes(Roles.ADMIN) || user.user.roles.includes(Roles.SUPER_ADMIN)
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
                ? user.user.roles.length === 0 || (user.user.roles.includes(Roles.GUEST) && user.user.roles.length === 1)
                    ? <Route path="*" element={<Navigate replace to={`/contacts`}/>}/>
                    : <Route path="*" element={<Navigate replace to={`/employee-page/${user.user.latinName}`}/>}/>

                : <Route path="*" element={<Navigate replace to="/login"/>}/>
            }
        </Routes>
    );
};

export default AppRouter;
