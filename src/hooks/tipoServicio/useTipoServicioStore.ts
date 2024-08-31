import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanTipoServicioData,
    setTipoServicioResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { TipoServicioInterface } from "../../interfaces";

const { VITE_TIPO_SERVICIO_URI } = getEnvVariables();

export const useTipoServicioStore = () => {

    const tipoServicioValue = useSelector((state: StoreInterface) => state.tipoServicioSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_TIPO_SERVICIO_URI}/${code}`);
            dispatch(setTipoServicioResult(data));
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

    const saveOrUpdate = async (tipoServicio: TipoServicioInterface) => {
        try {
            if (tipoServicio.tsrCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_TIPO_SERVICIO_URI}/${tipoServicio.tsrCodigo}`, tipoServicio);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setTipoServicioResult(data));
                return;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_TIPO_SERVICIO_URI}`, tipoServicio);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setTipoServicioResult(data));
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

    const cleanForm = () => {
        dispatch(cleanTipoServicioData());
    }


    return {
        ...tipoServicioValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
