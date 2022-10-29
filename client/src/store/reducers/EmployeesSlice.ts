import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/IUser";
import {fetchUsers} from "./ActionCreators";
import {translit} from "../../utils/transliter";

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
            let users = action.payload
            for (let i = 0; i < users.length; i++) {
                state.employees[i] = {
                    ...users[i],
                    latinName: translit(users[i].name)
                }
            }
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
