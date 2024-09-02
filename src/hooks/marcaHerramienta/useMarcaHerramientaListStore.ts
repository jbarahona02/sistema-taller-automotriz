import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setMarcaHerramientaPageResult
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_MARCA_HERRAMIENTA_URI } = getEnvVariables();

export const useMarcaHerramientaListStore = () => {

    const marcaHerramientaListValues = useSelector((state: StoreInterface) => state.marcaHerramientaListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async (nombre?: string) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_MARCA_HERRAMIENTA_URI}`, {
                params: {
                    search: nombre,
                    sort: 'mheCodigo,asc'
                }
              });
            dispatch(setMarcaHerramientaPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_MARCA_HERRAMIENTA_URI}/${code}`);
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
        ...marcaHerramientaListValues,
        findAll,
        remove
    }
};
