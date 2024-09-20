

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TipoPagoInterface } from "../../../../interfaces";

const initialState: TipoPagoInterface = {
    tpaCodigo: 0,
    tpaNombre: '',
};

export const tipoPagoSlice = createSlice({
    name: 'tipoPagoSlice',
    initialState,
    reducers: {
        setTipoPagoResult: (state, { payload }: PayloadAction<TipoPagoInterface>) => {
            state.tpaCodigo = payload.tpaCodigo;
            state.tpaNombre = payload.tpaNombre;
        },
        cleanTipoPagoData: (state) => {
            state.tpaCodigo = 0;
            state.tpaNombre = '';
        },
    }
});

export const {
    setTipoPagoResult,
    cleanTipoPagoData
} = tipoPagoSlice.actions;
