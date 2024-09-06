import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setMarcaEquipoPageResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_MARCA_EQUIPO_URI } = getEnvVariables();

export const useMarcaEquipoListStore = () => {

    const marcaEquipoListValues = useSelector((state: StoreInterface) => state.marcaEquipoListSlice);
    const dispatch = useDispatch();
    
    useEffect(() => {
        findAll();
    }, []);

    const findAll = async (nombreODescripcion?: string) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_MARCA_EQUIPO_URI}`, {
                params: {
                    search: nombreODescripcion,
                    sort: 'meqCodigo,asc'
                }
            });
            dispatch(setMarcaEquipoPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_MARCA_EQUIPO_URI}/${code}`);
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
        ...marcaEquipoListValues,
        findAll,
        remove
    }
};