import { useDispatch, useSelector } from "react-redux";
import { getEnvVariables } from "../../helpers";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { automotiveWorkshopApi } from "../../api";

import { Utilities } from "../../util";
import { setTipoRepuestoPageResult } from "../../store/modules/administration";

const { VITE_TIPO_REPUESTO_URI } = getEnvVariables();

export const useTipoRepuestoListStore = (size= 10) => {
    const tipoRepuestoListValues = useSelector((state: StoreInterface) => state.tipoRepuestoListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll(0, null, size);
    }, []);

    const findAll = async (page = 0, nombreODescripcion?: string, size?: number) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_TIPO_REPUESTO_URI}`, { params:
               {
                search: nombreODescripcion, sort: 'trpCodigo,asc', size, page
            }});
            dispatch(setTipoRepuestoPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_TIPO_REPUESTO_URI}/${code}`);
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
        ...tipoRepuestoListValues,
        findAll,
        remove
    }
}
