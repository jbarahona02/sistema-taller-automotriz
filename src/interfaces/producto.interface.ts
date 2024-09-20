import { ProveedorInterface } from "./proveedor.interface";
import { MarcaProductoInterface } from "./marcaProducto.interface";
import { Moment } from "moment";

export interface ProductoInterface {
    proCodigo: number;
    proNombre: string;
    proDescripcion: string;
    proPrecioCompra: number;
    proCantidadDisponible: number;
    proFechaIngreso: Moment | string;
    prvCodigo: number | null;
    mapCodigo: number | null;
    proveedor: ProveedorInterface | null;
    marcaProducto: MarcaProductoInterface | null;
}

export interface ProductoListInterface {
    content: ProductoInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}