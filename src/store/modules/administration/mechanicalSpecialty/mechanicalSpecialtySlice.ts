
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MechanicalSpecialtyInterface } from "../../../../interfaces";

const initialState: MechanicalSpecialtyInterface = {
    emeCodigo: 0,
    emeNombre: "",
    emeDescripcion: ""
};

export const mechanicalSpecialtySlice = createSlice({
    name: 'mechanicalSpecialtySlice',
    initialState,
    reducers: {
        setMechanicalSpecialtyResult: (state, { payload }: PayloadAction<MechanicalSpecialtyInterface>) => {
            state.emeCodigo = payload.emeCodigo;
            state.emeNombre = payload.emeNombre;
            state.emeDescripcion = payload.emeDescripcion;
        },
        cleanMechanicalSpecialtyData: (state) => {
            state.emeCodigo = 0;
            state.emeNombre = '';
            state.emeDescripcion = '';
        },
    }
});

export const {
    setMechanicalSpecialtyResult,
    cleanMechanicalSpecialtyData
} = mechanicalSpecialtySlice.actions;