import { Moment } from "moment";
import { TallerInterface } from "./taller.interface";

export interface DiasNoDisponiblesInterface {
    dndCodigo : number;
    dndMotivo : string;
    dndFecha : Moment | string;
    tllCodigo : number | null;
    taller : TallerInterface | null;
}

export interface DiasNoDisponiblesListInterface {
    content: DiasNoDisponiblesInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}
