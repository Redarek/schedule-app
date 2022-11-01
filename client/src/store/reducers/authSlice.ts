import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthResponse} from "../../types/AuthResponse";
import {checkAuth, fetchUser, login, logout} from "./ActionCreators";
import {translit} from "../../utils/transliter";
import {IUser} from "../../types/IUser";

interface UserState {
    user: AuthResponse;
    isAuth: boolean;
    isChecked: boolean
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    user: {} as AuthResponse,
    isAuth: false,
    isLoading: false,
    isChecked: false,
    error: ''
}
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        editUser: (state, action: PayloadAction<IUser>) => {
            state.user.user = action.payload
        }
    },

    extraReducers: {
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = '';
            if (action.payload != undefined) {
                state.isAuth = true
                state.user.user = action.payload;
                state.user.user.latinName = translit(action.payload.name)
            }
        },
        [fetchUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [checkAuth.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.error = '';
            if (action.payload != undefined) {
                state.isChecked = true;
            }
        },
        [checkAuth.pending.type]: (state) => {
            state.isLoading = true;
        },
        [checkAuth.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [login.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.error = '';
            if (action.payload != undefined) {
                localStorage.setItem('userId', `${action.payload.user._id}`)
                state.isAuth = true;
                // console.log(action.payload)
                state.user = action.payload;
                state.user.user.latinName = translit(state.user.user.name)
                console.log(state.user.user)
            }
        },
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        [logout.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.error = '';
            state.isAuth = false;
            state.isChecked = false;
            state.user = action.payload;
            localStorage.removeItem('userId')
        },
        [logout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [logout.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})
export const {editUser} = authSlice.actions;
export default authSlice.reducer;
