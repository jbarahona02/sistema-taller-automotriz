import {Utilities} from '../../util';
import {automotiveWorkshopApi} from '../../api';

export interface ApplyPayment {
    pagCodigo?: number;
    pagFecha?: Date;
    pagReferencia?: string;
    pagNumeroAutorizacion?: string;
    pagDocumentoPago?: string;
    pagTotal?: number;
    tpaCodigo?: number;
    ortCodigo?: number;
    tipoPago?: TipoPago;
}

export interface DescribePayment {
    servicios: number;
    productos: number;
    repuestos: number;
    subtotal: number;
    pagosAplicados: number;
    total: number;
}

export interface TipoPago {
    tpaCodigo: number;
    tpaNombre: string;
}



export const pagosStore = () => {

    const describePayment = async (ortCodigo: number): Promise<DescribePayment> => {
        try {
            const {data} = await automotiveWorkshopApi.get<DescribePayment, DescribePayment>(`/payment/describe/${ortCodigo}`);
            return data;
        } catch (e) {
            await Utilities.errorAlarm(e.response.data.response.message);
        }
    }

    const applyPayment = async (applyPayment: ApplyPayment) => {
        try {
            await automotiveWorkshopApi.post(`/payment/apply`, applyPayment);
            await Utilities.successAlarm('Pago aplicado');
        } catch (e) {
            await Utilities.errorAlarm(e.response.data.response.message);
        }
    }

    const historialDePagos = async (ortCodigo: number): Promise<ApplyPayment[]> => {
        try {
            const {data} = await automotiveWorkshopApi.get<DescribePayment, DescribePayment>(`/payment/history`, {params: {ortCodigo}});
            return data;
        } catch (e) {
            await Utilities.errorAlarm(e.response.data.response.message);
        }
    }

    return {
        describePayment,
        applyPayment,
        historialDePagos
    }

}
