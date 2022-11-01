import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../../http";
import AuthService from "../../services/AuthService";
import {AuthResponse} from "../../types/AuthResponse";
import {IUser} from "../../types/IUser";
import TasksService from "../../services/TaskService";
import UserService from "../../services/UserService";

export const fetchAllTasks = createAsyncThunk(
    'tasks/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await TasksService.fetchTasks()
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить задания")
        }
    }
)
export const fetchEmployeeTasks = createAsyncThunk(
    '/tasks/:employeeId',
    async (id: string, thunkAPI) => {
        try {
            const response = await TasksService.fetchEmployeeTasks(id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить задания")
        }
    }
)

interface LoginObject {
    email: string;
    password: string;
}

interface RegObject {
    email: string;
    password: string;
    name: string;
    spec: string;
}

export const login = createAsyncThunk(
    'user/login',
    async (loginObject: LoginObject) => {
        try {
            const response = await AuthService.login(loginObject.email, loginObject.password);
            // console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
)

export const registration = createAsyncThunk(
    'user/registration',
    async (regObject: RegObject) => {
        try {
            const response = await AuthService.registration(regObject.email, regObject.password, regObject.name, regObject.spec);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        try {
            const response = await AuthService.logout();
            // console.log(response);
            localStorage.removeItem('token');
            return {} as IUser;
        } catch (e) {
            console.log(e);
        }
    }
)

export const checkAuth = createAsyncThunk(
    'user/auth',
    async () => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            // console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e) {
            //@ts-ignore
            console.log(e.response?.data?.message);
        }
    }
)

export const fetchEmployees = createAsyncThunk(
    'users/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await UserService.fetchEmployees()
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить сотрудников")
        }
    }
)

export const fetchEmployeeById = createAsyncThunk(
    'user/fetchById',
    async (id: string, thunkAPI) => {
        try {
            const response = await UserService.fetchEmployeeById(id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить сотрудника")
        }
    }
)

export const fetchUser = createAsyncThunk(
    'user/fetchById',
    async (id: string, thunkAPI) => {
        try {
            const response = await UserService.fetchEmployeeById(id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователя")
        }
    }
)

interface updateObject {
    user: IUser;
    id: string
}

export const updateEmployee = createAsyncThunk(
    'user/updateUser',
    async (updateObject: updateObject, thunkAPI) => {
        try {
            const response = await UserService.updateEmployee(updateObject.user, updateObject.id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось обновить данные")
        }
    }
)
