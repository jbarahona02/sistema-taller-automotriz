import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setNivelGravedadPageResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_NIVEL_GRAVEDAD_URI } = getEnvVariables();

export const useNivelGravedadListStore = () => {

    const nivelGravedadListValues = useSelector((state: StoreInterface) => state.nivelGravedadListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async () => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_NIVEL_GRAVEDAD_URI}`, {  });
            dispatch(setNivelGravedadPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_NIVEL_GRAVEDAD_URI}/${code}`);
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
        ...nivelGravedadListValues,
        findAll,
        remove
    }
};
