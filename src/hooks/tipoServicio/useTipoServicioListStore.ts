import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setTipoServicioPageResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_TIPO_SERVICIO_URI } = getEnvVariables();

export const useTipoServicioListStore = (size = 10) => {

    const tipoServicioListValues = useSelector((state: StoreInterface) => state.tipoServicioListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll(null, size);
    }, []);

    const findAll = async (nombreODescripcion?: string, size?: number) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_TIPO_SERVICIO_URI}`, {
                params: {
                    search: nombreODescripcion,
                    sort: 'tsrCodigo,asc',
                    size
                }
            });
            dispatch(setTipoServicioPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_TIPO_SERVICIO_URI}/${code}`);
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
        ...tipoServicioListValues,
        findAll,
        remove
    }
};
