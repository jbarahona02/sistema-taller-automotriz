import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EquipoTallerInterface } from "../../../../interfaces";
import moment from "moment";

const initialState: EquipoTallerInterface = {
    etaCodigo: 0,
    etaNombre: '',
    etaDescripcion: '',
    etaModelo: '',
    etaFechaIngreso: '',
    etaEstado: 0,
    mecCodigo: null,
    meqCodigo: null,
    mecanico: null,
    marcaEquipo: null
};

export const equipoTallerSlice = createSlice({
    name: 'equipoTallerSlice',
    initialState,
    reducers: {
        setEquipoTallerResult: (state, { payload }: PayloadAction<EquipoTallerInterface>) => {
            state.etaCodigo = payload.etaCodigo;
            state.etaNombre = payload.etaNombre;
            state.etaDescripcion = payload.etaDescripcion;
            state.etaModelo = payload.etaModelo;
            state.etaFechaIngreso = payload.etaFechaIngreso;
            state.etaEstado = payload.etaEstado;
            state.mecCodigo = payload.mecanico ? payload.mecanico.mecCodigo : null;
            state.meqCodigo = payload.marcaEquipo ? payload.marcaEquipo.meqCodigo : null;
            state.mecanico = payload.mecanico;
            state.marcaEquipo = payload.marcaEquipo;
        },
        cleanEquipoTallerData: (state) => {
            state.etaCodigo = 0;
            state.etaNombre = '';
            state.etaDescripcion = '';
            state.etaModelo = '';
            state.etaFechaIngreso = moment();
            state.etaEstado = 0;
            state.mecCodigo = null;
            state.meqCodigo = null;
            state.mecanico = null;
            state.marcaEquipo = null;
        },
    }
});

export const {
    setEquipoTallerResult,
    cleanEquipoTallerData
} = equipoTallerSlice.actions;
