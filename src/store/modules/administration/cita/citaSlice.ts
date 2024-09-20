import moment from "moment";
import { CitaInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CitaInterface = {
    ctaCodigo: 0,
    ctaFechaHora: '',
    ctaEstado: false,
    ctaDescripcion: '',
    ctaFechaCreacion: '',
    ctaDuracionEstimadaMin: 0,
    ctaConfirmacion: false,
    vehPlaca: null,
    vehiculo: null
};

export const citaSlice = createSlice({
    name: 'citaSlice',
    initialState,
    reducers: {
        setCitaResult: (state, { payload }: PayloadAction<CitaInterface>) => {
            state.ctaCodigo = payload.ctaCodigo;
            state.ctaFechaHora = payload.ctaFechaHora;
            state.ctaEstado = payload.ctaEstado;
            state.ctaDescripcion = payload.ctaDescripcion;
            state.ctaFechaCreacion = payload.ctaFechaCreacion;
            state.ctaDuracionEstimadaMin = payload.ctaDuracionEstimadaMin;
            state.ctaConfirmacion = payload.ctaConfirmacion;
            state.vehPlaca = payload.vehiculo ? payload.vehiculo.vehPlaca: null;
            state.vehiculo = payload.vehiculo;
        },
        cleanCitaData: (state) => {
            state.ctaCodigo = 0;
            state.ctaFechaHora = moment();
            state.ctaEstado = false;
            state.ctaDescripcion = '';
            state.ctaFechaCreacion = moment();
            state.ctaDuracionEstimadaMin = 0;
            state.ctaConfirmacion = false;
            state.vehPlaca = null;
            state.vehiculo = null;
        },
    }
});

export const {
    setCitaResult,
    cleanCitaData
} = citaSlice.actions;
