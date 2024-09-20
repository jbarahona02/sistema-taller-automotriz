import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicioInterface } from "../../../../interfaces";

const initialState: ServicioInterface = {
    srvCodigo: 0,
    srvNombre: '',
    srvDescripcion: '',
    srvCosto: 0,
    srvCostoRepuestos: 0,
    srvCostoProductos: 0,
    srvEstado: false,
    tsrCodigo: null,
    tipoServicio: null,
};

export const servicioSlice = createSlice({
    name: 'servicioSlice',
    initialState,
    reducers: {
        setServicioResult: (state, { payload }: PayloadAction<ServicioInterface>) => {
            state.srvCodigo = payload.srvCodigo;
            state.srvNombre = payload.srvNombre;
            state.srvDescripcion = payload.srvDescripcion;
            state.srvCosto = payload.srvCosto;
            state.srvCostoRepuestos = payload.srvCostoRepuestos;
            state.srvCostoProductos = payload.srvCostoProductos;
            state.srvEstado = payload.srvEstado;
            state.tsrCodigo = payload.tipoServicio ? payload.tipoServicio.tsrCodigo : null;
            state.tipoServicio = payload.tipoServicio;
        },
        cleanServicioData: (state) => {
            state.srvCodigo = 0;
            state.srvNombre = '';
            state.srvDescripcion = '';
            state.srvCosto = 0;
            state.srvCostoRepuestos = 0;
            state.srvCostoProductos = 0;
            state.srvEstado = false;
            state.tsrCodigo = null;
            state.tipoServicio = null;
        },
    }
});

export const {
    setServicioResult,
    cleanServicioData
} = servicioSlice.actions;
