import { DiasNoDisponiblesInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DiasNoDisponiblesInterface = {
    dndCodigo: 0,
    dndMotivo: '',
    dndFecha: '',
    tllCodigo: null,
    taller: null,
};

export const diasNoDisponiblesSlice = createSlice({
    name: 'diasNoDisponiblesSlice',
    initialState,
    reducers: {
        setDiasNoDisponiblesResult: (state, { payload }: PayloadAction<DiasNoDisponiblesInterface>) => {
            state.dndCodigo = payload.dndCodigo;
            state.dndMotivo = payload.dndMotivo;
            state.dndFecha = payload.dndFecha;
            state.tllCodigo = payload.taller ? payload.taller.tllCodigo : null;
            state.taller = payload.taller;
        },
        cleanDiasNoDisponiblesData: (state) => {
            state.dndCodigo = 0;
            state.dndMotivo = '';
            state.dndFecha = '';
            state.tllCodigo = null;
            state.taller = null;
        },
    }
});

export const {
    setDiasNoDisponiblesResult,
    cleanDiasNoDisponiblesData
} = diasNoDisponiblesSlice.actions;
