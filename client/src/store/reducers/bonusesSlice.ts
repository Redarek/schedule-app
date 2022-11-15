import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchBonuses, fetchWeekBonuses} from "./ActionCreators";
import {IBonus} from "../../types/IBonus";

interface EmployeeState {
    isLoading: boolean;
    error: string;
    employeeAllBonuses: number;
    employeeWeekBonuses: number;
    userAllBonuses: number;
    userWeekBonuses: number;
    userId: string;
}

const initialState: EmployeeState = {
    employeeAllBonuses: 0,
    employeeWeekBonuses: 0,
    userAllBonuses: 0,
    userWeekBonuses: 0,
    userId: '',
    isLoading: false,
    error: ''
}
const bonusesSlice = createSlice({
    name: 'bonuses',
    initialState,
    reducers: {
        changeUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload
        }
    },
    extraReducers: {
        [fetchBonuses.fulfilled.type]: (state, action: PayloadAction<IBonus[]>) => {
            let number = 0
            if (action.payload.length > 0) {
                for (let i = 0; i < action.payload.length; i++) {
                    number += action.payload[i].amount
                }
            }
            state.employeeAllBonuses = number;
            state.error = '';
            if (action.payload.length > 0) {
                if (state.userId === action.payload[0].user) {
                    state.userAllBonuses = number
                }
            }
            state.isLoading = false;
        },
        [fetchBonuses.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchBonuses.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        },
        [fetchWeekBonuses.fulfilled.type]: (state, action: PayloadAction<IBonus[]>) => {
            let number = 0
            if (action.payload.length > 0) {
                for (let i = 0; i < action.payload.length; i++) {
                    number += action.payload[i].amount
                }
            }
            state.employeeWeekBonuses = number
            state.error = '';
            if (action.payload.length > 0) {
                if (state.userId === action.payload[0].user) {
                    state.userWeekBonuses = number
                }
            }
            state.isLoading = false;
        },
        [fetchWeekBonuses.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchWeekBonuses.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        }
    }
})
export const {changeUserId} = bonusesSlice.actions;
export default bonusesSlice.reducer;
