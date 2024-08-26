import { useDispatch, useSelector } from "react-redux";
import {getEnvVariables } from "../helpers";
import { StoreInterface } from "../store";
import { useEffect } from "react";
import { automotiveWorkshopApi } from "../api";
import { MechanicInterface } from "../interfaces";
import { cleanMechanicData, setMechanic } from "../store/modules/administration";
import { Utilities } from "../util";

const {VITE_MECHANIC_URI} = getEnvVariables();

export const useMechanicStore = () => {
    
    const mechanicValues = useSelector((state: StoreInterface) => state.mechanicSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_MECHANIC_URI}/${code}`);
            dispatch(setMechanic(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const saveOrUpdate = async (mechanic: MechanicInterface) => {
        try {
           
            if (mechanic.mecCodigo) {
                await automotiveWorkshopApi.put(`${VITE_MECHANIC_URI}`, mechanic);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setMechanic(mechanic));
                return;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_MECHANIC_URI}`, mechanic);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setMechanic(data));
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const cleanForm = () => {
        dispatch(cleanMechanicData());
    }

    return {
        ...mechanicValues,
        mechanicValues,
        findById,
        saveOrUpdate,
        cleanForm
    }
}