
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HerramientaInterface } from "../../../../interfaces";

const initialState: HerramientaInterface = {
    herCodigo: 0,
    herNombre : "",
    herDescripcion : "",
    herCondicion : 0,
    mheCodigo : 0,
    mecCodigo : 0,
    marcaHerramienta: null,
    mecanico: null
};

export const herramientaSlice = createSlice({
    name: 'herramientaSlice',
    initialState,
    reducers: {
        setHerramientaResult: (state, { payload }: PayloadAction<HerramientaInterface>) => {
            state.herCodigo = payload.herCodigo,
            state.herNombre = payload.herNombre,
            state.herDescripcion = payload.herDescripcion,
            state.herCondicion = payload.herCondicion,
            state.mheCodigo = payload.marcaHerramienta ? payload.marcaHerramienta.mheCodigo : null,
            state.mecCodigo = payload.mecanico ? payload.mecanico.mecCodigo : null
            state.marcaHerramienta = payload.marcaHerramienta,
            state.mecanico = payload.mecanico
        },
        cleanHerramientaData: (state) => {
           state.herCodigo = 0,
           state.herNombre = "",
           state.herDescripcion = "",
           state.herCondicion = 0,
           state.mheCodigo = null,
           state.mecCodigo = null,
           state.marcaHerramienta = null,
           state.mecanico = null
        },
    }
});

export const {
    setHerramientaResult,
    cleanHerramientaData
} = herramientaSlice.actions;
