import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanTallerData,
    setTallerResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { TallerInterface } from "../../interfaces";

const { VITE_TALLER_URI } = getEnvVariables();

export const useTallerStore = () => {

    const tallerValue = useSelector((state: StoreInterface) => state.tallerSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_TALLER_URI}/${code}`);
            dispatch(setTallerResult(data));
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

    const saveOrUpdate = async (taller: TallerInterface) => {
        try {
            if (taller.tllCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_TALLER_URI}/${taller.tllCodigo}`, taller);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setTallerResult(data));
                return;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_TALLER_URI}`, taller);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setTallerResult(data));
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
        dispatch(cleanTallerData());
    }


    return {
        ...tallerValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
