export interface TipoServicioInterface {
    tsrCodigo: number;
    tsrNombre: string;
    tsrDescripcion: string;
    tsrEstado: boolean;
}

export interface TipoServicioListInterface {
    content: TipoServicioInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}
