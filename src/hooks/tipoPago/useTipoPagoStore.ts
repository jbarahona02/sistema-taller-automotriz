import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { cleanTipoPagoData, setTipoPagoResult } from "../../store/modules/administration";
import { Utilities } from "../../util";
import { TipoPagoInterface } from "../../interfaces";

const { VITE_TIPO_PAGO_URI } = getEnvVariables();

export const useTipoPagoStore = () => {

    const tipoPagoValue = useSelector((state: StoreInterface) => state.tipoPagoSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_TIPO_PAGO_URI}/${code}`);
            dispatch(setTipoPagoResult(data));
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

    const saveOrUpdate = async (tipoPago : TipoPagoInterface): Promise<boolean>  => {
        try {
            if (tipoPago.tpaCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_TIPO_PAGO_URI}/${tipoPago.tpaCodigo}`, tipoPago);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setTipoPagoResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_TIPO_PAGO_URI}`, tipoPago);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setTipoPagoResult(data));
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
        dispatch(cleanTipoPagoData());
    }


    return {
        ...tipoPagoValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
