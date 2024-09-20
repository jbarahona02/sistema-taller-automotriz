import { useTypeVehicleStore } from "../../../hooks/type_vehicle/useTypeVehicleStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { typeVehicleValidationSchema } from "./validations/typeVehicleValidationSchema";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";

export const TypeVehicleForm = () => {
    const navigate = useNavigate();
    
    const {
        tveCodigo,
        tveNombre = '',
        tveDescripcion = '',
        saveOrUpdate,
        findById
    } = useTypeVehicleStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            tveCodigo: tveCodigo ? tveCodigo : 0,
            tveNombre: values.tveNombre,
            tveDescripcion: values.tveDescripcion,
        });
        if(tveCodigo){
            await findById(Number(tveCodigo));
        }

        if(isSuccess){
            onClean();
        }
    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/type-vehicle-list`);
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/type-vehicle-list`);
    }

    return (
        <FormLayout
            update={!!tveCodigo}
            initialValues={{ tveNombre, tveDescripcion}}
            validationSchema={typeVehicleValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'tveNombre'} xs={3}/>
            <CustomInputText label={'Descripción'} name={'tveDescripcion'} />
        </FormLayout>
    );
};
