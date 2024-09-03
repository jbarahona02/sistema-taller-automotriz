import { useTallerStore } from "../../../hooks/taller/useTallerStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { tallerValidationSchema } from "./validations/tallerValidationSchema";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";

export const TallerForm = () => {
    const navigate = useNavigate();
    
    const {
        tllCodigo,
        tllNombre = '',
        tllTelefono = '',
        tllDireccion = '',
        tllCorreo = '',
        saveOrUpdate,
        findById
    } = useTallerStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            tllCodigo: tllCodigo ? tllCodigo : 0,
            tllNombre: values.tllNombre,
            tllTelefono: values.tllTelefono,
            tllDireccion: values.tllDireccion,
            tllCorreo: values.tllCorreo,
        });
        if(tllCodigo){
            await findById(Number(tllCodigo));
        }

        if(isSuccess){
            onClean();
        }

    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/taller-list`);
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/taller-list`);
    }

    return (
        <FormLayout
            update={!!tllCodigo}
            initialValues={{ tllNombre, tllTelefono, tllDireccion, tllCorreo}}
            validationSchema={tallerValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'tllNombre'} xs={3}/>
            <CustomInputText label={'Teléfono'} name={'tllTelefono'} xs={2}/>
            <CustomInputText label={'Dirección'} name={'tllDireccion'} />
            <CustomInputText label={'Correo electrónico'} name={'tllCorreo'} xs={3}/>
        </FormLayout>
    );
};
