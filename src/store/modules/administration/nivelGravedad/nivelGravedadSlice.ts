import { NivelGravedadInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NivelGravedadInterface = {
    ngrCodigo: 0,
    ngrNombre: '',
    ngrDetalle: '',
    ngrEstado: false
};

export const nivelGravedadSlice = createSlice({
    name: 'nivelGravedadSlice',
    initialState,
    reducers: {
        setNivelGravedadResult: (state, { payload }: PayloadAction<NivelGravedadInterface>) => {
            state.ngrCodigo = payload.ngrCodigo;
            state.ngrNombre = payload.ngrNombre;
            state.ngrDetalle = payload.ngrDetalle;
            state.ngrEstado = payload.ngrEstado;
        },
        cleanNivelGravedadData: (state) => {
            state.ngrCodigo = 0;
            state.ngrNombre = '';
            state.ngrDetalle = '';
            state.ngrEstado = false;
        },
    }
});

export const {
    setNivelGravedadResult,
    cleanNivelGravedadData
} = nivelGravedadSlice.actions;
