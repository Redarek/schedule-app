import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../../http";
import AuthService from "../../services/AuthService";
import {AuthResponse} from "../../types/AuthResponse";
import {IUser} from "../../types/IUser";
import TasksService from "../../services/TaskService";
import UserService from "../../services/UserService";
import {ITask} from "../../types/ITasks";

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

interface UpdateEmployee {
    user: IUser;
    id: string
}

export const updateEmployee = createAsyncThunk(
    'user/updateUser',
    async (updateEmployee: UpdateEmployee, thunkAPI) => {
        try {
            const response = await UserService.updateEmployee(updateEmployee.user, updateEmployee.id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось обновить данные")
        }
    }
)

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

export const fetchTaskById = createAsyncThunk(
    '/task/fetchById',
    async (id: string, thunkAPI) => {
        try {
            const response = await TasksService.fetchTaskById(id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить задание")
        }
    }
)

interface EditedTask {
    id: string;
    task: ITask;
}

export const editTask = createAsyncThunk(
    'task/edit/:id',
    async (updateTask: EditedTask, thunkAPI) => {
        try {
            const response = await TasksService.editTask(updateTask.id, updateTask.task,)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось обновить данные")
        }
    }
)

export const createTask = createAsyncThunk(
    'task/create',
    async (task: ITask, thunkAPI) => {
        try {
            const response = await TasksService.createTask(task)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось создать задачу")
        }
    }
)

export const deleteTask = createAsyncThunk(
    '/task/delete',
    async (id: string, thunkAPI) => {
        try {
            const response = await TasksService.deleteTask(id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось удалить задачу")
        }
    }
)

export const completeTask = createAsyncThunk(
    '/complete-task/:id',
    async (id:string, thunkAPI) => {
        try {
            const response = await TasksService.completeTask(id)
            return id;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось завершить")
        }
    }
)
