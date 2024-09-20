import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { cleanUsuarioData, setUsuarioResult } from "../../store/modules/administration";
import { Utilities } from "../../util";
import { UsuarioInterface } from "../../interfaces";

const { VITE_USUARIO_URI } = getEnvVariables();

export const useUsuarioStore = () => {

    const usuarioValue = useSelector((state: StoreInterface) => state.usuarioSlice);
    const dispatch = useDispatch();

    const findById = async (code: string) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_USUARIO_URI}/${code}`);
            dispatch(setUsuarioResult(data));
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

    const saveOrUpdate = async (usuario: UsuarioInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_USUARIO_URI}/${usuario.usrCodigo}`, usuario);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setUsuarioResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_USUARIO_URI}`, usuario);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setUsuarioResult(data));
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
        dispatch(cleanUsuarioData());
    }


    return {
        ...usuarioValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
