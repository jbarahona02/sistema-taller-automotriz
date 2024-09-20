import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { cleanMarcaProductoData, setMarcaProductoResult } from "../../store/modules/administration";
import { Utilities } from "../../util";
import { MarcaProductoInterface } from "../../interfaces";

const { VITE_MARCA_PRODUCTO_URI } = getEnvVariables();

export const useMarcaProductoStore = () => {

    const marcaProductoValue = useSelector((state: StoreInterface) => state.marcaProductoSlice);
    const dispatch = useDispatch();

    const findById = async (code: number) => {
        try {
            const { data } = await automotiveWorkshopApi.get(`${VITE_MARCA_PRODUCTO_URI}/${code}`);
            dispatch(setMarcaProductoResult(data));
        }catch (e) {
            let errorMessage: string;
            if(e instanceof Error) {
                errorMessage = e.message;
            } else {
                errorMessage = String(e);
            }
            await Utilities.errorAlarm(errorMessage);
        }
    }

    const saveOrUpdate = async (marcaProducto: MarcaProductoInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if(isUpdate) {
                const { data } = await automotiveWorkshopApi.patch(`${VITE_MARCA_PRODUCTO_URI}/${marcaProducto.mapCodigo}`, marcaProducto);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setMarcaProductoResult(data));
                return true;
            }

            const { data } = await automotiveWorkshopApi.post(`${VITE_MARCA_PRODUCTO_URI}`, marcaProducto);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setMarcaProductoResult(data));
            return true
        } catch(e) {
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
        dispatch(cleanMarcaProductoData());
    }

    return {
        ...marcaProductoValue,
        findById,
        saveOrUpdate,
        cleanForm
    }

};
