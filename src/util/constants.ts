import {SideNavType} from "../interfaces";
import {
    Badge,
    Garage,
    MinorCrash,
    HomeRepairService,
    Group,
    CalendarMonth,
    DirectionsCar,
    Warning,
    Category,
    BuildCircle,
    Hardware,
    Checklist
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
            },
            {
                to: `${ADMIN_BASE_PATH}/nivel-gravedad-list`,
                name: "Niveles de gravedad",
                NavIcon: Warning
            },
            {
                to: `${ADMIN_BASE_PATH}/marca-producto-list`,
                name: "Marcas de productos",
                NavIcon: Category
            },
            {
                to: `${ADMIN_BASE_PATH}/marca-equipo-list`,
                name: "Marcas de equipos",
                NavIcon: BuildCircle
            },
            {
                to: `${ADMIN_BASE_PATH}/tipo-servicio-list`,
                name: "Tipos de servicios",
                NavIcon: Hardware
            },
            {
                to: `${ADMIN_BASE_PATH}/cita-list`,
                name: "Citas",
                NavIcon: Checklist
            }
        ]
    }
];
