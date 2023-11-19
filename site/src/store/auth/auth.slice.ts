import { AuthStoreType, AdminStoreType } from "@/types/store/auth.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthStoreType = {
    user: null,
    token: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: AdminStoreType; token: string }>) => {
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
        update: (state, action: PayloadAction<{ user: AdminStoreType | null; token: string | null }>) => {
            state.user = action.payload.user;
        },
        getUser: (state) => {
            const user = localStorage.getItem("user");

            if (user) {
                state.user = JSON.parse(user);
            }
        }
    }
});

export const { login, logout, update, getUser } = authSlice.actions;

export default authSlice.reducer;
