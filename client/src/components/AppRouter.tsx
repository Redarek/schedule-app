import React, {FC} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {authRoutes, guestRoutes, privateRoutes, publicRoutes} from "../router";
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
                : user.user.roles[0] === 'guest' || user.user.roles.length === 0
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
                ? user.user.roles.findIndex((role) => role === "admin") !== -1
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
                ? user.user.roles[0] === 'guest' || user.user.roles.length === 0
                    ? <Route path="*" element={<Navigate replace to={`/contacts`}/>}/>
                    : <Route path="*" element={<Navigate replace to={`/employee-page/${user.user.latinName}`}/>}/>

                : <Route path="*" element={<Navigate replace to="/login"/>}/>
            }
        </Routes>
    );
};

export default AppRouter;
