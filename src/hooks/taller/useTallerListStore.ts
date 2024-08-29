import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setTallerPageResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_TALLER_URI } = getEnvVariables();

export const useTallerListStore = () => {

    const tallerListValues = useSelector((state: StoreInterface) => state.tallerListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async () => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_TALLER_URI}`, {  });
            dispatch(setTallerPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_TALLER_URI}/${code}`);
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
        ...tallerListValues,
        findAll,
        remove
    }
};
