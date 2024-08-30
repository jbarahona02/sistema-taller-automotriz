import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    cleanMarcaEquipoData,
    setMarcaEquipoResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";
import { MarcaEquipoInterface } from "../../interfaces";

const { VITE_MARCA_EQUIPO_URI } = getEnvVariables();

export const useMarcaEquipoStore = () => {

    const marcaEquipoValue = useSelector((state: StoreInterface) => state.marcaEquipoSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_MARCA_EQUIPO_URI}/${code}`);
            dispatch(setMarcaEquipoResult(data));
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

    const saveOrUpdate = async (marcaEquipo: MarcaEquipoInterface) => {
        try {
            if (marcaEquipo.meqCodigo) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_MARCA_EQUIPO_URI}/${marcaEquipo.meqCodigo}`, marcaEquipo);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setMarcaEquipoResult(data));
                return;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_MARCA_EQUIPO_URI}`, marcaEquipo);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setMarcaEquipoResult(data));
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

    const cleanForm = () => {
        dispatch(cleanMarcaEquipoData());
    }


    return {
        ...marcaEquipoValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
