import {ModuleRoute} from "../../../interfaces";
import { MechanicListPage, MechanicPage, VehicleBrandListPage, VehicleBrandPage } from "../pages";
import { ClienteListPage } from "../pages/cliente/ClienteListPage";
import { ClientePage } from "../pages/cliente/ClientePage";
import { TallerListPage } from "../pages/taller/TallerListPage";
import { TallerPage } from "../pages/taller/TallerPage";
import { TypeVehicleListPage } from "../pages/typeVehicle/TypeVehicleListPage";
import { TypeVehiclePage } from "../pages/typeVehicle/TypeVehiclePage";



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
    }
];
