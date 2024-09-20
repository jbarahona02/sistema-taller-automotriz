import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductoInterface } from "../../../../interfaces";

const initialState: ProductoInterface = {
    proCodigo: 0,
    proNombre: '',
    proDescripcion: '',
    proPrecioCompra: 0,
    proCantidadDisponible: 0,
    proFechaIngreso: '',
    prvCodigo: null,
    mapCodigo: null,
    proveedor: null,
    marcaProducto: null
};

export const productoSlice = createSlice({
    name: 'productoSlice',
    initialState,
    reducers: {
        setProductoResult: (state, { payload }: PayloadAction<ProductoInterface>) => {
            state.proCodigo = payload.proCodigo;
            state.proNombre = payload.proNombre;
            state.proDescripcion = payload.proDescripcion;
            state.proPrecioCompra = payload.proPrecioCompra;
            state.proCantidadDisponible = payload.proCantidadDisponible;
            state.proFechaIngreso = payload.proFechaIngreso;
            state.prvCodigo = payload.proveedor ? payload.proveedor.prvCodigo : null;
            state.mapCodigo = payload.marcaProducto ? payload.marcaProducto.mapCodigo : null;
            state.proveedor = payload.proveedor;
            state.marcaProducto = payload.marcaProducto;
        },
        cleanProductoData: (state) => {
            state.proCodigo = 0;
            state.proNombre = '';
            state.proDescripcion = '';
            state.proPrecioCompra = 0;
            state.proCantidadDisponible = 0;
            state.proFechaIngreso = '';
            state.prvCodigo = null;
            state.mapCodigo = null;
            state.proveedor = null;
            state.marcaProducto = null;
        },
    }
});

export const {
    setProductoResult,
    cleanProductoData
} = productoSlice.actions;
