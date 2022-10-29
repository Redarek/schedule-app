//@todo добавить icon в модель пользователя на бэке
export interface IUser {
    email: string;
    id: string;
    isActivated: boolean;
    role: string;
    name: string;
    spec: string;
    balance: number;
    icon: string;
}
