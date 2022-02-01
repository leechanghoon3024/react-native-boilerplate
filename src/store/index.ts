import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer';
import commonReducer from './commonReducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        common: commonReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
