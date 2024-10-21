import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setClientePageResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_CLIENTE_URI } = getEnvVariables();

export const useClienteListStore = (size = 10) => {

    const clienteListValues = useSelector((state: StoreInterface) => state.clienteListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll(null, null, null, null, size);
    }, []);

    const findAll = async (dpi?: string, nit?: string, telefono?: string, correo?: string, size?: number) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_CLIENTE_URI}`, { 
                params: {
                    dpi: dpi,
                    nit: nit,
                    telefono: telefono,
                    correo: correo,
                    sort: 'cliNombres,asc',
                    size
                }
             });
            dispatch(setClientePageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_CLIENTE_URI}/${code}`);
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
        ...clienteListValues,
        findAll,
        remove
    }
};
