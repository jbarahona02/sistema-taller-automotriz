export interface MechanicalSpecialtyInterface {
    emeCodigo: number;
    emeNombre: string;
    emeDescripcion: string;
}

export interface MechanicalSpecialtyListInterface {
    content: MechanicalSpecialtyInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}