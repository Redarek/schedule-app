import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Navbar {
    navbarIsVisible: boolean
}

const initialState: Navbar = {
   navbarIsVisible: false
}
const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setNavbarVisible: (state, action: PayloadAction<boolean>) => {
            state.navbarIsVisible = !action.payload
        }
    },

    extraReducers: {}
})
export const {setNavbarVisible} = navbarSlice.actions;
export default navbarSlice.reducer;
