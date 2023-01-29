import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {INavbarObject} from "../../components/UI/Navbar/types/INavbar";

interface Navbar {
    navbarIsVisible: boolean;
    openItems: INavbarObject[];
}

const initialState: Navbar = {
    navbarIsVisible: false,
    openItems: []
}
const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setNavbarVisible: (state) => {
            state.navbarIsVisible = !state.navbarIsVisible
        },
        disableNavbarObject: (state, action: PayloadAction<INavbarObject>) => {
            if (-1 !== state.openItems.findIndex(searchItem => searchItem.title === action.payload.title)) {
                state.openItems = state.openItems.filter((item) => item.title !== action.payload.title)
            }
        },

        setNavbarObjectIsActive: (state, action: PayloadAction<INavbarObject>) => {
            if (state.openItems) {
                if (-1 !== state.openItems.findIndex(searchItem => searchItem.title === action.payload.title)) {
                    state.openItems = state.openItems.filter((item) => item.title !== action.payload.title)
                } else {
                    const ind = state.openItems.findIndex(searchItem => searchItem.type === action.payload.type)
                    if (ind !== -1 && state.openItems[ind].type === 'item') {
                        state.openItems.splice(ind, 1)
                        state.openItems = [...state.openItems, action.payload]
                    } else {
                        state.openItems = [...state.openItems, action.payload]
                    }
                }
            } else {
                state.openItems = [];
                state.openItems = [...state.openItems, action.payload]
            }
        },
        // setNavbarObjectIsActiveLink: (state, action: PayloadAction<INavbarObject>) => {
        //     if (state.openItems) {
        //         state.openItems = state.openItems.filter(item => item.link === null)
        //         state.openItems = [...state.openItems, action.payload]
        //     } else {
        //         state.openItems = []
        //         state.openItems = [...state.openItems, action.payload]
        //     }
        // }
    },

    extraReducers: {}
})
export const {
    setNavbarVisible,
    setNavbarObjectIsActive,
    disableNavbarObject
} = navbarSlice.actions;
export default navbarSlice.reducer;
