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
        const isSuccess = await saveOrUpdate({
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
        if(isSuccess){
            onClean();
        }
    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/cliente-list`);
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
            <CustomInputText label={'DPI'} name={'cliDpi'} xs={3}/>
            <CustomInputText label={'Nombres'} name={'cliNombres'} xs={3}/>
            <CustomInputText label={'Apellidos'} name={'cliApellidos'} xs={3} />
            <CustomInputText label={'NIT'} name={'cliNit'} xs={2}/>
            <CustomInputText label={'Teléfono'} name={'cliTelefono'} xs={2}/>
            <CustomInputText label={'Correo'} name={'cliCorreo'} xs={3}/>
        </FormLayout>
    );
};
