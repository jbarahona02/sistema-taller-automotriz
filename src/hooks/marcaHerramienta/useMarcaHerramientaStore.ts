import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanMarcaHerramientaData,
    setMarcaHerramientaResult
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { MarcaHerramientaInterface } from "../../interfaces";

const { VITE_MARCA_HERRAMIENTA_URI } = getEnvVariables();

export const useMarcaHerramientaStore = () => {

    const marcaHerramientaValue = useSelector((state: StoreInterface) => state.marcaHerramientaSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_MARCA_HERRAMIENTA_URI}/${code}`);
            dispatch(setMarcaHerramientaResult(data));
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

    const saveOrUpdate = async (marcaHerramienta: MarcaHerramientaInterface): Promise<boolean>  => {
        try {
            if (marcaHerramienta.mheCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_MARCA_HERRAMIENTA_URI}/${marcaHerramienta.mheCodigo}`, marcaHerramienta);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setMarcaHerramientaResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_MARCA_HERRAMIENTA_URI}`, marcaHerramienta);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setMarcaHerramientaResult(data));
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
        dispatch(cleanMarcaHerramientaData());
    }


    return {
        ...marcaHerramientaValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
