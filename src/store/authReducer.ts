import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userTypes } from '../@types/userTypes';

export interface AuthInitProps {
    refreshToken?: string;
    accessToken?: string;
    appToken?: string;
    userRole: number;
    isLogin: boolean;
    user?: userTypes;
}

const initialState: AuthInitProps = {
    refreshToken: undefined,
    accessToken: undefined,
    appToken: undefined,
    userRole: 1,
    isLogin: false,
    user: undefined,
};
export const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        loginAction: (state) => {
            state.isLogin = true;
        },
        logoutAction: (state) => {
            state.isLogin = false;
        },
        profileSetting: (state, action) => {
            const { user, userRole } = action.payload;
            state.user = { ...user };
            state.userRole = userRole;
        },
        addressChange: (state, action) => {
            const { addressCheck } = action.payload;
            state.user = { ...state.user, addressCheck } as any;
        },
        payoutChange: (state, action) => {
            const { payType } = action.payload;

            state.user = { ...state.user, payType } as any;
        },
        creditChange: (state, action) => {
            const { credit } = action.payload;
            state.user = { ...state.user, credit } as any;
        },
        tokenSetting: (state, action) => {
            const appToken = action.payload;
            state.appToken = appToken;
        },
    },
});

export const { loginAction, logoutAction, profileSetting, addressChange, payoutChange, creditChange, tokenSetting } = authSlice.actions;

export default authSlice.reducer;
