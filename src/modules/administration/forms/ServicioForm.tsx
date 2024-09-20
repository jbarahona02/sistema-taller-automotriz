import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { CustomInputText, CustomSelect, CustomSwitchComponent } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { MenuItem } from "@mui/material";
import { useTipoServicioListStore, useServicioStore } from "../../../hooks";
import { servicioValidationSchema } from "./validations/servicioValidationSchema";

export const ServicioForm = () => {
    const navigate = useNavigate();

    const {
        srvCodigo,
        srvNombre = '',
        srvDescripcion = '',
        srvCosto = 0,
        srvCostoRepuestos = 0,
        srvCostoProductos = 0,
        srvEstado = false,
        tsrCodigo = null,
        saveOrUpdate,
        findById
    } = useServicioStore();

    const { content: tipoServicios } = useTipoServicioListStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            srvCodigo: srvCodigo ? srvCodigo : 0,
            srvNombre: values.srvNombre,
            srvDescripcion: values.srvDescripcion,
            srvCosto: Number(values.srvCosto),
            srvCostoRepuestos: Number(values.srvCostoRepuestos),
            srvCostoProductos: Number(values.srvCostoProductos),
            srvEstado: values.srvEstado,
            tsrCodigo: values.tsrCodigo,
            tipoServicio: tipoServicios.find(tipoS => tipoS.tsrCodigo === values.tsrCodigo) || null,
        },
        srvCodigo ? true : false
    );

        if (srvCodigo) {
            await findById(srvCodigo.toString());
        }

        if(isSuccess){
            onClean();
        }
    };

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/servicio-list`);
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/servicio-list`);
    };

    return (
        <FormLayout
            update={!!srvCodigo}
            initialValues={{ srvNombre, srvDescripcion, srvCosto, srvCostoRepuestos, srvCostoProductos, srvEstado, tsrCodigo }}
            validationSchema={servicioValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'srvNombre'} xs={3}/>
            <CustomInputText label={'Descripción'} name={'srvDescripcion'} xs={6}/>
            <CustomInputText label={'Costo'} name={'srvCosto'} xs={2}/>

            <CustomSelect label={'Tipo de servicio'} name={'tsrCodigo'} xs={3}>
                {tipoServicios.map(t => (
                    <MenuItem key={t.tsrCodigo} value={t.tsrCodigo}>
                        {t.tsrNombre}
                    </MenuItem>
                ))}
            </CustomSelect>

            <CustomSwitchComponent label={'Estado'} name={'srvEstado'} />
        </FormLayout>
    );
};
