import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { cleanProductoData, setProductoResult } from "../../store/modules/administration";
import { Utilities } from "../../util";
import { ProductoInterface } from "../../interfaces";

const { VITE_PRODUCTO_URI } = getEnvVariables();

export const useProductoStore = () => {

    const productoValue = useSelector((state: StoreInterface) => state.productoSlice);
    const dispatch = useDispatch();

    const findById = async (code: string) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_PRODUCTO_URI}/${code}`);
            dispatch(setProductoResult(data));
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

    const saveOrUpdate = async (producto: ProductoInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_PRODUCTO_URI}/${producto.proCodigo}`, producto);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setProductoResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_PRODUCTO_URI}`, producto);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setProductoResult(data));
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
        dispatch(cleanProductoData());
    }


    return {
        ...productoValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
