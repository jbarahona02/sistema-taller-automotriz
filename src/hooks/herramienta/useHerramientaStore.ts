import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanHerramientaData,
    setHerramientaResult
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { HerramientaInterface } from "../../interfaces";

const { VITE_HERRAMIENTA_URI } = getEnvVariables();

export const useHerramientaStore = () => {

    const herramientaValue = useSelector((state: StoreInterface) => state.herramientaSlice);
    const dispatch = useDispatch();

    const findById = async (code: string) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_HERRAMIENTA_URI}/${code}`);
        
            dispatch(setHerramientaResult(data));
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

    const saveOrUpdate = async (herramienta : HerramientaInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_HERRAMIENTA_URI}/${herramienta.herCodigo}`, herramienta);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setHerramientaResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_HERRAMIENTA_URI}`, herramienta);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setHerramientaResult(data));
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
        dispatch(cleanHerramientaData());
    }


    return {
        ...herramientaValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
