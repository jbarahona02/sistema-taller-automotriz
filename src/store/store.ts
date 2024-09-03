import {configureStore} from "@reduxjs/toolkit";
import {sidenavSlice} from "./ui";
import { CitaInterface, CitaListInterface, ClienteInterface, ClienteListInterface, DiasNoDisponiblesInterface, DiasNoDisponiblesListInterface, HerramientaInterface, HerramientaListInterface, MarcaEquipoInterface, MarcaEquipoListInterface, MarcaHerramientaInterface, MarcaHerramientaListInterface, MarcaProductoInterface, MarcaProductoListaInterface, MechanicalSpecialtyInterface, MechanicalSpecialtyListInterface, MechanicInterface, MechanicListInterface, NivelGravedadInterface, NivelGravedadListInterface, ProductoInterface, ProductoListInterface, ProveedorInterface, ProveedorListInterface, RepuestoInterface, RepuestoListInterface, TallerInterface, TallerListInterface, TipoPagoInterface, TipoPagoListInterface, TipoRepuestoInterface, TipoRepuestoListInterface, TipoServicioInterface, TipoServicioListInterface, TypeVehicleInterface, TypeVehicleListInterface, VehicleBrandInterface, VehicleBrandListInterface, VehiculoInterface, VehiculoListInterface } from "../interfaces";
import { cotizacionListSlice, cotizacionSlice, diasNoDisponiblesListSlice, diasNoDisponiblesSlice, marcaHerramientaListSlice, marcaHerramientaSlice, marcaProductoListaSlice, marcaProductoSlice, mechanicalSpecialtyListSlice, mechanicalSpecialtySlice, mechanicListSlice, mechanicSlice, proveedorListSlice, proveedorSlice, repuestoListSlice, repuestoSlice, tipoPagoListSlice, tipoPagoSlice, tipoRepuestoListSlice, tipoRepuestoSlice, typeVehicleListSlice, typeVehicleSlice, vehicleBrandListSlice, vehicleBrandSlice } from "./modules/administration";
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
import { marcaEquipoListSlice } from "./modules/administration";
import { marcaEquipoSlice } from "./modules/administration";
import { tipoServicioListSlice } from "./modules/administration";
import { tipoServicioSlice } from "./modules/administration";
import { citaListSlice } from "./modules/administration";
import { citaSlice } from "./modules/administration";
import { productoListSlice } from "./modules/administration";
import { productoSlice } from "./modules/administration";

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
    tipoPagoSlice: TipoPagoInterface,
    tipoRepuestoListSlice: TipoRepuestoListInterface,
    tipoRepuestoSlice: TipoRepuestoInterface,
    proveedorListSlice: ProveedorListInterface,
    proveedorSlice: ProveedorInterface,
    repuestoListSlice: RepuestoListInterface,
    repuetosSlice: RepuestoInterface,
    marcaProductoListaSlice: MarcaProductoListaInterface,
    marcaProductoSlice: MarcaProductoInterface,
    marcaEquipoListSlice: MarcaEquipoListInterface,
    marcaEquipoSlice: MarcaEquipoInterface,
    tipoServicioListSlice: TipoServicioListInterface,
    tipoServicioSlice: TipoServicioInterface,
    citaListSlice: CitaListInterface,
    citaSlice: CitaInterface,
    productoListSlice: ProductoListInterface,
    productoSlice: ProductoInterface
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
        tipoPagoSlice: tipoPagoSlice.reducer,
        tipoRepuestoListSlice: tipoRepuestoListSlice.reducer,
        tipoRepuestoSlice: tipoRepuestoSlice.reducer,
        proveedorListSlice: proveedorListSlice.reducer,
        proveedorSlice: proveedorSlice.reducer,
        repuestoListSlice: repuestoListSlice.reducer,
        repuetosSlice: repuestoSlice.reducer,
        marcaProductoListaSlice: marcaProductoListaSlice.reducer,
        marcaProductoSlice: marcaProductoSlice.reducer,
        marcaEquipoListSlice: marcaEquipoListSlice.reducer,
        marcaEquipoSlice: marcaEquipoSlice.reducer,
        tipoServicioListSlice: tipoServicioListSlice.reducer,
        tipoServicioSlice: tipoServicioSlice.reducer,
        citaListSlice: citaListSlice.reducer,
        citaSlice: citaSlice.reducer,
        productoListSlice: productoListSlice.reducer,
        productoSlice: productoSlice.reducer
    }
});

