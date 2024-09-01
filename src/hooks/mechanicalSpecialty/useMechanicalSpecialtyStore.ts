import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";

import { Utilities } from "../../util";
import { MechanicalSpecialtyInterface } from "../../interfaces";
import { cleanMechanicalSpecialtyData, setMechanicalSpecialtyResult } from "../../store/modules/administration";

const { VITE_MECHANICAL_SPECIALTY_URI } = getEnvVariables();

export const useMechanicalSpecialtyStore = () => {

    const mechanicalSpecialtyValues = useSelector((state: StoreInterface) => state.mechanicalSpecialtySlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_MECHANICAL_SPECIALTY_URI}/${code}`);
            dispatch(setMechanicalSpecialtyResult(data));
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

    const saveOrUpdate = async (mechanicalSpecialty: MechanicalSpecialtyInterface) : Promise<boolean> => {
        try {
            if (mechanicalSpecialty.emeCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_MECHANICAL_SPECIALTY_URI}/${mechanicalSpecialty.emeCodigo}`,  mechanicalSpecialty);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setMechanicalSpecialtyResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_MECHANICAL_SPECIALTY_URI}`, mechanicalSpecialty);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setMechanicalSpecialtyResult(data));
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
        dispatch(cleanMechanicalSpecialtyData());
    }


    return {
        ...mechanicalSpecialtyValues,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
