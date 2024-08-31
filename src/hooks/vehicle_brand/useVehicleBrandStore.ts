import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanVehicleBrandData,
    setVehicleBrandResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { VehicleBrandInterface } from "../../interfaces";

const { VITE_VEHICLE_BRAND_URI } = getEnvVariables();

export const useVehicleBrandStore = () => {

    const vehicleBrandValue = useSelector((state: StoreInterface) => state.vehicleBrandSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_VEHICLE_BRAND_URI}/${code}`);
            dispatch(setVehicleBrandResult(data));
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

    const saveOrUpdate = async (vehicleBrand: VehicleBrandInterface): Promise<boolean>  => {
        try {
            if (vehicleBrand.mveCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_VEHICLE_BRAND_URI}/${vehicleBrand.mveCodigo}`, vehicleBrand);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setVehicleBrandResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_VEHICLE_BRAND_URI}`, vehicleBrand);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setVehicleBrandResult(data));
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
        dispatch(cleanVehicleBrandData());
    }


    return {
        ...vehicleBrandValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
