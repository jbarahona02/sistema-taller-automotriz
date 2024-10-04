import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setCitaPageResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_CITA_URI } = getEnvVariables();

export const useCitaListStore = (useDefaultEffect = true) => {

    const citaListValues = useSelector((state: StoreInterface) => state.citaListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        if (useDefaultEffect) {
            findAll().then();
        }
    }, []);

    const findAll = async (descripcion?: string, status?: boolean) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_CITA_URI}`, {
                params: {
                    search: descripcion,
                    sort: 'ctaFechaHora,asc',
                    status
                }
            });
            dispatch(setCitaPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_CITA_URI}/${code}`);
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
        ...citaListValues,
        findAll,
        remove
    }
};
