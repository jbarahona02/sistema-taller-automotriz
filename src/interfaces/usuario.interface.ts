import { MechanicInterface } from "./mechanic.interfce";
import { ClienteInterface } from "./cliente.interface";

export interface UsuarioInterface {
    usrCodigo: number;
    usrContrasenia: string;
    usrEstado: boolean;
    usrAdministrador: boolean;
    mecCodigo: number | null;
    cliCodigo: number | null;
    mecanico: MechanicInterface | null;
    cliente: ClienteInterface | null;
}

export interface UsuarioListInterface {
    content: UsuarioInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}