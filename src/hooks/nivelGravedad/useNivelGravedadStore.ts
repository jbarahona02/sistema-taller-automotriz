import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanNivelGravedadData,
    setNivelGravedadResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { NivelGravedadInterface } from "../../interfaces";

const { VITE_NIVEL_GRAVEDAD_URI } = getEnvVariables();

export const useNivelGravedadStore = () => {

    const nivelGravedadValue = useSelector((state: StoreInterface) => state.nivelGravedadSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_NIVEL_GRAVEDAD_URI}/${code}`);
            dispatch(setNivelGravedadResult(data));
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

    const saveOrUpdate = async (nivelGravedad: NivelGravedadInterface) => {
        try {
            if (nivelGravedad.ngrCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_NIVEL_GRAVEDAD_URI}/${nivelGravedad.ngrCodigo}`, nivelGravedad);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setNivelGravedadResult(data));
                return;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_NIVEL_GRAVEDAD_URI}`, nivelGravedad);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setNivelGravedadResult(data));
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
        dispatch(cleanNivelGravedadData());
    }


    return {
        ...nivelGravedadValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
