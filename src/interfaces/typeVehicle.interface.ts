export interface TypeVehicleInterface {
    tveCodigo : number;
    tveNombre : string;
    tveDescripcion : string;
}

export interface TypeVehicleListInterface {
    content: TypeVehicleInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}


