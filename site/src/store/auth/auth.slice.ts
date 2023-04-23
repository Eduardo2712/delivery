import { User } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    user: User | null;
};

const initialState: AuthState = {
    user: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ user: User }>) => {
            localStorage.setItem("user", JSON.stringify(action.payload));

            state.user = action.payload.user;
        },
        logout: (state) => {
            localStorage.removeItem("user");

            state.user = null;
        },
        setUser: (state, action: PayloadAction<{ user: User }>) => {
            state.user = action.payload.user;
        }
    }
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
