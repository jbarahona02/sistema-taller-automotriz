export interface VehicleBrandInterface {
    mveCodigo : number;
    mveNombre : string;
}

export interface VehicleBrandListInterface {
    content: VehicleBrandInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}


