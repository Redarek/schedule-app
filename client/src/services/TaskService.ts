import $api from '../http';
import { AxiosResponse } from 'axios';
import { ITasks } from '../types/ITasks';

export default class UserService {
    static fetchTasks(): Promise<AxiosResponse<ITasks[]>> {
        return $api.get<ITasks[]>('/tasks')
    }
}