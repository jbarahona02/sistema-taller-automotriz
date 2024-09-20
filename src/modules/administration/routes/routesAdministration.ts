import {ModuleRoute} from "../../../interfaces";
import { CotizacionListPage, CotizacionPage, HerramientaListPage, HerramientaPage, MarcaHerramientaListPage, MarcaHerramientaPage, MechanicalSpecialtyListPage, MechanicalSpecialtyPage, MechanicListPage, MechanicPage, ProveedorListPage, ProveedorPage, RepuestoListPage, RepuestoPage, TipoPagoListPage, TipoPagoPage, TipoRepuestoListPage, TipoRepuestoPage, VehicleBrandListPage, VehicleBrandPage } from "../pages";
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
import { MarcaProductoListaPage, MarcaProductoPage } from "../pages";
import { MarcaEquipoListPage, MarcaEquipoPage } from "../pages";
import { TipoServicioListPage, TipoServicioPage } from "../pages";
import { CitaListPage, CitaPage } from "../pages";
import { ProductoListPage, ProductoPage } from "../pages";
import { EquipoTallerListPage, EquipoTallerPage } from "../pages";
import { UsuarioListPage, UsuarioPage } from "../pages";
import { ServicioListPage, ServicioPage } from "../pages";
import {DialogReport} from '../pages/reports/DialogReport.tsx';

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
        path: 'mechanic/:mecCodigo',
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
        path: 'especialidad-mecanica-list',
        Component: MechanicalSpecialtyListPage
    },
    {
        path: 'especialidad-mecanica',
        Component: MechanicalSpecialtyPage
    }, 
    {
        path: 'especialidad-mecanica/:emeCodigo',
        Component: MechanicalSpecialtyPage
    },
    {
        path: 'marca-herramienta',
        Component: MarcaHerramientaPage
    },
    {
        path: 'marca-herramienta/:mheCodigo',
        Component: MarcaHerramientaPage
    },
    {
        path: 'marca-herramienta-list',
        Component: MarcaHerramientaListPage
    },
    {
        path: 'herramienta',
        Component: HerramientaPage
    },
    {
        path: 'herramienta/:herCodigo',
        Component: HerramientaPage
    },
    {
        path: 'herramientas-list',
        Component: HerramientaListPage
    },
    {
        path: 'cotizacion',
        Component: CotizacionPage
    }, 
    {
        path: 'cotizacion/:cotCodigo',
        Component: CotizacionPage
    },
    {
        path: 'cotizacion-list',
        Component: CotizacionListPage
    },
    {
        path: 'tipo-pago-list',
        Component: TipoPagoListPage
    },
    {
        path: 'tipo-pago',
        Component: TipoPagoPage
    },
    {
        path: 'tipo-pago/:tpaCodigo',
        Component: TipoPagoPage
    },
    {
        path: 'tipo-repuesto/',
        Component: TipoRepuestoPage
    },
    {
        path: 'tipo-repuesto/:trpCodigo',
        Component: TipoRepuestoPage
    },
    {
        path: 'tipo-repuesto-list',
        Component: TipoRepuestoListPage
    },
    {
        path: 'proveedor/',
        Component: ProveedorPage
    },
    {
        path: 'proveedor/:prvCodigo',
        Component: ProveedorPage
    },
    {
        path: 'proveedor-list',
        Component: ProveedorListPage
    },
    {
        path: 'repuestos-list',
        Component: RepuestoListPage
    },
    {
        path: 'repuesto/',
        Component: RepuestoPage
    },
    {
        path: 'repuesto/:repCodigo',
        Component: RepuestoPage
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
    },
    {
        path: 'producto-list',
        Component: ProductoListPage
    },
    {
        path: 'producto',
        Component: ProductoPage
    },
    {
        path: 'producto/:proCodigo',
        Component: ProductoPage
    },
    {
        path: 'equipo-taller-list',
        Component: EquipoTallerListPage
    },
    {
        path: 'equipo-taller',
        Component: EquipoTallerPage
    },
    {
        path: 'equipo-taller/:etaCodigo',
        Component: EquipoTallerPage
    },
    {
        path: 'usuario-list',
        Component: UsuarioListPage
    },
    {
        path: 'usuario',
        Component: UsuarioPage
    },
    {
        path: 'usuario/:usrCodigo',
        Component: UsuarioPage
    },
    {
        path: 'servicio-list',
        Component: ServicioListPage
    },
    {
        path: 'servicio',
        Component: ServicioPage
    },
    {
        path: 'servicio/:srvCodigo',
        Component: ServicioPage
    },
    {
        path: 'report/:url/:title',
        Component: DialogReport
    }
];
