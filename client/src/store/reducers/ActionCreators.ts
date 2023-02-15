import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {API_URL} from "../../http";
import AuthService from "../../services/AuthService";
import {AuthResponse} from "../../types/AuthResponse";
import {IUser} from "../../types/IUser";
import TasksService from "../../services/TaskService";
import UserService from "../../services/UserService";
import {ITask} from "../../types/ITasks";
import BonusService from "../../services/BonusService";
import {Categories} from "../../types/Categories";

interface LoginObject {
    email: string;
    password: string;
}

interface RegObject {
    email: string;
    password: string;
    name: string;
    // categories: Categories[];
}

export const login = createAsyncThunk(
    'user/login',
    async (loginObject: LoginObject, thunkAPI) => {
        try {
            const response = await AuthService.login(loginObject.email, loginObject.password);
            // console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
        }
    }
)

export const registration = createAsyncThunk(
    'user/registration',
    async (regObject: RegObject, thunkAPI) => {
        try {
            const response = await AuthService.registration(regObject.email, regObject.password, regObject.name);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
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
    async (arg, thunkAPI) => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true});
            // console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            return response.data;
        } catch (e: any) {
            localStorage.removeItem('token')
            return thunkAPI.rejectWithValue(e.response.data.message)
            //@ts-ignore
            // console.log(e.response?.data?.message);
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
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response.data.message)
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
            // console.log(response.data)
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

export interface EditedTask {
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
    async (id: string, thunkAPI) => {
        try {
            const response = await TasksService.completeTask(id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось завершить")
        }
    }
)

export const fetchBonuses = createAsyncThunk(
    '/bonuses/:id',
    async (id: string, thunkAPI) => {
        try {
            const response = await BonusService.getAllBonuses(id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось получить награды")
        }
    }
)

export const fetchWeekBonuses = createAsyncThunk(
    '/bonuses-week/:id',
    async (id: string, thunkAPI) => {
        try {
            const response = await BonusService.getWeekBonuses(id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось получить награды")
        }
    }
)


