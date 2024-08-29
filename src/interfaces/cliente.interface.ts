export interface ClienteInterface {
    cliCodigo : number;
    cliDpi : string;
    cliNombres : string;
    cliApellidos : string;
    cliNit : string;
    cliTelefono : string;
    cliCorreo : string;
}

export interface ClienteListInterface {
    content: ClienteInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}


