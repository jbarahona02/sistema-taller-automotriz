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
    Construction,
    Build,
    AttachMoney,
    RequestQuote,
    FindReplace,
    Inventory,
    Engineering
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
                name: "Marcas de vehículos",
                NavIcon: Garage
            },
            {
                to: `${ADMIN_BASE_PATH}/type-vehicle-list`,
                name: "Tipos de vehículos",
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
                name: "Días no disponibles",
                NavIcon: CalendarMonth
            },
            {
                to: `${ADMIN_BASE_PATH}/vehiculo-list`,
                name: "Vehículos",
                NavIcon: DirectionsCar
            },
            {
                to: `${ADMIN_BASE_PATH}/nivel-gravedad-list`,
                name: "Niveles de gravedad",
                NavIcon: Warning
            },
            {
                to: `${ADMIN_BASE_PATH}/especialidad-mecanica-list`,
                name: "Especialidad mecánica",
                NavIcon: Construction
            },
            {
                to: `${ADMIN_BASE_PATH}/marca-herramienta-list`,
                name: "Marcas de herramientas",
                NavIcon: Build
            },
            {
                to: `${ADMIN_BASE_PATH}/herramientas-list`,
                name: "Herramientas",
                NavIcon: HomeRepairService
            },
            {
                to: `${ADMIN_BASE_PATH}/cotizacion-list`,
                name: "Cotizaciones",
                NavIcon:  AttachMoney
            },
            {
                to: `${ADMIN_BASE_PATH}/tipo-pago-list`,
                name: "Tipos de pago",
                NavIcon:  RequestQuote
            },
            {
                to: `${ADMIN_BASE_PATH}/tipo-repuesto-list`,
                name: "Tipos de repuesto",
                NavIcon:  FindReplace
            },
            {
                to: `${ADMIN_BASE_PATH}/proveedor-list`,
                name: "Proveedores",
                NavIcon:  Inventory
            },
            {
                to: `${ADMIN_BASE_PATH}/repuestos-list`,
                name: "Repuestos",
                NavIcon:  Engineering
            },
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
