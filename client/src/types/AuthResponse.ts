import { IUser } from "./IUser";

export interface AuthResponse {
    accessToken: string;
    refreshTooken: string;
    user: IUser
}