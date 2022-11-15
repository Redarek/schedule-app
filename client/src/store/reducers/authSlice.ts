import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthResponse} from "../../types/AuthResponse";
import {checkAuth, login, logout} from "./ActionCreators";
import {translit} from "../../utils/transliter";
import {IUser} from "../../types/IUser";
import {IBonuses} from "../../types/IBonus";

interface UserState {
    user: AuthResponse;
    isAuth: boolean;
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    user: {} as AuthResponse,
    isAuth: false,
    isLoading: false,
    error: ''
}
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        editUser: (state, action: PayloadAction<IUser>) => {
            state.user.user = action.payload
        },
        userBonuses: (state, action:PayloadAction<IBonuses>) => {
            state.user.user.allTimeBalance = action.payload.all
            state.user.user.weekBalance = action.payload.week
        }
    },

    extraReducers: {
        //checkAuth
        [checkAuth.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            if (action.payload != undefined) {
                state.user = action.payload
                state.isAuth = true;
                state.user.user.latinName = translit(state.user.user.name)
                state.user.user.balance = 0;
            }
            state.error = '';
            state.isLoading = false;
        },
        [checkAuth.pending.type]: (state) => {
            state.isLoading = true;
        },
        [checkAuth.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        //login
        [login.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.error = '';
            if (action.payload != undefined) {
                state.isAuth = true;
                state.user = action.payload;
                state.user.user.latinName = translit(state.user.user.name)
            }
        },
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
        //logout
        [logout.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false;
            state.error = '';
            state.isAuth = false;
            state.user = action.payload;
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
export const {editUser, userBonuses} = authSlice.actions;
export default authSlice.reducer;
