import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { setServicioPageResult } from "../../store/modules/administration";
import { Utilities } from "../../util";
import {ProductoInterface, RepuestoInterface} from '../../interfaces';

const { VITE_SERVICIO_URI, VITE_SERVICIO_PRODUCTO_URI, VITE_SERVICIO_REPUESTO_URI } = getEnvVariables();

export const useServicioListStore = () => {

    const servicioListValues = useSelector((state: StoreInterface) => state.servicioListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async (nombreODescripcion?:string) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_SERVICIO_URI}`,{
                params: {
                    search: nombreODescripcion,
                    sort: 'srvCodigo,asc'
                }
              }
            );
            dispatch(setServicioPageResult(data));
        } catch (e) {
            let errorMessage: string;
            if (e instanceof Error) {
                errorMessage = e.message;
            } else {
                errorMessage = String(e);
            }
            await Utilities.errorAlarm(errorMessage);
        }
    };

    const remove = async (code: string) => {
        try {
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (!result) {
                return;
            }
            await automotiveWorkshopApi.delete(`${VITE_SERVICIO_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll();
        } catch (e) {
            let errorMessage: string;
            if (e instanceof Error) {
                errorMessage = e.message;
            } else {
                errorMessage = String(e);
            }
            await Utilities.errorAlarm(errorMessage);
        }
    };

    const productosPorServicio = async (srvCodigo: number): Promise<ProductoInterface[]> => {
        const { data } = await automotiveWorkshopApi.get<ProductoInterface[], ProductoInterface[]>(`${VITE_SERVICIO_PRODUCTO_URI}/productos/${srvCodigo}`);
        return data;
    }

    const repuestosPorServicio = async (srvCodigo: number): Promise<RepuestoInterface[]> => {
        const { data } = await automotiveWorkshopApi.get<RepuestoInterface[], RepuestoInterface[]>(`${VITE_SERVICIO_REPUESTO_URI}/repuestos/${srvCodigo}`);
        return data;
    }

    return {
        ...servicioListValues,
        findAll,
        remove,
        productosPorServicio,
        repuestosPorServicio
    }
};
