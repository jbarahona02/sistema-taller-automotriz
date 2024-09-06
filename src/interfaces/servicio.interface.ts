import { TipoServicioInterface } from "./tipoServicio.interface";

export interface ServicioInterface {
    srvCodigo: number;
    srvNombre: string;
    srvDescripcion: string;
    srvCosto: number;
    srvCostoRepuestos: number;
    srvCostoProductos: number;
    srvEstado: boolean;
    tsrCodigo: number | null;
    tipoServicio: TipoServicioInterface | null;
    // TODO: Agregar referencias a los array de ServicioRepuesto y ServicioProducto
}

export interface ServicioListInterface {
    content: ServicioInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}