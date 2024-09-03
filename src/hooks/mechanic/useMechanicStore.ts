import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanMechanicData,
    setMechanicResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { MechanicInterface } from "../../interfaces";

const { VITE_MECHANIC_URI } = getEnvVariables();

export const useMechanicStore = () => {

    const mechanicValue = useSelector((state: StoreInterface) => state.mechanicSlice);
    const dispatch = useDispatch();

    const findById = async (code: string) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_MECHANIC_URI}/${code}`);
            dispatch(setMechanicResult(data));
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

    const saveOrUpdate = async (mechanic: MechanicInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_MECHANIC_URI}/${mechanic.mecCodigo}`, mechanic);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setMechanicResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_MECHANIC_URI}`, mechanic);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setMechanicResult(data));
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
        dispatch(cleanMechanicData());
    }


    return {
        ...mechanicValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
