import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsuarioInterface } from "../../../../interfaces";

const initialState: UsuarioInterface = {
    usrCodigo: 0,
    usrContrasenia: '',
    usrEstado: true,
    usrAdministrador: true,
    mecCodigo: null,
    cliCodigo: null,
    mecanico: null,
    cliente: null
};

export const usuarioSlice = createSlice({
    name: 'usuarioSlice',
    initialState,
    reducers: {
        setUsuarioResult: (state, { payload }: PayloadAction<UsuarioInterface>) => {
            state.usrCodigo = payload.usrCodigo;
            state.usrContrasenia = payload.usrContrasenia;
            state.usrEstado = payload.usrEstado;
            state.usrAdministrador = payload.usrAdministrador;
            state.mecCodigo = payload.mecanico ? payload.mecanico.mecCodigo : null;
            state.cliCodigo = payload.cliente ? payload.cliente.cliCodigo : null;
            state.mecanico = payload.mecanico;
            state.cliente = payload.cliente;
        },
        cleanUsuarioData: (state) => {
            state.usrCodigo = 0;
            state.usrContrasenia = '';
            state.usrEstado = true;
            state.usrAdministrador = true;
            state.mecCodigo = null;
            state.cliCodigo = null;
            state.mecanico = null;
            state.cliente = null;
        },
    }
});

export const {
    setUsuarioResult,
    cleanUsuarioData
} = usuarioSlice.actions;
