import {ModuleRoute} from "../../../interfaces";
import { MechanicListPage, MechanicPage } from "../pages";



export const routesAdministration: ModuleRoute[] = [
    
    {
        path: 'mechanic-list',
        Component: MechanicListPage
    },
    {
        path: 'mechanic',
        Component: MechanicPage 
    }
];
