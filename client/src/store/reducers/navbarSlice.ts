import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Navbar {
    navbarIsVisible: boolean;
    navbarActiveItem: string;
    openListTitle: string;
}

const initialState: Navbar = {
    navbarIsVisible: false,
    navbarActiveItem: '',
    openListTitle: '',
}
const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setNavbarVisible: (state, action: PayloadAction<boolean>) => {
            state.navbarIsVisible = !action.payload
        },
        setNavbarActiveItem:
            (state, action: PayloadAction<string>) => {
                state.navbarActiveItem = action.payload
            },
        setNavbarOpenListTitle:
            (state, action: PayloadAction<string>) => {
                state.openListTitle = action.payload
            },
    },

    extraReducers: {}
})
export const {setNavbarVisible, setNavbarActiveItem, setNavbarOpenListTitle} = navbarSlice.actions;
export default navbarSlice.reducer;
