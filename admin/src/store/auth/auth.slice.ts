import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    user: User | null;
    token: string | null;
};

const initialState: AuthState = {
    user: null,
    token: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User; token: string }>) => {
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));

            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");

            state.user = null;
            state.token = null;
        },
        update: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
        }
    }
});

export const { login, logout, update } = authSlice.actions;

export default authSlice.reducer;
