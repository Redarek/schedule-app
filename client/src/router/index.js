import MainPage from "../pages/MainPage";
import Month from "../components/Calendar/Month/Month";
import AuthorizationPage from "../pages/AuthorizationPage";
import EmployeeRegistration from "../components/EmployeeRegistration";


export const publicRoutes= [
    {path: '/', element: <MainPage/>},
    {path: '/month', element: <Month/>},
    {path: '/login', element: <AuthorizationPage/>},
    {path: '/reg', element: <EmployeeRegistration/>},
];

export const privateRoutes = [
    ///
]
