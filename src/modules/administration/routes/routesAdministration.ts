import {ModuleRoute} from "../../../interfaces";
import { MechanicListPage, MechanicPage, VehicleBrandListPage, VehicleBrandPage } from "../pages";



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
    }
];
