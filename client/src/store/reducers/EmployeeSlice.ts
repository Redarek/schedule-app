import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/IUser";
import {fetchUserById, fetchUsers, updateUser} from "./ActionCreators";
import {translit} from "../../utils/transliter";


interface EmployeeState {
    isLoading: boolean;
    employee: IUser;
    error: string;
}

const initialState: EmployeeState = {
    employee: {} as IUser,
    isLoading: false,
    error: ''
}
const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        editEmployee: (state, action: PayloadAction<IUser>) => {
            state.employee = action.payload
            // state.employee.name = action.payload.name;
            // state.employee.email = action.payload.email;
            // state.employee.spec = action.payload.spec
            // state.employee.latinName = translit(action.payload.name)
        },
    },
    extraReducers: {
        [fetchUserById.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
            state.employee = {
             ...action.payload,
             latinName: translit(action.payload.name),
            }
        },
        [fetchUserById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUserById.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [updateUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
        },
        [updateUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [updateUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})
export const {editEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;
