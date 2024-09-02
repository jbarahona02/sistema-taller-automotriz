import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MechanicListInterface } from "../../../../interfaces";
import { Utilities } from "../../../../util";

const initialState : MechanicListInterface= {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true
}

export const mechanicListSlice = createSlice({
    name: "mechanicListSlice",
    initialState,
    reducers: {
        setMechanicPageResult:(state, {payload}: PayloadAction<MechanicListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalElements = payload.totalPages;
        }
    }
});

export const {
    setMechanicPageResult,
} = mechanicListSlice.actions;