import { useDispatch, useSelector } from "react-redux";
import { getEnvVariables } from "../../helpers";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { automotiveWorkshopApi } from "../../api";

import { Utilities } from "../../util";
import { setMechanicalSpecialtyPageResult } from "../../store/modules/administration";

const { VITE_MECHANICAL_SPECIALTY_URI } = getEnvVariables();

export const useMechanicalSpecialtyListStore = () => {
    const mechanicalSpecialtyListValues = useSelector((state: StoreInterface) => state.mechanicalSpecialtyListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll('');
    }, []);

    const findAll = async (nombre: string) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_MECHANICAL_SPECIALTY_URI}`, { params:
               {
                search: nombre, sort: 'emeNombre,asc'
            }});
            dispatch(setMechanicalSpecialtyPageResult(data));
        } catch (e) {
            let errorMessage: string;
            if (e instanceof Error) {
                errorMessage = e.message;
            } else {
                errorMessage = String(e);
            }
            await Utilities.errorAlarm(errorMessage);
        }
    };


    const remove = async (code: number) => {
        try {
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (!result) {
                return;
            }
            await automotiveWorkshopApi.delete(`${VITE_MECHANICAL_SPECIALTY_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll('');
        } catch (e) {
            let errorMessage: string;
            if (e instanceof Error) {
                errorMessage = e.message;
            } else {
                errorMessage = String(e);
            }
            await Utilities.errorAlarm(errorMessage);
        }
    };

    return {
        ...mechanicalSpecialtyListValues,
        findAll,
        remove
    }
}