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
    Engineering,
    Category,
    BuildCircle,
    Hardware,
    Checklist,
    ShoppingCart,
    PrecisionManufacturing,
    DesignServices,
    Report, Work, Workspaces, WorkHistory
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
            },
            {
                to: `${ADMIN_BASE_PATH}/producto-list`,
                name: "Productos",
                NavIcon: ShoppingCart
            },
            {
                to: `${ADMIN_BASE_PATH}/equipo-taller-list`,
                name: "Equipos de taller",
                NavIcon: PrecisionManufacturing
            },
            /*{
                to: `${ADMIN_BASE_PATH}/usuario-list`,
                name: "Usuarios",
                NavIcon: Person
            },*/
            { 
                to: `${ADMIN_BASE_PATH}/servicio-list`,
                name: "Servicios",
                NavIcon: DesignServices
            }
        ]
    },
    {
        moduleName: 'Operaciones',
        items: [
            {
                to: `${ADMIN_BASE_PATH}/order-create`,
                name: 'Ordenes de trabajo',
                NavIcon: Work
            },
            {
                to: `${ADMIN_BASE_PATH}/query-orders`,
                name: 'Consulta Ordenes de Trabajo',
                NavIcon: WorkHistory
            }
        ]
    },
    {
        moduleName: 'Reportes',
        items: [
            {
                to: `${ADMIN_BASE_PATH}/report/serviciosMasSolicitados/Servicios más solicitados`,
                name: "Reporte servicios más solicitados",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/serviciosMenosSolicitados/Servicios menos solicitados`,
                name: "Reporte servicios menos solicitados",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/repuestosMasCaros/Repuestos más caros`,
                name: "Reporte repuestos más caros",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/repuestosMenosCaros/Repuestos menos caros`,
                name: "Reporte repuestos menos caros",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/marcasMasAtendidas/Marcas más atendidas`,
                name: "Reporte marcas más atendidas",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/clientesMasRecurrentes/Clientes más recurrentes`,
                name: "Reporte clientes más recurrentes",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/mecanicosConMaServicios/Mecanicos con más servicios`,
                name: "Reporte mecanicos con más servicios",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/serviciosPrestadosMasCaros/Servicios prestados mas caros`,
                name: "Reporte servicios prestados mas caros",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/serviciosPrestadosMenosCaros/Servicios prestados menos caros`,
                name: "Reporte servicios prestados menos caros",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/vehiculosMasNuevosReparados/Vehiculos más nuevos reparados`,
                name: "Reporte vehiculos más nuevos reparados",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/vehiculosMenosNuevosReparados/Vehiculos más antiguos reparados`,
                name: "Reporte vehiculos más antiguos reparados",
                NavIcon: Report
            },
            {
                to: `${ADMIN_BASE_PATH}/report/diasConMasMenosCitas/Dias con más y menos citas`,
                name: "Reporte dias con más y menos citas",
                NavIcon: Report
            },
        ]
    }
];


export const reportsKeys = {
    serviciosMasSolicitados: 'serviciosMasSolicitados',
    serviciosMenosSolicitados: 'serviciosMenosSolicitados',
    repuestosMasCaros: 'repuestosMasCaros',
    repuestosMenosCaros: 'repuestosMenosCaros',
    marcasMasAtendidas: 'marcasMasAtendidas',
    clientesMasRecurrentes: 'clientesMasRecurrentes',
    mecanicosConMaServicios: 'mecanicosConMaServicios',
    serviciosPrestadosMasCaros: 'serviciosPrestadosMasCaros',
    serviciosPrestadosMenosCaros: 'serviciosPrestadosMenosCaros',
    vehiculosMasNuevosReparados: 'vehiculosMasNuevosReparados',
    vehiculosMenosNuevosReparados: 'vehiculosMenosNuevosReparados',
    diasConMasMenosCitas: 'diasConMasMenosCitas',
}
