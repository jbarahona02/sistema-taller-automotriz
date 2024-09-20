import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanClienteData,
    setClienteResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { ClienteInterface } from "../../interfaces";

const { VITE_CLIENTE_URI } = getEnvVariables();

export const useClienteStore = () => {

    const clienteValue = useSelector((state: StoreInterface) => state.clienteSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_CLIENTE_URI}/${code}`);
            dispatch(setClienteResult(data));
        } catch (e) {
            let errorMessage: string;
            if (e instanceof Error) {
                errorMessage = e.message;
            } else {
                errorMessage = String(e);
            }
            await Utilities.errorAlarm(errorMessage);
        }
    }

    const saveOrUpdate = async (cliente: ClienteInterface): Promise<boolean> => {
        try {
            if (cliente.cliCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_CLIENTE_URI}/${cliente.cliCodigo}`, cliente);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setClienteResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_CLIENTE_URI}`, cliente);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setClienteResult(data));
            return true;
        } catch (e) {
            let errorMessage: string;
            if (e instanceof Error) {
                errorMessage = e.message;
            } else {
                errorMessage = String(e);
            }
            await Utilities.errorAlarm(errorMessage);
            return false;
        }
    }

    const cleanForm = () => {
        dispatch(cleanClienteData());
    }


    return {
        ...clienteValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
