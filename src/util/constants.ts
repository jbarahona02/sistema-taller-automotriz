import {SideNavType} from "../interfaces";
import {
    Badge,
    Garage,
    MinorCrash,
    HomeRepairService,
    Group,
    CalendarMonth,
    DirectionsCar
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
            },
            {
                to: `${ADMIN_BASE_PATH}/taller-list`,
                name: "Talleres",
                NavIcon: HomeRepairService
            },
            {
                to: `${ADMIN_BASE_PATH}/cliente-list`,
                name: "Clientes",
                NavIcon: Group
            },
            {
                to: `${ADMIN_BASE_PATH}/dias-no-disponibles-list`,
                name: "Dias no disponibles",
                NavIcon: CalendarMonth
            },
            {
                to: `${ADMIN_BASE_PATH}/vehiculo-list`,
                name: "Vehiculos",
                NavIcon: DirectionsCar
            }
        ]
    }
];
