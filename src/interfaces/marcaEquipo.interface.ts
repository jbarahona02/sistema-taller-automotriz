export interface MarcaEquipoInterface {
    meqCodigo: number;
    meqNombre: string;
    meqDescripcion: string;
}

export interface MarcaEquipoListInterface {
    content: MarcaEquipoInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}