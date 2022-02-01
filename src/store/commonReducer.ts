import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommonProps {
    isLoading: boolean;
}

const initialState: CommonProps = {
    isLoading: false,
};
export const commonSlice = createSlice({
    name: 'commonReducer',
    initialState,
    reducers: {
        loadingAction: (state) => {
            state.isLoading = !state.isLoading;
        },
    },
});

export const { loadingAction } = commonSlice.actions;

export default commonSlice.reducer;
