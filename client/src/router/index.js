import MainPage from "../pages/MainPage";
import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import CalendarPage from "../pages/CalendarPage";
import EmployeePage from "../pages/EmployeePage";

export const publicRoutes = [
    {path: '/login', element: <LoginForm/>},
    {path: '/registration', element: <RegistrationForm/>},
];

export const privateRoutes = [
    ///
];
export const authRoutes = [
    {path: '/employee-page/:latinName', element: <EmployeePage/>, exact: true},
];
