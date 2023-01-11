//@todo добавить icon в модель пользователя на бэке

import {Roles} from "./Roles";

export interface IUser {
    email: string;
    _id: string;
    isActivated: boolean;
    roles: Roles[];
    name: string;
    spec: string;
    balance: number;
    icon: string;
    latinName: string;
    allTimeBalance: number
    weekBalance: number;
}
