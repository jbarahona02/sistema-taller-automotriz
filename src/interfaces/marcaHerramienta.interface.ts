
export interface MarcaHerramientaInterface {
    mheCodigo :number;
    mheNombre :string;
}

export interface MarcaHerramientaListInterface {
    content: MarcaHerramientaInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}