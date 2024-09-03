import {ModuleRoute} from "../../../interfaces";
import { MechanicListPage, MechanicPage, VehicleBrandListPage, VehicleBrandPage } from "../pages";
import { ClienteListPage } from "../pages/cliente/ClienteListPage";
import { ClientePage } from "../pages/cliente/ClientePage";
import { DiasNoDisponiblesListPage } from "../pages/diasNoDisponibles/DiasNoDisponiblesListPage";
import { DiasNoDisponiblesPage } from "../pages/diasNoDisponibles/DiasNoDisponiblesPage";
import { NivelGravedadListPage } from "../pages/nivelGravedad/NivelGravedadListPage";
import { NivelGravedadPage } from "../pages/nivelGravedad/NivelGravedadPage";
import { TallerListPage } from "../pages/taller/TallerListPage";
import { TallerPage } from "../pages/taller/TallerPage";
import { TypeVehicleListPage } from "../pages/typeVehicle/TypeVehicleListPage";
import { TypeVehiclePage } from "../pages/typeVehicle/TypeVehiclePage";
import { VehiculoListPage } from "../pages/vehiculo/VehiculoListPage";
import { VehiculoPage } from "../pages/vehiculo/VehiculoPage";
import { MarcaProductoListaPage } from "../pages";
import { MarcaProductoPage } from "../pages";
import { MarcaEquipoListPage } from "../pages";
import { MarcaEquipoPage } from "../pages";
import { TipoServicioListPage } from "../pages";
import { TipoServicioPage } from "../pages";
import { CitaListPage } from "../pages";
import { CitaPage } from "../pages";

export const routesAdministration: ModuleRoute[] = [
    
    {
        path: 'mechanic-list',
        Component: MechanicListPage
    },
    {
        path: 'mechanic',
        Component: MechanicPage 
    },
    {
        path: 'vehicle-brand-list',
        Component: VehicleBrandListPage 
        
    },
    {
        path: 'vehicle-brand',
        Component: VehicleBrandPage 
    },
    {
        path: 'vehicle-brand/:mveCodigo',
        Component: VehicleBrandPage 
    },
    {
        path: 'type-vehicle-list',
        Component: TypeVehicleListPage 
        
    },
    {
        path: 'type-vehicle',
        Component: TypeVehiclePage 
    },
    {
        path: 'type-vehicle/:tveCodigo',
        Component: TypeVehiclePage 
    },
    {
        path: 'taller-list',
        Component: TallerListPage 
        
    },
    {
        path: 'taller',
        Component: TallerPage 
    },
    {
        path: 'taller/:tllCodigo',
        Component: TallerPage 
    },
    {
        path: 'cliente-list',
        Component: ClienteListPage 
        
    },
    {
        path: 'cliente',
        Component: ClientePage
    },
    {
        path: 'cliente/:cliCodigo',
        Component: ClientePage 
    },
    {
        path: 'dias-no-disponibles-list',
        Component: DiasNoDisponiblesListPage
        
    },
    {
        path: 'dias-no-disponibles',
        Component: DiasNoDisponiblesPage
    },
    {
        path: 'dias-no-disponibles/:dndCodigo',
        Component: DiasNoDisponiblesPage 
    },
    {
        path: 'vehiculo-list',
        Component: VehiculoListPage
        
    },
    {
        path: 'vehiculo',
        Component: VehiculoPage
    },
    {
        path: 'vehiculo/:vehPlaca',
        Component: VehiculoPage 
    },
    {
        path: 'nivel-gravedad-list',
        Component: NivelGravedadListPage
        
    },
    {
        path: 'nivel-gravedad',
        Component: NivelGravedadPage
    },
    {
        path: 'nivel-gravedad/:ngrCodigo',
        Component: NivelGravedadPage 
    },
    {
        path: 'marca-producto-list',
        Component: MarcaProductoListaPage
    },
    {
        path: 'marca-producto',
        Component: MarcaProductoPage
    },
    {
        path: 'marca-producto/:mapCodigo',
        Component: MarcaProductoPage
    },
    {
        path: 'marca-equipo-list',
        Component: MarcaEquipoListPage
    },
    {
        path: 'marca-equipo',
        Component: MarcaEquipoPage
    },
    {
        path: 'marca-equipo/:meqCodigo',
        Component: MarcaEquipoPage
    },
    {
        path: 'tipo-servicio-list',
        Component: TipoServicioListPage
    },
    {
        path: 'tipo-servicio',
        Component: TipoServicioPage
    },
    {
        path: 'tipo-servicio/:tsrCodigo',
        Component: TipoServicioPage
    },
    {
        path: 'cita-list',
        Component: CitaListPage
    },
    {
        path: 'cita',
        Component: CitaPage
    },
    {
        path: 'cita/:ctaCodigo',
        Component: CitaPage
    }
];
