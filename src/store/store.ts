import {configureStore} from "@reduxjs/toolkit";
import {sidenavSlice} from "./ui";
import { ClienteInterface, ClienteListInterface, DiasNoDisponiblesInterface, DiasNoDisponiblesListInterface, HerramientaInterface, HerramientaListInterface, MarcaHerramientaInterface, MarcaHerramientaListInterface, MechanicalSpecialtyInterface, MechanicalSpecialtyListInterface, MechanicInterface, MechanicListInterface, NivelGravedadInterface, NivelGravedadListInterface, TallerInterface, TallerListInterface, TipoPagoInterface, TipoPagoListInterface, TypeVehicleInterface, TypeVehicleListInterface, VehicleBrandInterface, VehicleBrandListInterface, VehiculoInterface, VehiculoListInterface } from "../interfaces";
import { cotizacionListSlice, cotizacionSlice, diasNoDisponiblesListSlice, diasNoDisponiblesSlice, marcaHerramientaListSlice, marcaHerramientaSlice, mechanicalSpecialtyListSlice, mechanicalSpecialtySlice, mechanicListSlice, mechanicSlice, tipoPagoListSlice, tipoPagoSlice, typeVehicleListSlice, typeVehicleSlice, vehicleBrandListSlice, vehicleBrandSlice } from "./modules/administration";
import { tallerListSlice } from "./modules/administration/taller/tallerListSlice";
import { tallerSlice } from "./modules/administration/taller/tallerSlice";
import { clienteListSlice } from "./modules/administration/cliente/clienteListSlice";
import { clienteSlice } from "./modules/administration/cliente/clienteSlice";
import { vehiculoListSlice } from "./modules/administration/vehiculo/vehiculoListSlice";
import { vehiculoSlice } from "./modules/administration/vehiculo/vehiculoSlice";
import { nivelGravedadListSlice } from "./modules/administration/nivelGravedad/nivelGravedadListSlice";
import { nivelGravedadSlice } from "./modules/administration/nivelGravedad/nivelGravedadSlice";
import { herramientaListSlice } from "./modules/administration/herramienta/herramientaListSlice";
import { herramientaSlice } from "./modules/administration/herramienta/herramientaSlice";
import { CotizacionInterface, CotizacionListInterface } from "../interfaces/cotizacion.interface";

export interface StoreInterface {
    mechanicListSlice: MechanicListInterface,
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
    mechanicalSpecialtySlice: MechanicalSpecialtyInterface,
    mechanicalSpecialtyListSlice: MechanicalSpecialtyListInterface,
    marcaHerramientaSlice: MarcaHerramientaInterface,
    marcaHerramientaListSlice: MarcaHerramientaListInterface,
    herramientaListSlice: HerramientaListInterface,
    herramientaSlice: HerramientaInterface,
    cotizacionListSlice: CotizacionListInterface,
    cotizacionSlice: CotizacionInterface,
    tipoPagoListSlice: TipoPagoListInterface,
    tipoPagoSlice: TipoPagoInterface
}

export const store = configureStore({
    reducer: {
        sideNav: sidenavSlice.reducer,
        mechanicListSlice: mechanicListSlice.reducer,
        mechanicSlice: mechanicSlice.reducer,
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
        mechanicalSpecialtyListSlice: mechanicalSpecialtyListSlice.reducer,
        mechanicalSpecialtySlice: mechanicalSpecialtySlice.reducer,
        marcaHerramientaSlice: marcaHerramientaSlice.reducer,
        marcaHerramientaListSlice: marcaHerramientaListSlice.reducer,
        herramientaListSlice: herramientaListSlice.reducer,
        herramientaSlice: herramientaSlice.reducer,
        cotizacionListSlice: cotizacionListSlice.reducer,
        cotizacionSlice: cotizacionSlice.reducer,
        tipoPagoListSlice: tipoPagoListSlice.reducer,
        tipoPagoSlice: tipoPagoSlice.reducer
    }
});

