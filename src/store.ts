import { configureStore } from '@reduxjs/toolkit'
import adminSlice from "./reducers/admin";
import layoutSlice from "./reducers/layout";
import authSlice from "./reducers/auth";


const store = configureStore({
    reducer: {
        adminSlice,
        layoutSlice,
        authSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;