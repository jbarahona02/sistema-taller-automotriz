import { ProveedorInterface } from "./proveedor.interface";
import { TipoRepuestoInterface } from "./tipoRepuesto.interface";

export interface RepuestoInterface {
    repCodigo: number;
    repNombre: string;
    repDescripcion: string;
    repOriginal: boolean;
    repPrecio: number;
    repCantidadDisponible: number;
    prvCodigo: number | null;
    trpCodigo: number | null;
    proveedor: ProveedorInterface | null;
    tipoRepuesto: TipoRepuestoInterface | null;
}

export interface RepuestoListInterface {
    content: RepuestoInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}