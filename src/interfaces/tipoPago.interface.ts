
export interface TipoPagoInterface {
    tpaCodigo: number;
    tpaNombre: string;
}

export interface TipoPagoListInterface {
    content: TipoPagoInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}