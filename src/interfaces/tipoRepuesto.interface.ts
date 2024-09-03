
export interface TipoRepuestoInterface {
    trpCodigo: number;
    trpNombre: string;
    trpDescripcion: string;
}

export interface TipoRepuestoListInterface {
    content: TipoRepuestoInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}