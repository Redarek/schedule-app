import LoginForm from "../components/LoginForm";
import RegistrationForm from "../components/RegistrationForm";
import EmployeePage from "../pages/EmployeePage";
import AdminPage from "../pages/Admin/AdminPage";
import TaskEditPage from "../pages/TaskEditPage";
import GuestPage from "../pages/GuestPage";
import RolesPage from "../pages/Admin/RolesPage";
import DocumentPage from "../pages/DocumentPage";

export const publicRoutes = [
    {path: '/login', element: <LoginForm/>},
    {path: '/registration', element: <RegistrationForm/>},
];

export const privateRoutes = [
    {path: '/admin/:latinName', element: <AdminPage/>, exact: true},
    {path: '/admin/:latinName/roles', element: <RolesPage/>, exact: true},
];
export const authRoutes = [
    {path: '/employee-page/:latinName', element: <EmployeePage/>, exact: true},
    {path: '/document/:documentId', element: <DocumentPage/>, exact: true},
    // {path: '/contacts', element: <ContactsPage/>, exact: true},
    {path: '/task-edit/:taskId', element: <TaskEditPage/>, exact: true},
];

export const guestRoutes = [
    {path: '/contacts', element: <GuestPage/>, exact: true},
];
