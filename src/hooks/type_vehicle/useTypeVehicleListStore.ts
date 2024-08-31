import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setTypeVehiclePageResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_TYPE_VEHICLE_URI } = getEnvVariables();

export const useTypeVehicleListStore = () => {

    const typeVehicleListValues = useSelector((state: StoreInterface) => state.typeVehicleListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async (nombreODescripcion?: string) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_TYPE_VEHICLE_URI}`, {
                params: {
                    search: nombreODescripcion,
                    sort: 'tveNombre,asc'
                }
              });
            dispatch(setTypeVehiclePageResult(data));
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

    const remove = async (code: number) => {
        try {
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (!result) {
                return;
            }
            await automotiveWorkshopApi.delete(`${VITE_TYPE_VEHICLE_URI}/${code}`);
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
        ...typeVehicleListValues,
        findAll,
        remove
    }
};
