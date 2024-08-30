import { MarcaEquipoInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MarcaEquipoInterface = {
    meqCodigo: 0,
    meqNombre: '',
    meqDescripcion: '',
};

export const marcaEquipoSlice = createSlice({
    name: 'marcaEquipoSlice',
    initialState,
    reducers: {
        setMarcaEquipoResult: (state, { payload }: PayloadAction<MarcaEquipoInterface>) => {
            state.meqCodigo = payload.meqCodigo;
            state.meqNombre = payload.meqNombre;
            state.meqDescripcion = payload.meqDescripcion;
        },
        cleanMarcaEquipoData: (state) => {
            state.meqCodigo = 0;
            state.meqNombre = '';
            state.meqDescripcion = '';
        },
    }
});

export const {
    setMarcaEquipoResult,
    cleanMarcaEquipoData
} = marcaEquipoSlice.actions;
