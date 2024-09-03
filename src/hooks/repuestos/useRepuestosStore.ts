import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { cleanRepuestoData, setRepuestoResult } from "../../store/modules/administration";
import { Utilities } from "../../util";
import { RepuestoInterface } from "../../interfaces";

const { VITE_REPUESTO_URI } = getEnvVariables();

export const useRepuestoStore = () => {

    const repuestoValue = useSelector((state: StoreInterface) => state.repuetosSlice);
    const dispatch = useDispatch();

    const findById = async (code: string) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_REPUESTO_URI}/${code}`);
            dispatch(setRepuestoResult(data));
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

    const saveOrUpdate = async (repuesto : RepuestoInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_REPUESTO_URI}/${repuesto.repCodigo}`, repuesto);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setRepuestoResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_REPUESTO_URI}`, repuesto);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setRepuestoResult(data));
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
        dispatch(cleanRepuestoData());
    }


    return {
        ...repuestoValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
