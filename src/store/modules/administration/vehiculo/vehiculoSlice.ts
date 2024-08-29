import { VehiculoInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: VehiculoInterface = {
    vehPlaca: '',
    vehNumeroChasis: '',
    vheModelo: 0,
    vheColor: '',
    vehKilometraje: 0,
    cliCodigo: null,
    mveCodigo: null,
    tveCodigo: null,
    cliente: null,
    marcaVehiculo: null,
    tipoVehiculo: null,
};

export const vehiculoSlice = createSlice({
    name: 'vehiculoSlice',
    initialState,
    reducers: {
        setVehiculoResult: (state, { payload }: PayloadAction<VehiculoInterface>) => {
            state.vehPlaca = payload.vehPlaca;
            state.vehNumeroChasis = payload.vehNumeroChasis;
            state.vheModelo = payload.vheModelo;
            state.vheColor = payload.vheColor;
            state.vehKilometraje = payload.vehKilometraje;
            state.cliCodigo = payload.cliente ? payload.cliente.cliCodigo : null;
            state.mveCodigo = payload.marcaVehiculo ? payload.marcaVehiculo.mveCodigo : null;
            state.tveCodigo = payload.tipoVehiculo ? payload.tipoVehiculo.tveCodigo : null;
            state.cliente = payload.cliente;
            state.marcaVehiculo = payload.marcaVehiculo;
            state.tipoVehiculo = payload.tipoVehiculo;
        },
        cleanVehiculoData: (state) => {
            state.vehPlaca = '';
            state.vehNumeroChasis = '';
            state.vheModelo = 0;
            state.vheColor = '';
            state.vehKilometraje = 0;
            state.cliCodigo = null;
            state.mveCodigo = null;
            state.tveCodigo = null;
            state.cliente = null;
            state.marcaVehiculo = null;
            state.tipoVehiculo = null;
        },
    }
});

export const {
    setVehiculoResult,
    cleanVehiculoData
} = vehiculoSlice.actions;
