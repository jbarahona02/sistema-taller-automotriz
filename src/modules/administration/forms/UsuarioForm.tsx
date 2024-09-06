import { FormikValues, useFormikContext } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { CustomInputText, CustomSelect, CustomSwitchComponent } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { MenuItem } from "@mui/material";
import { useMechanicListStore, useClienteListStore, useUsuarioStore } from "../../../hooks";
import { usuarioValidationSchema } from "./validations/usuarioValidationSchema";
import { useEffect } from 'react';

export const UsuarioForm = () => {
    const navigate = useNavigate();

    const {
        usrCodigo,
        usrContrasenia = '',
        usrEstado = false,
        usrAdministrador = false,
        mecCodigo = null,
        cliCodigo = null,
        saveOrUpdate,
        findById
    } = useUsuarioStore();

    const { content: mecanicos } = useMechanicListStore();
    const { content: clientes } = useClienteListStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            usrCodigo: usrCodigo ? usrCodigo : 0,
            usrContrasenia: values.usrContrasenia,
            usrEstado: values.usrEstado,
            usrAdministrador: values.usrAdministrador,
            mecCodigo: values.mecCodigo,
            cliCodigo: values.cliCodigo,
            mecanico: mecanicos.find(mecanico => mecanico.mecCodigo === values.mecCodigo) || null,
            cliente: clientes.find(cliente => cliente.cliCodigo === values.cliCodigo) || null
        },
        usrCodigo ? true : false
    );

        if (usrCodigo) {
            await findById(usrCodigo.toString());
        }

        if(isSuccess){
            onClean();
        }
    };

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/usuario-list`);
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/usuario-list`);
    };

    // Comprobamos que useFormikContext devuelve el contexto de Formik
    const formikContext = useFormikContext<FormikValues>();

    // Use useEffect to clear other selectors when one changes
    useEffect(() => {
        if (formikContext && formikContext.values.mecCodigo) {
            formikContext.setFieldValue('cliCodigo', '');
        }
    }, [formikContext?.values.mecCodigo]);

    useEffect(() => {
        if (formikContext && formikContext.values.cliCodigo) {
            formikContext.setFieldValue('mecCodigo', '');
        }
    }, [formikContext?.values.cliCodigo]);

    return (
        <FormLayout
            update={!!usrCodigo}
            initialValues={{ usrContrasenia, usrEstado, usrAdministrador, mecCodigo, cliCodigo }}
            validationSchema={usuarioValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Contraseña'} name={'usrContrasenia'} xs={3}/>
            
            <CustomSelect label={'Mecanico'} name={'mecCodigo'} xs={3}>
                {mecanicos.map(t => (
                    <MenuItem key={t.mecCodigo} value={t.mecCodigo}>
                        {t.mecNombres}
                    </MenuItem>
                ))}
            </CustomSelect>
            <CustomSelect label={'Cliente'} name={'cliCodigo'} xs={3}>
                {clientes.map(t => (
                    <MenuItem key={t.cliCodigo} value={t.cliCodigo}>
                        {t.cliNombres}
                    </MenuItem>
                ))}
            </CustomSelect>
            
            <CustomSwitchComponent label={'Estado'} name={'usrEstado'} />
            <CustomSwitchComponent label={'Es administrador'} name={'usrAdministrador'} />
        </FormLayout>
    );
};
