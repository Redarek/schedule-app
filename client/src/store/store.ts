import {persistReducer, persistStore} from "redux-persist";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import taskSlice from "./reducers/taskSlice";
import authSlice from './reducers/authSlice'
import navbarSlice from "./reducers/navbarSlice";

const rootReducer = combineReducers({
    taskSlice,
    authSlice,
    navbarSlice
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['taskSlice']
};


const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);


export const setupStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            })
    })
}
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
