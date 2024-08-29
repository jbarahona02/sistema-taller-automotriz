import { ClienteInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ClienteInterface = {
    cliCodigo: 0,
    cliDpi: '',
    cliNombres: '',
    cliApellidos: '',
    cliNit: '',
    cliTelefono: '',
    cliCorreo: '',
};

export const clienteSlice = createSlice({
    name: 'clienteSlice',
    initialState,
    reducers: {
        setClienteResult: (state, { payload }: PayloadAction<ClienteInterface>) => {
            state.cliCodigo = payload.cliCodigo;
            state.cliDpi = payload.cliDpi;
            state.cliNombres = payload.cliNombres;
            state.cliApellidos = payload.cliApellidos;
            state.cliNit = payload.cliNit;
            state.cliTelefono = payload.cliTelefono;
            state.cliCorreo = payload.cliCorreo;
        },
        cleanClienteData: (state) => {
            state.cliCodigo = 0;
            state.cliDpi = '';
            state.cliNombres = '';
            state.cliApellidos = '';
            state.cliNit = '';
            state.cliTelefono = '';
            state.cliCorreo = '';
        },
    }
});

export const {
    setClienteResult,
    cleanClienteData
} = clienteSlice.actions;
