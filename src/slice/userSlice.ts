import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    isAuthenticated: boolean;
    name: string;
    email: string;
    token: string;
    id: string;
}

const initialState: UserState = {
    isAuthenticated: false,
    name: '',
    email: '',
    token: '',
    id: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setAuth: (state) => {
            state.isAuthenticated = true;
        },
        setUser: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        }
    }
});

export const { setEmail, setToken, setAuth, setUser, setId } = userSlice.actions;

export default userSlice.reducer;
