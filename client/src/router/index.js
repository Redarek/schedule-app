import MainPage from "../pages/MainPage";
import AuthorizationPage from "../pages/AuthorizationPage";
import EmployeeRegistration from "../components/EmployeeRegistration";
import CalendarPage from "../pages/CalendarPage";


export const publicRoutes= [
    {path: '/', element: <MainPage/>},
    {path: '/month', element: <CalendarPage/>},
    {path: '/login', element: <AuthorizationPage/>},
    {path: '/reg', element: <EmployeeRegistration/>},
];

export const privateRoutes = [
    ///
]
