import {AuthResponse} from "../../types/AuthResponse";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/IUser";
import {fetchUsers} from "./ActionCreators";

interface EmployeesState {
    employees: IUser[];
    isLoading: boolean;
    error: string;
}

const initialState: EmployeesState = {
    employees: [],
    isLoading: false,
    error: ''
}
const employeesSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.isLoading = false;
            state.error = '';
            state.employees = action.payload;
        },
        [fetchUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})
export const {} = employeesSlice.actions;
export default employeesSlice.reducer;
