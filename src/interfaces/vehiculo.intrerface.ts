import { ClienteInterface } from "./cliente.interface";
import { TypeVehicleInterface } from "./typeVehicle.interface";
import { VehicleBrandInterface } from "./vehicleBrand.interface";

export interface VehiculoInterface {
    vehPlaca : string;
    vehNumeroChasis : string;
    vheModelo : number;
    vheColor : string;
    vehKilometraje : number;
    cliCodigo : number | null;
    mveCodigo : number | null;
    tveCodigo : number | null;
    cliente : ClienteInterface | null;
    marcaVehiculo : VehicleBrandInterface | null;
    tipoVehiculo : TypeVehicleInterface | null;
}

export interface VehiculoListInterface {
    content: VehiculoInterface[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}
