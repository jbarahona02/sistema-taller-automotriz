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

export const useTypeVehicleListStore = (size = 10) => {

    const typeVehicleListValues = useSelector((state: StoreInterface) => state.typeVehicleListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll(null, size);
    }, []);

    const findAll = async (nombreODescripcion?: string, size?: number) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_TYPE_VEHICLE_URI}`, {
                params: {
                    search: nombreODescripcion,
                    sort: 'tveCodigo,asc',
                    size
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
