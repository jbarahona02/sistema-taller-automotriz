import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setMechanicPageResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_MECHANIC_URI } = getEnvVariables();

export const useMechanicListStore = () => {

    const mechanicListValues = useSelector((state: StoreInterface) => state.mechanicListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async (nombresApellidos?:string,dpi?:string, nit?:string,telefono?:string,correo?:string) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_MECHANIC_URI}`, {
                params: {
                    search: nombresApellidos,
                    dpi,
                    nit,
                    telefono,
                    correo,
                    sort: 'mecCodigo,asc'
                }
              });

            dispatch(setMechanicPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_MECHANIC_URI}/${code}`);
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

    console.log("Datos si: ",mechanicListValues);
    return {
        ...mechanicListValues,
        findAll,
        remove
    }
};
