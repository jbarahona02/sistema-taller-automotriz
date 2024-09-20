
export interface ProveedorInterface {
    prvCodigo: number;
    prvNombre: string;
    prvNombreContacto: string;
    prvTelefono: string;
    prvCorreo:string;
    prvEstado: boolean;
}

export interface ProveedorListInterface {
    content: ProveedorInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}