export interface NivelGravedadInterface {
    ngrCodigo : number;
    ngrNombre : string;
    ngrDetalle : string;
    ngrEstado : boolean;
}

export interface NivelGravedadListInterface {
    content: NivelGravedadInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}


