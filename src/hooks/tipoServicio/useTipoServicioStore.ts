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

    const saveOrUpdate = async (tipoServicio: TipoServicioInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_TIPO_SERVICIO_URI}/${tipoServicio.tsrCodigo}`, tipoServicio);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setTipoServicioResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_TIPO_SERVICIO_URI}`, tipoServicio);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setTipoServicioResult(data));
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
        dispatch(cleanTipoServicioData());
    }


    return {
        ...tipoServicioValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
