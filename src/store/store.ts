import {configureStore} from "@reduxjs/toolkit";
import {sidenavSlice} from "./ui";
import { ClienteInterface, ClienteListInterface, DiasNoDisponiblesInterface, DiasNoDisponiblesListInterface, MechanicInterface, MechanicSearchBarInterface, NivelGravedadInterface, NivelGravedadListInterface, TallerInterface, TallerListInterface, TypeVehicleInterface, TypeVehicleListInterface, VehicleBrandInterface, VehicleBrandListInterface, VehiculoInterface, VehiculoListInterface, MarcaProductoInterface, MarcaProductoListaInterface, MarcaEquipoListInterface, MarcaEquipoInterface, TipoServicioListInterface, TipoServicioInterface, CitaListInterface, CitaInterface } from "../interfaces";
import { diasNoDisponiblesListSlice, diasNoDisponiblesSlice, mechanicListSlice, mechanicSlice, typeVehicleListSlice, typeVehicleSlice, vehicleBrandListSlice, vehicleBrandSlice, marcaProductoSlice, marcaProductoListaSlice } from "./modules/administration";
import { tallerListSlice } from "./modules/administration/taller/tallerListSlice";
import { tallerSlice } from "./modules/administration/taller/tallerSlice";
import { clienteListSlice } from "./modules/administration/cliente/clienteListSlice";
import { clienteSlice } from "./modules/administration/cliente/clienteSlice";
import { vehiculoListSlice } from "./modules/administration/vehiculo/vehiculoListSlice";
import { vehiculoSlice } from "./modules/administration/vehiculo/vehiculoSlice";
import { nivelGravedadListSlice } from "./modules/administration/nivelGravedad/nivelGravedadListSlice";
import { nivelGravedadSlice } from "./modules/administration/nivelGravedad/nivelGravedadSlice";
import { marcaEquipoListSlice } from "./modules/administration";
import { marcaEquipoSlice } from "./modules/administration";
import { tipoServicioListSlice } from "./modules/administration";
import { tipoServicioSlice } from "./modules/administration";
import { citaListSlice } from "./modules/administration";
import { citaSlice } from "./modules/administration";

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
    nivelGravedadSlice: NivelGravedadInterface,
    marcaProductoListaSlice: MarcaProductoListaInterface,
    marcaProductoSlice: MarcaProductoInterface,
    marcaEquipoListSlice: MarcaEquipoListInterface,
    marcaEquipoSlice: MarcaEquipoInterface,
    tipoServicioListSlice: TipoServicioListInterface,
    tipoServicioSlice: TipoServicioInterface,
    citaListSlice: CitaListInterface,
    citaSlice: CitaInterface
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
        nivelGravedadSlice: nivelGravedadSlice.reducer,
        marcaProductoListaSlice: marcaProductoListaSlice.reducer,
        marcaProductoSlice: marcaProductoSlice.reducer,
        marcaEquipoListSlice: marcaEquipoListSlice.reducer,
        marcaEquipoSlice: marcaEquipoSlice.reducer,
        tipoServicioListSlice: tipoServicioListSlice.reducer,
        tipoServicioSlice: tipoServicioSlice.reducer,
        citaListSlice: citaListSlice.reducer,
        citaSlice: citaSlice.reducer
    }
});

