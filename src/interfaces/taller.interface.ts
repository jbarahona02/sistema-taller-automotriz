export interface TallerInterface {
    tllCodigo : number;
    tllNombre : string;
    tllTelefono : string;
    tllDireccion : string;
    tllCorreo : string;
}

export interface TallerListInterface {
    content: TallerInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}


