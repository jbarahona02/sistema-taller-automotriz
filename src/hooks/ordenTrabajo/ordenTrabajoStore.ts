import {Utilities} from '../../util';
import {automotiveWorkshopApi} from '../../api';
import {getEnvVariables} from '../../helpers';
import {Moment} from 'moment';

const {VITE_ORDEN_TRABAJO_URI} = getEnvVariables();

export interface OrdenTrabajoCreate {
    detalleEstadoPrevio: string;
    diasGarantia: number;
    tallCodigo: number;
    ctaCodigo: number;
    ortFechaEntrega: Date;
}

export interface OrdenTrabajoPaging {
    content: ContentOrdenTrabajo[];
    totalElements: number;
    totalPages: number;
    firstPage: boolean;
    lastPage: boolean;
}

export interface ContentOrdenTrabajo {
    ortCodigo: number;
    ortFechaInicio: Date;
    ortEstadoPrevio: string;
    ortFechaEntrega: Date;
    ortDiasGarantia: number;
    ortStatus: string;
    taller: Taller;
    vehiculo: Vehiculo;
    cita: Cita;
    serviciosOrdenTrabajo: ServiciosOrdenTrabajo[];
    desperfectos: Desperfecto[];
    pagos: Pago[];
}

export interface Desperfecto {
    dsorCodigo?: number;
    ortCodigo: number;
    dsorDesperfecto?: string;
    desperfecto?: string;
}


export interface Cita {
    ctaCodigo: number;
    ctaFechaHora: Date;
    ctaEstado: boolean;
    ctaDescripcion: string;
    ctaFechaCreacion: Date;
    ctaDuracionEstimadaMin: number;
    ctaConfirmacion: boolean;
    vehiculo: Vehiculo;
}

export interface Vehiculo {
    vehPlaca: string;
    vehNumeroChasis: string;
    vheModelo: number;
    vheColor: string;
    vehKilometraje: number;
    cliente: Cliente;
    marcaVehiculo: MarcaVehiculo;
    tipoVehiculo: TipoVehiculo;
}

export interface Cliente {
    cliCodigo: number;
    cliDpi: string;
    cliNombres: string;
    cliApellidos: string;
    cliNit: string;
    cliTelefono: string;
    cliCorreo: string;
}

export interface MarcaVehiculo {
    mveCodigo: number;
    mveNombre: string;
}

export interface TipoVehiculo {
    tveCodigo: number;
    tveNombre: string;
    tveDescripcion: string;
}

export interface Pago {
    pagCodigo: number;
    pagFecha: Date;
    pagReferencia: string;
    pagNumeroAutorizacion: string;
    pagDocumentoPago: string;
    pagTotal: number;
    tipoPago: TipoPago;
    ordenTrabajo: string;
}

export interface TipoPago {
    tpaCodigo: number;
    tpaNombre: string;
}

export interface ServiciosOrdenTrabajo {
    sorCodigo: number;
    sorFechaServicio: Date;
    sorDetalleEstadoPrevio: string;
    sorEstadoServicio: string;
    sorFechaEntrega: Date;
    sorDiasGarantia: number;
    servicio: Servicio;
    mecanico: Mecanico;
    productos: ProductoElement[];
    repuestos: RepuestoElement[];
}

export interface ProductoElement {
    proCodigo: number;
    sorCodigo: number;
    cantidad: number;
    fecha: Date;
    proNombre: string;
    proPrecio: number;
}

export interface RepuestoElement {
    repCodigo: number;
    sorCodigo: number;
    cantidad: number;
    fecha: Date;
    repNombre: string;
    repPrecio: number;
}

export interface Mecanico {
    mecCodigo: number;
    mecDpi: string;
    mecNombres: string;
    mecApellidos: string;
    mecNit: string;
    mecTelefono: string;
    mecCorreo: string;
    mecFechaNacimiento: Date;
    mecSalario: number;
    mecFechaContratacion: Date;
    mecAniosExperiencia: number;
    especialidadMecanica: EspecialidadMecanica;
}

export interface EspecialidadMecanica {
    emeCodigo: number;
    emeNombre: string;
    emeDescripcion: string;
}

export interface Servicio {
    srvCodigo: number;
    srvNombre: string;
    srvDescripcion: string;
    srvCosto: number;
    srvCostoRepuestos: number;
    srvCostoProductos: number;
    srvEstado: boolean;
    tipoServicio: TipoServicio;
    serviciosRepuesto: ServiciosRepuesto[];
    servicioProductos: ServicioProducto[];
}

export interface ServicioProducto {
    srpCodigo: number;
    srpCantidad: number;
    srpSubtotal: number;
    servicio: string;
    producto: Producto;
}

export interface Producto {
    proCodigo: number;
    proNombre: string;
    proDescripcion: string;
    proPrecioCompra: number;
    proCantidadDisponible: number;
    proFechaIngreso: Date;
    proveedor: Proveedor;
    marcaProducto: MarcaProducto;
}

export interface MarcaProducto {
    mapCodigo: number;
    mapNombre: string;
}

export interface Proveedor {
    prvCodigo: number;
    prvNombre: string;
    prvNombreContacto: string;
    prvTelefono: string;
    prvCorreo: string;
    prvEstado: boolean;
}

export interface ServiciosRepuesto {
    srrCodigo: number;
    srrCantidad: number;
    srrSubtotal: number;
    servicio: string;
    repuesto: Repuesto;
}

export interface Repuesto {
    repCodigo: number;
    repNombre: string;
    repDescripcion: string;
    repOriginal: boolean;
    repPrecio: number;
    repCantidadDisponible: number;
    proveedor: Proveedor;
    tipoRepuesto: TipoRepuesto;
}

export interface TipoRepuesto {
    trpCodigo: number;
    trpNombre: string;
    trpDescripcion: string;
}

export interface TipoServicio {
    tsrCodigo: number;
    tsrNombre: string;
    tsrDescripcion: string;
    tsrEstado: boolean;
}

export interface Taller {
    tllCodigo: number;
    tllNombre: string;
    tllTelefono: string;
    tllDireccion: string;
    tllCorreo: string;
}


export const ordenTrabajoStore = () => {

    const save = async (body: OrdenTrabajoCreate) => {
        try {
            await automotiveWorkshopApi.post(`${VITE_ORDEN_TRABAJO_URI}`, body);
            await Utilities.successAlarm('Orden de trabajo creada');
        } catch (e) {
            await Utilities.errorAlarm(e.response.data.response.message);
        }
    }

    const findAll = async (startDate: Moment, endDate: Moment): Promise<OrdenTrabajoPaging> => {
        try {
            const {data} = await automotiveWorkshopApi.get<OrdenTrabajoPaging, OrdenTrabajoPaging>(`${VITE_ORDEN_TRABAJO_URI}`, {
                params: {
                    inicioFechaCreacion: startDate.toDate(),
                    finFechaCreacion: endDate.toDate()
                }
            });

            return data;
        } catch (e) {
            await Utilities.errorAlarm(e.response.data.response.message);
        }
    }

    const findById = async (ortCodigo: number): Promise<ContentOrdenTrabajo> => {
        try {
            const {data} = await automotiveWorkshopApi.get<ContentOrdenTrabajo, ContentOrdenTrabajo>(`${VITE_ORDEN_TRABAJO_URI}/${ortCodigo}`);
            return data;
        } catch (e) {
            await Utilities.errorAlarm(e.response.data.response.message);
        }
    }

    const agregarDesperfecto = async (body: Desperfecto) => {
        try {
            delete body.dsorCodigo;
            await automotiveWorkshopApi.post(`${VITE_ORDEN_TRABAJO_URI}/desperfecto`, body);
            await Utilities.successAlarm('Se agrego desperfecto a la orden de trabajo');
        } catch (e) {
            await Utilities.errorAlarm(e.response.data.response.message);
        }
    }


    return {
        save,
        findAll,
        findById,
        agregarDesperfecto
    }

}
