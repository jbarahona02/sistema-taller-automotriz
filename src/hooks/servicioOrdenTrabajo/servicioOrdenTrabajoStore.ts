import {automotiveWorkshopApi} from '../../api';
import {Utilities} from '../../util';
import {ServiciosOrdenTrabajo} from '../ordenTrabajo/ordenTrabajoStore.ts';
import {getEnvVariables} from '../../helpers';
import {toastPlugin, ToastPlugin} from '../../util/toastPlugin.ts';

const { VITE_SERVICIO_ORDEN_TRABAJO_URI } = getEnvVariables();

export const servicioOrdenTrabajoStore = () => {

    const findById = async (sorCodigo: number): Promise<ServiciosOrdenTrabajo> => {
        try {
            const {data} = await automotiveWorkshopApi.get<ServiciosOrdenTrabajo, ServiciosOrdenTrabajo>(`${VITE_SERVICIO_ORDEN_TRABAJO_URI}/${sorCodigo}`);
            return data;
        } catch (e) {
            await Utilities.errorAlarm(e.response.data.response.message);
        }
    }

    const save = async (body) => {
        try {
            await automotiveWorkshopApi.post(`${VITE_SERVICIO_ORDEN_TRABAJO_URI}`, body);
            return true;
        } catch (e) {
            toastPlugin().error(e.response.data.response.message);
            return false;
        }

    }

    const agregarProducto = async (cantidad: number, proCodigo: number, sorCodigo: number) => {
       try {
           await automotiveWorkshopApi.put(`${VITE_SERVICIO_ORDEN_TRABAJO_URI}/agragarProducto/${sorCodigo}/${proCodigo}`, null, {
               params: { cantidad }
           });
           toastPlugin().success('Producto agregado con exito');
       } catch (e) {
           toastPlugin().error(e.response.data.response.message);
       }
    }

    const agregarRepuesto = async (cantidad: number, repCodgo: number, sorCodigo: number) => {
        try {
            await automotiveWorkshopApi.put(`${VITE_SERVICIO_ORDEN_TRABAJO_URI}/agragarRepuesto/${sorCodigo}/${repCodgo}`, null, {
                params: { cantidad }
            });

            toastPlugin().success('Repuesto agregado con exito');
        } catch (e) {
            toastPlugin().error(e.response.data.response.message);
        }
    }

    const terminarServicio = async (sorCodigo: number) => {
        try {
            await automotiveWorkshopApi.put(`${VITE_SERVICIO_ORDEN_TRABAJO_URI}/terminarServicio/${sorCodigo}`);
            toastPlugin().success('Se ha terminado el servicio');
        } catch (e) {
            toastPlugin().error(e.response.data.response.message);
        }
    }

    return {
        findById,
        save,
        agregarProducto,
        agregarRepuesto,
        terminarServicio
    }
}
