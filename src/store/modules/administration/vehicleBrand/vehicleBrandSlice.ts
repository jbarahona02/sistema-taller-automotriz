import { VehicleBrandInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: VehicleBrandInterface = {
    mveCodigo: 0,
    mveNombre: '',
};

export const vehicleBrandSlice = createSlice({
    name: 'vehicleBrandSlice',
    initialState,
    reducers: {
        setVehicleBrandResult: (state, { payload }: PayloadAction<VehicleBrandInterface>) => {
            state.mveCodigo = payload.mveCodigo;
            state.mveNombre = payload.mveNombre;
        },
        cleanVehicleBrandData: (state) => {
            state.mveCodigo = 0;
            state.mveNombre = '';
        },
    }
});

export const {
    setVehicleBrandResult,
    cleanVehicleBrandData
} = vehicleBrandSlice.actions;
