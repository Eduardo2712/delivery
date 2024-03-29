import { AuthStoreType, UserStoreType } from "@/types/store/auth.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthStoreType = {
    user: null,
    token: null,
    refresh_token: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: UserStoreType; token: string; refresh_token: string }>) => {
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", JSON.stringify(action.payload.token));
            localStorage.setItem("refresh_token", JSON.stringify(action.payload.refresh_token));

            state.user = action.payload.user;
            state.token = action.payload.token;
            state.refresh_token = action.payload.refresh_token;
        },
        logout: (state) => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("refresh_token");

            state.user = null;
            state.token = null;
            state.refresh_token = null;
        },
        update: (state, action: PayloadAction<{ user: UserStoreType | null; token: string | null }>) => {
            state.user = action.payload.user;
        },
        get: (state) => {
            const user = localStorage.getItem("user");
            const token = localStorage.getItem("token");
            const refresh_token = localStorage.getItem("refresh_token");

            if (user) {
                state.user = JSON.parse(user);
                state.token = token;
                state.refresh_token = refresh_token;
            }
        }
    }
});

export const { login, logout, update, get } = authSlice.actions;

export default authSlice.reducer;
