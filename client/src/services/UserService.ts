import $api from '../http';
import {AxiosResponse} from 'axios';
import {IUser} from '../types/IUser';

export default class UserService {
    static fetchEmployees(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }

    static fetchEmployeeById(id: string): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>(`/user/${id}`)
    }

    static updateEmployee(user: IUser, id: string): Promise<AxiosResponse<IUser[]>> {
        return $api.put<IUser[]>(`/user/${id}`, user)
    }

}
