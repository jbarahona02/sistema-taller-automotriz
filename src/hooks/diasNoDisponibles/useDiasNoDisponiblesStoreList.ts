import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setDiasNoDisponiblesPageResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_DIAS_NO_DISPONIBLES_URI } = getEnvVariables();

export const useDiasNoDisponiblesListStore = () => {

    const diasNoDisponiblesListValues = useSelector((state: StoreInterface) => state.diasNoDisponiblesListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async () => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_DIAS_NO_DISPONIBLES_URI}`, {  });
            dispatch(setDiasNoDisponiblesPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_DIAS_NO_DISPONIBLES_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll();
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
        ...diasNoDisponiblesListValues,
        findAll,
        remove
    }
};
