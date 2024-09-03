import { useDispatch, useSelector } from "react-redux";
import { StoreInterface } from "../../store";
import { getEnvVariables } from "../../helpers";
import { automotiveWorkshopApi } from "../../api";
import { cleanProveedorData, setProveedorResult } from "../../store/modules/administration";
import { Utilities } from "../../util";
import { ProveedorInterface } from "../../interfaces";

const { VITE_PROVEEDOR_URI } = getEnvVariables();

export const useProveedorStore = () => {

    const proveedorValue = useSelector((state: StoreInterface) => state.proveedorSlice);
    const dispatch = useDispatch();

    const findById = async (code: string) => {
        try {
            const {data} = await automotiveWorkshopApi.get(`${VITE_PROVEEDOR_URI}/${code}`);
            dispatch(setProveedorResult(data));
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

    const saveOrUpdate = async (proveedor: ProveedorInterface, isUpdate: boolean): Promise<boolean> => {
        try {
            if (isUpdate) {
                const {data} = await automotiveWorkshopApi.patch(`${VITE_PROVEEDOR_URI}/${proveedor.prvCodigo}`, proveedor);
                await Utilities.successAlarm('Registro actualizado');
                dispatch(setProveedorResult(data));
                return true;
            }

            const {data} = await automotiveWorkshopApi.post(`${VITE_PROVEEDOR_URI}`, proveedor);
            await Utilities.successAlarm('Registro guardado');
            dispatch(setProveedorResult(data));
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
        dispatch(cleanProveedorData());
    }


    return {
        ...proveedorValue,
        findById,
        saveOrUpdate,
        cleanForm
    }
};
