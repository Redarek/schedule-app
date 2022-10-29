import $api from '../http';
import {AxiosResponse} from 'axios';
import {IUser} from '../types/IUser';

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }

    static fetchUserDyId(id: string): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>(`/user/${id}`)
    }

    static updateUser(user: IUser, id: string): Promise<AxiosResponse<IUser[]>> {
        return $api.put<IUser[]>(`/user/${id}`, user)
    }

}
