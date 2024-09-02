import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";

import { Utilities } from "../../util";
import { TipoRepuestoInterface } from "../../interfaces";
import { cleanTipoRespuestoData, setTipoRepuestoResult } from "../../store/modules/administration";

const { VITE_TIPO_REPUESTO_URI } = getEnvVariables();

export const useTipoRepuestoStore = () => {

    const tipoRepuestoValues = useSelector((state: StoreInterface) => state.tipoRepuestoSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_TIPO_REPUESTO_URI}/${code}`);
            dispatch(setTipoRepuestoResult(data));
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

    const saveOrUpdate = async (tipoRepuesto : TipoRepuestoInterface ) : Promise<boolean> => {
        try {
            if (tipoRepuesto.trpCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_TIPO_REPUESTO_URI}/${tipoRepuesto.trpCodigo}`, tipoRepuesto);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setTipoRepuestoResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_TIPO_REPUESTO_URI}`, tipoRepuesto);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setTipoRepuestoResult(data));
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
        dispatch(cleanTipoRespuestoData());
    }


    return {
        ...tipoRepuestoValues,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
