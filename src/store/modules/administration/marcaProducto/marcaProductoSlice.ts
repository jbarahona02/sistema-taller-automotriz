import { MarcaProductoInterface } from "../../../../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MarcaProductoInterface = {
    mapCodigo: 0,
    mapNombre: '',
};

export const marcaProductoSlice = createSlice({
    name: 'marcaProductoSlice',
    initialState,
    reducers: {
        setMarcaProductoResult: (state, { payload }: PayloadAction<MarcaProductoInterface>) => {
            state.mapCodigo = payload.mapCodigo;
            state.mapNombre = payload.mapNombre;
        },
        cleanMarcaProductoData: (state) => {
            state.mapCodigo = 0;
            state.mapNombre = '';
        },
    }
});

export const {
    setMarcaProductoResult,
    cleanMarcaProductoData
} = marcaProductoSlice.actions;
