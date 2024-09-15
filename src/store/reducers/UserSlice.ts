import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface UserState{
    id: string | null;
    login: string | null;
    password: string | null;
    name: string | null;
    role: string | null;
    last_visit_date: string | null;
}

const initialState: UserState = {
    id: null,
    login: null,
    password: null,
    name: null,
    role: null,
    last_visit_date: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.name = action.payload.name
            state.id = action.payload.id
            state.login = action.payload.login
            state.last_visit_date = action.payload.last_visit_date
            state.password = action.payload.password
            state.role = action.payload.role
        }
    }
})

export default userSlice.reducer;