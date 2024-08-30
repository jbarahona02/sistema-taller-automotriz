import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { useEffect } from "react";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { setMarcaProductoPageResult } from "../../store/modules/administration";
import { Utilities } from "../../util";

const { VITE_MARCA_PRODUCTO_URI } = getEnvVariables();

export const useMarcaProductoListaStore = () => {

    const marcaProductoListaValues = useSelector((state: StoreInterface) => state.marcaProductoListaSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findAll();
    }, []);

    const findAll = async () => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_MARCA_PRODUCTO_URI}`, {  });
            dispatch(setMarcaProductoPageResult(data));
        } catch(e) {
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
            if(!result) {
                return;
            }
            await automotiveWorkshopApi.delete(`${VITE_MARCA_PRODUCTO_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findAll();
        } catch(e) {
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
        ...marcaProductoListaValues,
        findAll,
        remove
    }

};
