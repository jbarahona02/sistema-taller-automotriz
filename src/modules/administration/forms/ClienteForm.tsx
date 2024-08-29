import { useClienteStore } from "../../../hooks/cliente/useClienteStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { clienteValidationSchema } from "./validations/clienteValidationSchema";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";

export const ClienteForm = () => {
    const navigate = useNavigate();
    
    const {
        cliCodigo,
        cliDpi = '',
        cliNombres = '',
        cliApellidos = '',
        cliNit = '',
        cliTelefono = '',
        cliCorreo = '',
        saveOrUpdate,
        findById
    } = useClienteStore();

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({
            cliCodigo: cliCodigo ? cliCodigo : 0,
            cliDpi: values.cliDpi,
            cliNombres: values.cliNombres,
            cliApellidos: values.cliApellidos,
            cliNit: values.cliNit,
            cliTelefono: values.cliTelefono,
            cliCorreo: values.cliCorreo,
        });
        if(cliCodigo){
            await findById(Number(cliCodigo));
        }
    }

    const onClean = () => {
        
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/cliente-list`);
    }

    return (
        <FormLayout
            update={!!cliCodigo}
            initialValues={{ cliDpi, cliNombres, cliApellidos, cliNit, cliTelefono, cliCorreo}}
            validationSchema={clienteValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'DPI'} name={'cliDpi'} />
            <CustomInputText label={'Nombres'} name={'cliNombres'} />
            <CustomInputText label={'Apellidos'} name={'cliApellidos'} />
            <CustomInputText label={'NIT'} name={'cliNit'} />
            <CustomInputText label={'Teléfono'} name={'cliTelefono'} />
            <CustomInputText label={'Correo'} name={'cliCorreo'} />
        </FormLayout>
    );
};
