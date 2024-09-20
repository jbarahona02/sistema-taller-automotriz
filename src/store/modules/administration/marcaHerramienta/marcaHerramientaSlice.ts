

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarcaHerramientaInterface } from "../../../../interfaces/marcaHerramienta.interface";

const initialState: MarcaHerramientaInterface = {
   mheCodigo: 0,
   mheNombre: ""
};

export const marcaHerramientaSlice = createSlice({
    name: 'marcaHerramientaSlice',
    initialState,
    reducers: {
        setMarcaHerramientaResult: (state, { payload }: PayloadAction<MarcaHerramientaInterface>) => {
            state.mheCodigo = payload.mheCodigo;
            state.mheNombre = payload.mheNombre;
        },
        cleanMarcaHerramientaData: (state) => {
            state.mheCodigo = 0;
            state.mheNombre = '';
        },
    }
});

export const {
    setMarcaHerramientaResult,
    cleanMarcaHerramientaData
} = marcaHerramientaSlice.actions;
