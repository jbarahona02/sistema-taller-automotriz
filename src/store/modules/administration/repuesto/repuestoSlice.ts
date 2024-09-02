
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RepuestoInterface } from "../../../../interfaces";

const initialState: RepuestoInterface = {
    repCodigo: 0,
    repNombre: '',
    repDescripcion: '',
    repOriginal: true,
    repPrecio: 0,
    repCantidadDisponible: 0,
    prvCodigo: null,
    trpCodigo: null,
    proveedor: null,
    tipoRepuesto: null
};

export const repuestoSlice = createSlice({
    name: 'repuetosSlice',
    initialState,
    reducers: {
        setRepuestoResult: (state, { payload }: PayloadAction<RepuestoInterface>) => {
            state.repCodigo = payload.repCodigo;
            state.repNombre = payload.repNombre;
            state.repDescripcion = payload.repDescripcion;
            state.repOriginal = payload.repOriginal;
            state.repPrecio = payload.repPrecio;
            state.repCantidadDisponible = payload.repCantidadDisponible;
            state.prvCodigo = payload.proveedor ? payload.proveedor.prvCodigo : null;
            state.trpCodigo = payload.tipoRepuesto ? payload.tipoRepuesto.trpCodigo : null;
            state.proveedor = payload.proveedor;
            state.tipoRepuesto = payload.tipoRepuesto;
        },
        cleanRepuestoData: (state) => {
            state.repCodigo = 0;
            state.repNombre = '';
            state.repDescripcion = '';
            state.repOriginal = true;
            state.repPrecio = 0;
            state.repCantidadDisponible = 0;
            state.prvCodigo = null;
            state.trpCodigo = null;
            state.proveedor = null;
            state.tipoRepuesto = null;
        },
    }
});

export const {
    setRepuestoResult,
    cleanRepuestoData
} = repuestoSlice.actions;
