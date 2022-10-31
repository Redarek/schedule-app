import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/IUser";
import {fetchEmployeeById, updateEmployee} from "./ActionCreators";
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
        [fetchEmployeeById.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
            state.employee = {
             ...action.payload,
             latinName: translit(action.payload.name),
            }
        },
        [fetchEmployeeById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchEmployeeById.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [updateEmployee.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
        },
        [updateEmployee.pending.type]: (state) => {
            state.isLoading = true;
        },
        [updateEmployee.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        }
    }
})
export const {editEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;
