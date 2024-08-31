
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { useMechanicalSpecialtyStore } from "../../../hooks";
import { mechanicalSpecialtyValidationSchema } from "./validations/mechanicalSpecialtyValidationSchema";

export const MechanicalSpecialtyForm = () => {
    const navigate = useNavigate();
    
    const {
        emeCodigo,
        emeNombre = '',
        emeDescripcion = '',
        saveOrUpdate,
        findById
    } = useMechanicalSpecialtyStore();

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({
            emeCodigo: emeCodigo ? emeCodigo : 0,
            emeNombre: values.emeNombre,
            emeDescripcion: values.emeDescripcion,
        });
        if(emeCodigo){
            await findById(Number(emeCodigo));
        }

        onClean();
    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/especialidad-mecanica-list`);
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/especialidad-mecanica-list`);
    }

    return (
        <FormLayout
            update={!!emeCodigo}
            initialValues={{ emeNombre, emeDescripcion}}
            validationSchema={mechanicalSpecialtyValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'emeNombre'} />
            <CustomInputText label={'Descripción'} name={'emeDescripcion'} />
        </FormLayout>
    );
};
