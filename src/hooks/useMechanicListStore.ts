import { useDispatch, useSelector } from "react-redux";
import { getEnvVariables } from "../helpers";
import { StoreInterface } from "../store";
import { useEffect } from "react";
import { Utilities } from "../util";
import { automotiveWorkshopApi } from "../api";
import { MechanicInterface } from "../interfaces";

const {VITE_MECHANIC_URI} = getEnvVariables();


export const useMechanicListStore = () => {


    const mechanicListValues = useSelector((state: StoreInterface) => state.mechanicListSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        findMechanics("","","",1000000,true);
    }, []);


    const findMechanics = async (cui:string, name:string, lastName:string,salary:number, state: boolean ) => {
        try {
            const params = {cui,name,lastName,salary,state};
            const {data,headers} = await automotiveWorkshopApi.get("",{params});
            const list : MechanicInterface[] = data;

            // dispatch();
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    const remove = async (code: number) => {
        try {
          
            const result = await Utilities.warningAlarm('¿Desea eliminar el registro?');
            if (result) {
                return;
            }
            await automotiveWorkshopApi.delete(`${VITE_MECHANIC_URI}/${code}`);
            await Utilities.successAlarm('Registro eliminado');
            await findMechanics("","","",1000000,true);
          
        } catch (e) {
            await Utilities.errorAlarm(e);
        }
    }

    return {
        ...mechanicListValues,
        mechanicListValues,
        findMechanics,
        remove
    }
}