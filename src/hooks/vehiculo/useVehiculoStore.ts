import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanVehiculoData,
    setVehiculoResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { VehiculoInterface } from "../../interfaces";

const { VITE_VEHICULO_URI } = getEnvVariables();

export const useVehiculoStore = () => {

    const vehiculoValue = useSelector((state: StoreInterface) => state.vehiculoSlice);
    const dispatch = useDispatch();

    const findById = async (code: string) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_VEHICULO_URI}/${code}`);
            console.log(data);
            dispatch(setVehiculoResult(data));
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

    const saveOrUpdate = async (vehiculo: VehiculoInterface) => {
        try {
            if (vehiculo.vehPlaca) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_VEHICULO_URI}/${vehiculo.vehPlaca}`, vehiculo);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setVehiculoResult(data));
                return;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_VEHICULO_URI}`, vehiculo);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setVehiculoResult(data));
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
        dispatch(cleanVehiculoData());
    }


    return {
        ...vehiculoValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
