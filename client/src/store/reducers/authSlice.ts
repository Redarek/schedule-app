import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthResponse} from "../../types/AuthResponse";
import {login, logout} from "./ActionCreators";
import {translit} from "../../utils/transliter";
import {IUser} from "../../types/IUser";

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
            // state.user.user.name = action.payload.name;
            // state.user.user.email = action.payload.email;
            // state.user.user.spec = action.payload.spec
            // state.user.user.latinName = translit(state.user.user.name)
        }
    },

    extraReducers: {
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
export const {editUser} = authSlice.actions;
export default authSlice.reducer;
