
import {createSlice} from "@reduxjs/toolkit";

export const sidenavSlice = createSlice({
    name: 'sidenav',
    initialState: {
        collapsed: false
    },
    reducers: {
        onChangeStatus: (state) => {
            state.collapsed = !state.collapsed
        }
    }
});

export const { onChangeStatus } = sidenavSlice.actions;
