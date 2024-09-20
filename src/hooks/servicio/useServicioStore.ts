import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { cleanServicioData, setServicioResult } from "../../store/modules/administration";
import { Utilities } from "../../util";
import { ServicioInterface } from "../../interfaces";

const { VITE_SERVICIO_URI } = getEnvVariables();

export const useServicioStore = () => {

    const servicioValue = useSelector((state: StoreInterface) => state.servicioSlice);
    const dispatch = useDispatch();

    const findById = async (code: string) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_SERVICIO_URI}/${code}`);
            dispatch(setServicioResult(data));
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

    const saveOrUpdate = async (servicio: ServicioInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_SERVICIO_URI}/${servicio.srvCodigo}`, servicio);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setServicioResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_SERVICIO_URI}`, servicio);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setServicioResult(data));
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
        dispatch(cleanServicioData());
    }

    return {
        ...servicioValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
