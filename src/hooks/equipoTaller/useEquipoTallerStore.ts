import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { cleanEquipoTallerData, setEquipoTallerResult } from "../../store/modules/administration";
import { Utilities } from "../../util";
import { EquipoTallerInterface } from "../../interfaces";

const { VITE_EQUIPO_TALLER_URI } = getEnvVariables();

export const useEquipoTallerStore = () => {

    const equipoTallerValue = useSelector((state: StoreInterface) => state.equipoTallerSlice);
    const dispatch = useDispatch();

    const findById = async (code: string) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_EQUIPO_TALLER_URI}/${code}`);
            dispatch(setEquipoTallerResult(data));
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

    const saveOrUpdate = async (equipoTaller: EquipoTallerInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_EQUIPO_TALLER_URI}/${equipoTaller.etaCodigo}`, equipoTaller);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setEquipoTallerResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_EQUIPO_TALLER_URI}`, equipoTaller);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setEquipoTallerResult(data));
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
        dispatch(cleanEquipoTallerData());
    }


    return {
        ...equipoTallerValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
