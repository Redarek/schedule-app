//@todo добавить icon в модель пользователя на бэке

import {Roles} from "./Roles";
import {Categories} from "./Categories";

export interface IUser {
    email: string;
    _id: string;
    isActivated: boolean;
    roles: Roles[];
    name: string;
    // categories: Categories[];
    balance: number;
    icon: string;
    latinName: string;
    allTimeBalance: number
    weekBalance: number;
}
