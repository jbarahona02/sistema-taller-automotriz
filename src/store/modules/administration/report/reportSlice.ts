import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState = {
    openDialog: false,
}


export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setOpenDialog: (state, {payload}: PayloadAction<boolean>) => {
            state.openDialog = payload;
        }
    }
});

export const {
    setOpenDialog
} = reportSlice.actions;
