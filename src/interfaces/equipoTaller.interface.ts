import { MechanicInterface } from "./mechanic.interfce";
import { MarcaEquipoInterface } from "./marcaEquipo.interface";
import { Moment } from "moment";

export interface EquipoTallerInterface {
    etaCodigo: number;
    etaNombre: string;
    etaDescripcion: string;
    etaModelo: string;
    etaFechaIngreso: Moment | string;
    etaEstado: number;
    mecCodigo: number | null;
    meqCodigo: number | null;
    mecanico: MechanicInterface | null;
    marcaEquipo: MarcaEquipoInterface | null;
}

export interface EquipoTallerListInterface {
    content: EquipoTallerInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}