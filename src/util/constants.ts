import {SideNavType} from "../interfaces";
import {
    Badge,
    Garage,
    MinorCrash
} from "@mui/icons-material";

export const ADMIN_BASE_PATH = '/admin';

export const NAVBAR_ROUTES: SideNavType = [
    {
        moduleName: 'Catálogos',
        items: [
            {
                to: `${ADMIN_BASE_PATH}/mechanic-list`,
                name: "Mecánicos",
                NavIcon: Badge
            },
            {
                to: `${ADMIN_BASE_PATH}/vehicle-brand-list`,
                name: "Marcas de vehiculos",
                NavIcon: Garage
            },
            {
                to: `${ADMIN_BASE_PATH}/type-vehicle-list`,
                name: "Tipos de vehiculos",
                NavIcon: MinorCrash
            }
        ]
    }
];