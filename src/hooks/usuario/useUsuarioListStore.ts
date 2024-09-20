import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { setUsuarioPageResult } from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_USUARIO_URI } = getEnvVariables();

export const useUsuarioListStore = () => {

    const usuarioListValues = useSelector((state: StoreInterface) => state.usuarioListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async (clienteNombre?: string, mecanicoNombre?: string, clienteDpi?: string, mecanicoDpi?: string) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_USUARIO_URI}`,{
                params: {
                    clienteNombre,
                    mecanicoNombre,
                    clienteDpi,
                    mecanicoDpi,
                    sort: 'usrCodigo,asc'
                }
              }
            );
            dispatch(setUsuarioPageResult(data));
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

    const remove = async (code: string) => {
        try {
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (!result) {
                return;
            }
            await automotiveWorkshopApi.delete(`${VITE_USUARIO_URI}/${code}`);
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
        ...usuarioListValues,
        findAll,
        remove
    }
};
