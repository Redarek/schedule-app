import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IList} from "../../types/INavbar";

interface Navbar {
    openListsTitle: IList[];
    navbarIsVisible: boolean;
    navbarActiveItem: string;
}

const initialState: Navbar = {
    openListsTitle: [] as IList[],
    navbarIsVisible: false,
    navbarActiveItem: '',
}
const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setNavbarVisible: (state, action: PayloadAction<boolean>) => {
            state.navbarIsVisible = !action.payload
        },
        setNavbarActiveItem: (state, action: PayloadAction<string>) => {
            state.navbarActiveItem = action.payload
        },
        setNavbarOpenListsTitle: (state, action: PayloadAction<IList>) => {
            if (!state.openListsTitle) state.openListsTitle = initialState.openListsTitle;
            const ind = state.openListsTitle.findIndex(obj => obj.listTitle === action.payload.listTitle)
            if (ind === -1) {
                state.openListsTitle = [...state.openListsTitle, action.payload]
            } else {
                state.openListsTitle.splice(ind, 1)
            }
        },
    },

    extraReducers: {}
})
export const {setNavbarVisible, setNavbarActiveItem, setNavbarOpenListsTitle} = navbarSlice.actions;
export default navbarSlice.reducer;
