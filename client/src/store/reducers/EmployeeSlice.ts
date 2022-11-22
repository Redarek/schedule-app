import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUser} from "../../types/IUser";
import {fetchEmployeeById, fetchEmployees, updateEmployee} from "./ActionCreators";
import {translit} from "../../utils/transliter";
import {IBonuses} from "../../types/IBonus";


interface EmployeeState {
    isLoading: boolean;
    employee: IUser;
    employees: IUser[];
    error: string;
}

const initialState: EmployeeState = {
    employee: {} as IUser,
    employees: [] as IUser[],
    isLoading: false,
    error: ''
}
const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        changeEmployee: (state, action: PayloadAction<IUser>) => {
            const ind = state.employees.findIndex(emp => emp._id === action.payload._id)
            state.employees[ind] = action.payload
            state.employee = state.employees[ind]

        },
        // employeeBonuses: (state, action:PayloadAction<IBonuses>)=> {
        //     state.employee.allTimeBalance = action.payload.all
        //     state.employee.weekBalance = action.payload.week
        // }
    },
    extraReducers: {
        [fetchEmployees.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
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
        [fetchEmployees.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchEmployees.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },

        [fetchEmployeeById.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            console.log(action.payload)
            state.error = '';
            state.employee = {
                ...action.payload,
                latinName: translit(action.payload.name),
            }
            state.isLoading = false;
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
export const {changeEmployee} = employeeSlice.actions;
export default employeeSlice.reducer;
