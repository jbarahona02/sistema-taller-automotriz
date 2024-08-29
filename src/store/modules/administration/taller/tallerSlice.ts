import { TallerInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TallerInterface = {
    tllCodigo: 0,
    tllNombre: '',
    tllTelefono: '',
    tllDireccion: '',
    tllCorreo: '',
};

export const tallerSlice = createSlice({
    name: 'tallerSlice',
    initialState,
    reducers: {
        setTallerResult: (state, { payload }: PayloadAction<TallerInterface>) => {
            state.tllCodigo = payload.tllCodigo;
            state.tllNombre = payload.tllNombre;
            state.tllTelefono = payload.tllTelefono;
            state.tllDireccion = payload.tllDireccion;
            state.tllCorreo = payload.tllCorreo;
        },
        cleanTallerData: (state) => {
            state.tllCodigo = 0;
            state.tllNombre = '';
            state.tllTelefono = '';
            state.tllDireccion = '';
            state.tllCorreo = '';
        },
    }
});

export const {
    setTallerResult,
    cleanTallerData
} = tallerSlice.actions;
