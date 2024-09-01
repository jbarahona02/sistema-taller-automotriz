import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setHerramientaPageResult
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_HERRAMIENTA_URI } = getEnvVariables();

export const useHerramientaListStore = () => {

    const herramientaListValues = useSelector((state: StoreInterface) => state.herramientaListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async (nombreODescripcion?:string) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_HERRAMIENTA_URI}`, {
                params: {
                    search: nombreODescripcion,
                    sort: 'herCodigo,asc'
                }
              });
            dispatch(setHerramientaPageResult(data));
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

    const remove = async (code: string) => {
        try {
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (!result) {
                return;
            }
            await automotiveWorkshopApi.delete(`${VITE_HERRAMIENTA_URI}/${code}`);
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
        ...herramientaListValues,
        findAll,
        remove
    }
};
