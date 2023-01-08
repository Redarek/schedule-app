import {AxiosResponse} from "axios";
import $api from "../http";

export default class BonusService {
    static async getAllBonuses(userId: string): Promise<AxiosResponse<string>> {
        return $api.get(`/bonuses/${userId}`)
    }

    static async getWeekBonuses(userId: string): Promise<AxiosResponse<string>> {
        return $api.get(`/bonuses-week/${userId}`)
    }
}
