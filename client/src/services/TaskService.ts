import $api from '../http';
import {AxiosResponse} from 'axios';
import {ITask, ITasks} from '../types/ITasks';

export default class TasksService {
    static async fetchTasks(): Promise<AxiosResponse<ITasks[]>> {
        return $api.get<ITasks[]>('/tasks')
    }

    static async createTask(task: ITask): Promise<AxiosResponse<ITask>> {
        return $api.post<ITask>('/create-task', task)
    }
}
