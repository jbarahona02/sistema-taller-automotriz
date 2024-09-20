import { Moment } from "moment";
import { VehiculoInterface } from "./vehiculo.intrerface";

export interface CitaInterface {
    ctaCodigo: number;
    ctaFechaHora: Moment | string;
    ctaEstado: boolean;
    ctaDescripcion: string;
    ctaFechaCreacion: Moment | string;
    ctaDuracionEstimadaMin: number;
    ctaConfirmacion: boolean;
    vehPlaca: string | null;
    vehiculo: VehiculoInterface | null;
}

export interface CitaListInterface {
    content: CitaInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}
