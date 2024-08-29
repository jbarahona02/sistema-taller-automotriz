import { TypeVehicleInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TypeVehicleInterface = {
    tveCodigo: 0,
    tveNombre: '',
    tveDescripcion: '',
};

export const typeVehicleSlice = createSlice({
    name: 'typeVehicleSlice',
    initialState,
    reducers: {
        setTypeVehicleResult: (state, { payload }: PayloadAction<TypeVehicleInterface>) => {
            state.tveCodigo = payload.tveCodigo;
            state.tveNombre = payload.tveNombre;
            state.tveDescripcion = payload.tveDescripcion;
        },
        cleanTypeVehicleData: (state) => {
            state.tveCodigo = 0;
            state.tveNombre = '';
            state.tveDescripcion = '';
        },
    }
});

export const {
    setTypeVehicleResult,
    cleanTypeVehicleData
} = typeVehicleSlice.actions;
