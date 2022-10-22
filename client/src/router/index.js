import MainPage from "../pages/MainPage";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import CalendarPage from "../pages/CalendarPage";

export const publicRoutes = [
    {path: '/', element: <MainPage/>},
    {path: '/calendar', element: <CalendarPage/>},
    {path: '/login', element: <LoginForm/>},
    {path: '/registration', element: <RegistrationForm/>},
];

export const privateRoutes = [
    ///
];
export const authRoutes = [
    {path: '/login', element: <LoginForm/>},
    {path: '/registration', element: <RegistrationForm/>},
];
