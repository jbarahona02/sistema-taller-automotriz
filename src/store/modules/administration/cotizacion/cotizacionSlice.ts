
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CotizacionInterface } from "../../../../interfaces/cotizacion.interface";
import moment from "moment";

const initialState: CotizacionInterface = {
    cotCodigo: 0,
    cotFechaCreacion: "",
    cotFechaVencimiento: "",
    cotDescuento: 0,
    cotTotal: 0,
    cotSubtotal: 0,
    cotVigente: true,
    cliCodigo: null,
    cliente: null,
};

export const cotizacionSlice = createSlice({
    name: 'cotizacionSlice',
    initialState,
    reducers: {
        setCotizacionResult: (state, { payload }: PayloadAction<CotizacionInterface>) => {
            state.cotCodigo = payload.cotCodigo;
            state.cotFechaCreacion = payload.cotFechaCreacion,
            state.cotFechaVencimiento = payload.cotFechaVencimiento,
            state.cotDescuento = payload.cotDescuento,
            state.cotSubtotal = payload.cotSubtotal,
            state.cotTotal = payload.cotTotal,
            state.cotVigente = payload.cotVigente,
            state.cliCodigo = payload.cliente ? payload.cliente.cliCodigo : null;
            state.cliente = payload.cliente;
        },
        cleanCotizacionData: (state) => {
            state.cotCodigo = 0;
            state.cotFechaCreacion = moment();
            state.cotFechaVencimiento = moment();
            state.cotDescuento = 0;
            state.cotSubtotal = 0;
            state.cotTotal = 0;
            state.cotVigente = true;
            state.cliCodigo = null;
            state.cliente = null;
        },
    }
});

export const {
    setCotizacionResult,
    cleanCotizacionData
} = cotizacionSlice.actions;
