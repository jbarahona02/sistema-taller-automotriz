import { useCitaStore } from "../../../hooks/cita/useCitaStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { citaValidationSchema } from "./validations/citaValidationSchema";
import { CustomInputText, CustomSelect, CustomDatePicker, CustomSwitchComponent } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { MenuItem } from "@mui/material";
import { useVehiculoListStore } from "../../../hooks";
import moment from "moment";

export const CitaForm = () => {
    const navigate = useNavigate();

    const {
        ctaCodigo,
        ctaFechaHora = '',
        ctaEstado = false,
        ctaDescripcion = '',
        ctaFechaCreacion = '',
        ctaDuracionEstimadaMin = 0,
        ctaConfirmacion = false,
        vehPlaca = null,
        saveOrUpdate,
        findById
    } = useCitaStore();

    const { content: vehiculo } = useVehiculoListStore();

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({
            ctaCodigo: values.ctaCodigo,
            ctaFechaHora: values.ctaFechaHora,
            ctaEstado: values.ctaEstado,
            ctaDescripcion: values.ctaDescripcion,
            ctaFechaCreacion: moment(),
            ctaDuracionEstimadaMin: values.ctaDuracionEstimadaMin,
            ctaConfirmacion: values.ctaConfirmacion,
            vehPlaca: values.vehPlaca,
            vehiculo: vehiculo.find(t => t.vehPlaca === values.vehPlaca) || null,
        });

        if (ctaCodigo) {
            await findById(Number(ctaCodigo));
        }
    };

    const onClean = () => {
    
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/cita-list`);
    };

    return (
        <FormLayout
            update={!!ctaCodigo}
            initialValues={{ ctaCodigo, ctaFechaHora, ctaEstado, ctaDescripcion, ctaFechaCreacion, ctaDuracionEstimadaMin, ctaConfirmacion, vehPlaca }}
            validationSchema={citaValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomDatePicker label={'Fecha cita'} name={'ctaFechaHora'} />
            <CustomInputText label={'Descripción'} name={'ctaDescripcion'} />
            <CustomInputText label={'Duración estimada en minutos'} name={'ctaDuracionEstimadaMin'} />

            <CustomSelect label={'Vehiculo'} name={'vehPlaca'}>
                {vehiculo.map(t => (
                    <MenuItem key={t.vehPlaca} value={t.vehPlaca}>
                        {t.vehPlaca}
                    </MenuItem>
                ))}
            </CustomSelect>

            <CustomSwitchComponent label={'Estado'} name={'ctaEstado'} />
            <CustomSwitchComponent label={'Confirmación'} name={'ctaConfirmacion'} />

        </FormLayout>
    );
};
