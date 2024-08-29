import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanTypeVehicleData,
    setTypeVehicleResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { TypeVehicleInterface } from "../../interfaces";

const { VITE_TYPE_VEHICLE_URI } = getEnvVariables();

export const useTypeVehicleStore = () => {

    const typeVehicleValue = useSelector((state: StoreInterface) => state.typeVehicleSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_TYPE_VEHICLE_URI}/${code}`);
            dispatch(setTypeVehicleResult(data));
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

    const saveOrUpdate = async (typeVehicle: TypeVehicleInterface) => {
        try {
            if (typeVehicle.tveCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_TYPE_VEHICLE_URI}/${typeVehicle.tveCodigo}`, typeVehicle);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setTypeVehicleResult(data));
                return;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_TYPE_VEHICLE_URI}`, typeVehicle);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setTypeVehicleResult(data));
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
        dispatch(cleanTypeVehicleData());
    }


    return {
        ...typeVehicleValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
