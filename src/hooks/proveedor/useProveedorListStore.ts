import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { setProveedorPageResult } from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_PROVEEDOR_URI } = getEnvVariables();

export const useProveedorListStore = (size = 10) => {

    const proveedorListValues = useSelector((state: StoreInterface) => state.proveedorListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll(null, null, null, size);
    }, []);

    const findAll = async (nombre?:string,telefono?:string,correo?:string, size?: number) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_PROVEEDOR_URI}`, {
                params:
                    {
                        search: nombre,
                        telefono,
                        correo,
                        sort: 'prvCodigo,asc',
                        size
                    }
            });
            dispatch(setProveedorPageResult(data));
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
            await automotiveWorkshopApi.delete(`${VITE_PROVEEDOR_URI}/${code}`);
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
        ...proveedorListValues,
        findAll,
        remove
    }
};
