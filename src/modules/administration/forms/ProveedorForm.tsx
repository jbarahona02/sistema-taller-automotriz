
import { useProveedorStore } from "../../../hooks/index";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { CustomInputText, CustomSwitchComponent  } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { proveedorValidationSchema } from "./validations/proveedorValidationSchema";



export const ProveedorForm = () => {

    const navigate = useNavigate();
    
    const {
        prvCodigo,
        prvNombre = '',
        prvNombreContacto = '',
        prvCorreo = '',
        prvTelefono = 0,
        prvEstado = true,
        findById,
        saveOrUpdate
    } = useProveedorStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            prvCodigo: prvCodigo ? prvCodigo : 0,
            prvNombre: values.prvNombre,
            prvNombreContacto: values.prvNombreContacto,
            prvCorreo: values.prvCorreo,
            prvTelefono: values.prvTelefono,
            prvEstado: values.prvEstado,
        }, prvCodigo ? true : false);

        if(prvCodigo) {
            await findById(prvCodigo.toString());
        }

        if(isSuccess){
            onClean();
        }
    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/proveedor-list`);
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/proveedor-list`);
    }

   return (
    
    <FormLayout
            update={!!prvCodigo}
            initialValues={{prvNombre,prvNombreContacto,prvTelefono,prvCorreo,prvEstado}}
            validationSchema={proveedorValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre de proveedor'} name={'prvNombre'} xs={3} />
            <CustomInputText label={'Nombre de contacto'} name={'prvNombreContacto'} xs={3}/>
            <CustomInputText label={'Teléfono'} name={'prvTelefono'}  xs={2}/>
            <CustomInputText label={'Correo electrónico'} name={'prvCorreo'}  xs={3}/>
            <CustomSwitchComponent label={'Estado'} name={'prvEstado'} />
        </FormLayout>
    );
}