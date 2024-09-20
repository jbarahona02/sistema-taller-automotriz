import { Moment } from "moment";
import { Item, Paging } from "./interface";
import { MechanicalSpecialtyInterface } from "./mechanicalSpecialty.interface";


export interface MechanicInterface {
    mecCodigo : number;
    mecDpi : string;
    mecNombres : string | null;
    mecApellidos : string | null;
    mecNit: string | null;
    mecTelefono : string | null;
    mecCorreo : string | null;
    mecFechaNacimiento : Moment | string;
    mecSalario : number | null;
    mecFechaContratacion: Moment | string;
    mecAniosExperiencia : number | null;
    emeCodigo : number | null;
    especialidadMecanica: MechanicalSpecialtyInterface | null,
}

export interface MechanicListInterface {
    content: MechanicInterface[],
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}



