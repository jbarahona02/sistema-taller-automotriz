

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProveedorInterface } from "../../../../interfaces";

const initialState: ProveedorInterface = {
    prvCodigo: 0,
    prvNombre: '',
    prvNombreContacto: '',
    prvCorreo: '',
    prvTelefono: '',
    prvEstado: true
};

export const proveedorSlice = createSlice({
    name: 'proveedorSlice',
    initialState,
    reducers: {
        setProveedorResult: (state, { payload }: PayloadAction<ProveedorInterface>) => {
            state.prvCodigo = payload.prvCodigo;
            state.prvNombre = payload.prvNombre;
            state.prvNombreContacto = payload.prvNombreContacto;
            state.prvCorreo = payload.prvCorreo;
            state.prvTelefono = payload.prvTelefono;
            state.prvEstado = payload.prvEstado;
        },
        cleanProveedorData: (state) => {
            state.prvCodigo = 0;
            state.prvNombre = '';
            state.prvNombreContacto = '';
            state.prvCorreo = '';
            state.prvTelefono = '';
            state.prvEstado = true;
        },
    }
});

export const {
    setProveedorResult,
    cleanProveedorData
} = proveedorSlice.actions;
