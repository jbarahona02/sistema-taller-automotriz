import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { setServicioPageResult } from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_SERVICIO_URI } = getEnvVariables();

export const useServicioListStore = () => {

    const servicioListValues = useSelector((state: StoreInterface) => state.servicioListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async (nombreODescripcion?:string) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_SERVICIO_URI}`,{
                params: {
                    search: nombreODescripcion,
                    sort: 'srvCodigo,asc'
                }
              }
            );
            dispatch(setServicioPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_SERVICIO_URI}/${code}`);
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
        ...servicioListValues,
        findAll,
        remove
    }
};
