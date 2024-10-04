import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanCitaData,
    setCitaResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { CitaInterface } from "../../interfaces";

const { VITE_CITA_URI } = getEnvVariables();

export const useCitaStore = () => {

    const citaValue = useSelector((state: StoreInterface) => state.citaSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_CITA_URI}/${code}`);
            dispatch(setCitaResult(data));
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

    const saveOrUpdate = async (cita: CitaInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_CITA_URI}/${cita.ctaCodigo}`, cita);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setCitaResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_CITA_URI}`, cita);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setCitaResult(data));
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
        dispatch(cleanCitaData());
    }


    return {
        ...citaValue,
        citaValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
