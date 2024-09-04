import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { setEquipoTallerPageResult } from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_EQUIPO_TALLER_URI } = getEnvVariables();

export const useEquipoTallerListStore = () => {

    const equipoTallerListValues = useSelector((state: StoreInterface) => state.equipoTallerListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async (nombreODescripcion?:string) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_EQUIPO_TALLER_URI}`,{
                params: {
                    search: nombreODescripcion,
                    sort: 'etaCodigo,asc'
                }
              }
            );
            dispatch(setEquipoTallerPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_EQUIPO_TALLER_URI}/${code}`);
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
        ...equipoTallerListValues,
        findAll,
        remove
    }
};
