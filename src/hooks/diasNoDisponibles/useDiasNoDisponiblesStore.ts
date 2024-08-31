import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanDiasNoDisponiblesData,
    setDiasNoDisponiblesResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { DiasNoDisponiblesInterface } from "../../interfaces";

const { VITE_DIAS_NO_DISPONIBLES_URI } = getEnvVariables();

export const useDiasNoDisponiblesStore = () => {

    const diasNoDisponiblesValue = useSelector((state: StoreInterface) => state.diasNoDisponiblesSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_DIAS_NO_DISPONIBLES_URI}/${code}`);
            dispatch(setDiasNoDisponiblesResult(data));
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

    const saveOrUpdate = async (diasNoDisponibles: DiasNoDisponiblesInterface): Promise<boolean> => {
        try {
            if (diasNoDisponibles.dndCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_DIAS_NO_DISPONIBLES_URI}/${diasNoDisponibles.dndCodigo}`, diasNoDisponibles);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setDiasNoDisponiblesResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_DIAS_NO_DISPONIBLES_URI}`, diasNoDisponibles);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setDiasNoDisponiblesResult(data));
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
        dispatch(cleanDiasNoDisponiblesData());
    }


    return {
        ...diasNoDisponiblesValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
