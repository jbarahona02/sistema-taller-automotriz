import { useVehicleBrandStore } from "../../../hooks/vehicle_brand/useVehicleBrandStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { vehicleBrandValidationSchema } from "./validations/vehicleBrandValidationSchema";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";

export const VehicleBrandForm = () => {
    const navigate = useNavigate();
    
    const {
        mveCodigo,
        mveNombre = '',
        saveOrUpdate,
        findById
    } = useVehicleBrandStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            mveCodigo: mveCodigo ? mveCodigo : 0,
            mveNombre: values.mveNombre,
        });
        if(mveCodigo){
            await findById(Number(mveCodigo));
        }

        if(isSuccess){
           onClean(); 
        }
    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/vehicle-brand-list`);
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/vehicle-brand-list`);
    }

    return (
        <FormLayout
            update={!!mveCodigo}
            initialValues={{ mveNombre }}
            validationSchema={vehicleBrandValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'mveNombre'} xs={3}/>
        </FormLayout>
    );
};
