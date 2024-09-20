import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanCotizacionData,
    setCotizacionResult
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { CotizacionInterface } from "../../interfaces/cotizacion.interface";

const { VITE_COTIZACION_URI } = getEnvVariables();

export const useCotizacionStore = () => {

    const cotizacionValue = useSelector((state: StoreInterface) => state.cotizacionSlice);
    const dispatch = useDispatch();

    const findById = async (code: string) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_COTIZACION_URI}/${code}`);
           
            dispatch(setCotizacionResult(data));
        } catch (e) {
            let errorMessage: string;
            if (e instanceof Error) {
                errorMessage = e.message;
            } else {
                errorMessage = String(e);
            }
            await Utilities.errorAlarm(errorMessage);
        }
    }

    const saveOrUpdate = async (cotizacion: CotizacionInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_COTIZACION_URI}/${cotizacion.cotCodigo}`, cotizacion);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setCotizacionResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_COTIZACION_URI}`, cotizacion);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setCotizacionResult(data));
            return true;
        } catch (e) {
            let errorMessage: string;
            if (e instanceof Error) {
                errorMessage = e.message;
            } else {
                errorMessage = String(e);
            }
            await Utilities.errorAlarm(errorMessage);
            return false;
        }
    }

    const cleanForm = () => {
        dispatch(cleanCotizacionData());
    }


    return {
        ...cotizacionValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
