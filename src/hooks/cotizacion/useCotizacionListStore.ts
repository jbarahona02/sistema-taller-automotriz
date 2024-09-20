import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setCotizacionPageResult
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import moment from "moment";

const { VITE_COTIZACION_URI } = getEnvVariables();

export const useCotizacionListStore = () => {

    const cotizacionListValues = useSelector((state: StoreInterface) => state.cotizacionListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async (inicioFechaCreacion?:string,finFechaCreacion?:string,inicioFechaVencimiento?:string,
        finFechaVencimiento?:string
    ) => {
        let params : any = {};

        if (inicioFechaCreacion) {
            params.inicioFechaCreacion = moment(inicioFechaCreacion).utc().format("YYYY-MM-DD 00:00:00");
        }
        
        if (finFechaCreacion) {
            params.finFechaCreacion = moment(finFechaCreacion).utc().format("YYYY-MM-DD 23:59:59");;
        }
        
        if (inicioFechaVencimiento) {
            params.inicioFechaVencimiento = moment(inicioFechaVencimiento).utc().format("YYYY-MM-DD 00:00:00");
        }
        
        if (finFechaVencimiento) {
            params.finFechaVencimiento = moment(finFechaVencimiento).utc().format("YYYY-MM-DD 23:59:59");;
        }
        
        // Añadir siempre el parámetro de sort
        params.sort = 'cotCodigo,asc';
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_COTIZACION_URI}`, {
                params: params
              });
           
            dispatch(setCotizacionPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_COTIZACION_URI}/${code}`);
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

    return {
        ...cotizacionListValues,
        findAll,
        remove
    }
};
