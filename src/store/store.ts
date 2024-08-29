import {configureStore} from "@reduxjs/toolkit";
import {sidenavSlice} from "./ui";
import { ClienteInterface, ClienteListInterface, DiasNoDisponiblesInterface, DiasNoDisponiblesListInterface, MechanicInterface, MechanicSearchBarInterface, NivelGravedadInterface, NivelGravedadListInterface, TallerInterface, TallerListInterface, TypeVehicleInterface, TypeVehicleListInterface, VehicleBrandInterface, VehicleBrandListInterface, VehiculoInterface, VehiculoListInterface } from "../interfaces";
import { diasNoDisponiblesListSlice, diasNoDisponiblesSlice, mechanicListSlice, mechanicSlice, typeVehicleListSlice, typeVehicleSlice, vehicleBrandListSlice, vehicleBrandSlice } from "./modules/administration";
import { tallerListSlice } from "./modules/administration/taller/tallerListSlice";
import { tallerSlice } from "./modules/administration/taller/tallerSlice";
import { clienteListSlice } from "./modules/administration/cliente/clienteListSlice";
import { clienteSlice } from "./modules/administration/cliente/clienteSlice";
import { vehiculoListSlice } from "./modules/administration/vehiculo/vehiculoListSlice";
import { vehiculoSlice } from "./modules/administration/vehiculo/vehiculoSlice";
import { nivelGravedadListSlice } from "./modules/administration/nivelGravedad/nivelGravedadListSlice";
import { nivelGravedadSlice } from "./modules/administration/nivelGravedad/nivelGravedadSlice";

export interface StoreInterface {
    mechanicListSlice: MechanicSearchBarInterface,
    mechanicSlice : MechanicInterface,
    vehicleBrandListSlice: VehicleBrandListInterface,
    vehicleBrandSlice: VehicleBrandInterface,
    typeVehicleListSlice: TypeVehicleListInterface,
    typeVehicleSlice: TypeVehicleInterface,
    tallerListSlice: TallerListInterface,
    tallerSlice: TallerInterface,
    clienteListSlice: ClienteListInterface,
    clienteSlice: ClienteInterface,
    diasNoDisponiblesListSlice: DiasNoDisponiblesListInterface,
    diasNoDisponiblesSlice: DiasNoDisponiblesInterface,
    vehiculoListSlice: VehiculoListInterface,
    vehiculoSlice: VehiculoInterface,
    nivelGravedadListSlice: NivelGravedadListInterface,
    nivelGravedadSlice: NivelGravedadInterface
}

export const store = configureStore({
    reducer: {
        sideNav: sidenavSlice.reducer,
        mechanicList: mechanicListSlice.reducer,
        mechanic: mechanicSlice.reducer,
        vehicleBrandListSlice: vehicleBrandListSlice.reducer,
        vehicleBrandSlice: vehicleBrandSlice.reducer,
        typeVehicleListSlice: typeVehicleListSlice.reducer,
        typeVehicleSlice: typeVehicleSlice.reducer,
        tallerListSlice: tallerListSlice.reducer,
        tallerSlice: tallerSlice.reducer,
        clienteListSlice: clienteListSlice.reducer,
        clienteSlice: clienteSlice.reducer,
        diasNoDisponiblesListSlice: diasNoDisponiblesListSlice.reducer,
        diasNoDisponiblesSlice: diasNoDisponiblesSlice.reducer,
        vehiculoListSlice: vehiculoListSlice.reducer,
        vehiculoSlice: vehiculoSlice.reducer,
        nivelGravedadListSlice: nivelGravedadListSlice.reducer,
        nivelGravedadSlice: nivelGravedadSlice.reducer
    }
});

