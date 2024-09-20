import { TipoServicioInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TipoServicioInterface = {
    tsrCodigo: 0,
    tsrNombre: '',
    tsrDescripcion: '',
    tsrEstado: false,
};

export const tipoServicioSlice = createSlice({
    name: 'tipoServicio',
    initialState,
    reducers: {
        setTipoServicioResult: (state, { payload }: PayloadAction<TipoServicioInterface>) => {
            state.tsrCodigo = payload.tsrCodigo;
            state.tsrNombre = payload.tsrNombre;
            state.tsrDescripcion = payload.tsrDescripcion;
            state.tsrEstado = payload.tsrEstado;
        },
        cleanTipoServicioData: (state) => {
            state.tsrCodigo = 0;
            state.tsrNombre = '';
            state.tsrDescripcion = '';
            state.tsrEstado = false;
        },
    }
});

export const {
    setTipoServicioResult,
    cleanTipoServicioData
} = tipoServicioSlice.actions;
