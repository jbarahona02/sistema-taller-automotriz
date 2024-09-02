
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TipoRepuestoInterface } from "../../../../interfaces";

const initialState: TipoRepuestoInterface = {
    trpCodigo: 0,
    trpNombre: "",
    trpDescripcion: ""
};

export const tipoRepuestoSlice = createSlice({
    name: 'tipoRepuestoSlice',
    initialState,
    reducers: {
        setTipoRepuestoResult: (state, { payload }: PayloadAction<TipoRepuestoInterface>) => {
            state.trpCodigo = payload.trpCodigo;
            state.trpNombre = payload.trpNombre;
            state.trpDescripcion = payload.trpDescripcion;
        },
        cleanTipoRespuestoData: (state) => {
            state.trpCodigo = 0;
            state.trpNombre = '';
            state.trpDescripcion = '';
        },
    }
});

export const {
    setTipoRepuestoResult,
    cleanTipoRespuestoData
} = tipoRepuestoSlice.actions;