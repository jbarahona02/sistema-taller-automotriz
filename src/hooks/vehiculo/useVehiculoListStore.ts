import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import {
    setVehiculoPageResult,
} from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_VEHICULO_URI } = getEnvVariables();

export const useVehiculoListStore = (size = 10) => {

    const vehiculoListValues = useSelector((state: StoreInterface) => state.vehiculoListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll(0, null, null, null, null, size);
    }, []);

    const findAll = async (page = 0, placa?: string, chasis?: string, color?: string, kilometraje?: string, size = 10) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_VEHICULO_URI}`, {
                params: {
                    placa: placa,
                    chasis: chasis,
                    color: color,
                    sort: 'vehPlaca,asc',
                    size,
                    page
                }
              });
            console.log(data);
            dispatch(setVehiculoPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_VEHICULO_URI}/${code}`);
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
        ...vehiculoListValues,
        findAll,
        remove
    }
};
