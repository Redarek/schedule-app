import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import EmployeePage from "../pages/EmployeePage";
import AdminPage from "../pages/Admin/AdminPage";

export const publicRoutes = [
    {path: '/login', element: <LoginForm/>},
    {path: '/registration', element: <RegistrationForm/>},
];

export const privateRoutes = [
    {path: '/admin/:latinName', element: <AdminPage/>, exact: true},
];
export const authRoutes = [
    {path: '/employee-page/:latinName', element: <EmployeePage/>, exact: true},
];
