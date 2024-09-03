import { MarcaHerramientaInterface } from "./marcaHerramienta.interface";
import { MechanicInterface } from "./mechanic.interfce";

export  interface HerramientaInterface {
    herCodigo : number | null;
    herNombre : string;
    herDescripcion: string 
    herCondicion: number;
    mheCodigo: number | null;
    mecCodigo: number | null;
    mecanico: MechanicInterface | null;
    marcaHerramienta: MarcaHerramientaInterface | null;
}

export interface HerramientaListInterface {
    content: HerramientaInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}
