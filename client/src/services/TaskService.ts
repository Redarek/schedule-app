import $api from '../http';
import {AxiosResponse} from 'axios';
import {ITask, ITasks} from '../types/ITasks';

export default class TasksService {
    static async fetchTasks(): Promise<AxiosResponse<ITasks[]>> {
        return $api.get<ITasks[]>('/tasks')
    }

    static async fetchEmployeeTasks(employeeId: string): Promise<AxiosResponse<ITasks[]>> {
        return $api.get<ITasks[]>(`/tasks/${employeeId}`)
    }

    static async createTask(task: ITask): Promise<AxiosResponse<ITask>> {
        return $api.post<ITask>('/create-task', task)
    }

    static async fetchTaskById(taskId: string): Promise<AxiosResponse<ITask>> {
        return $api.get<ITask>(`/task/${taskId}`)
    }

    static async editTask(taskId: string, task: ITask): Promise<AxiosResponse<ITask>> {
        return $api.put<ITask>(`/task/${taskId}`, task)
    }

    static async deleteTask(taskId: string): Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/task/${taskId}`)
    }

    static async completeTask(taskId: string): Promise<AxiosResponse<string>> {
        return $api.put<string>(`/complete-task/${taskId}`)
    }
}
