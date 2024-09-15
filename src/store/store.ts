import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReduser from "./reducers/UserSlice"

const rootReduser = combineReducers({
    userReduser
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReduser
    })
}

export type RootState = ReturnType<typeof rootReduser>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']