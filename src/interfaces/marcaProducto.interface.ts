export interface MarcaProductoInterface {
    mapCodigo: number;
    mapNombre: String;
}

export interface MarcaProductoListaInterface {
    content: MarcaProductoInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}