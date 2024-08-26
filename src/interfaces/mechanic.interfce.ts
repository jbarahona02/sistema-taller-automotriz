import { Moment } from "moment";
import { Item, Paging } from "./interface";


export interface MechanicInterface {
    mecCodigo : number | null;
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
    mecCodigoEspecialidad : number | null;
    estado : boolean;
}

export interface MechanicSearchBarInterface {
    mecDpi : string;
    mecNombres : string | null;
    mecApellidos : string | null;
    mecSalario : number | null;
    mechanics : MechanicInterface[];
    page: Paging<MechanicInterface> | null;
    items: Item[];
    params: {
        search: string;
        page: number;
    }
}



