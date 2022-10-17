import MainPage from "../pages/MainPage";
import Month from "../components/Calendar/Month/Month";
import LoginForm from "../pages/LoginForm";
import RegistrationForm from "../components/RegistrationForm";

export const publicRoutes = [
    {path: '/', element: <MainPage/>},
    {path: '/month', element: <Month/>},
    {path: '/login', element: <LoginForm/>},
    {path: '/registration', element: <RegistrationForm/>},
];

export const privateRoutes = [
    ///
];
