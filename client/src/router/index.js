import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import EmployeePage from "../pages/EmployeePage";
import AdminPage from "../pages/Admin/AdminPage";
import TaskEditPage from "../pages/TaskEditPage";
import ContactsPage from "../pages/ContactsPage";

export const publicRoutes = [
    {path: '/login', element: <LoginForm/>},
    {path: '/registration', element: <RegistrationForm/>},
];

export const privateRoutes = [
    {path: '/admin/:latinName', element: <AdminPage/>, exact: true},
];
export const authRoutes = [
    {path: '/employee-page/:latinName', element: <EmployeePage/>, exact: true},
    {path: '/contacts', element: <ContactsPage/>, exact: true},
    {path: '/task-edit/:taskId', element: <TaskEditPage/>, exact: true},
];

export const guestRoutes = [
    {path: '/contacts', element: <ContactsPage/>, exact: true},
];
