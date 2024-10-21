import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { CustomDatePicker, CustomInputText, CustomSelect, CustomSwitchComponent } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { MenuItem } from "@mui/material";
import { useClienteListStore, useCotizacionStore } from "../../../hooks";
import moment from "moment";
import { cotizacionValidationSchema } from "./validations/cotizacionValidationSchema";

export const CotizacionForm = () => {
    const navigate = useNavigate();

    const {
        cotCodigo,
        cotFechaCreacion = moment().toDate(),
        cotFechaVencimiento = moment().toDate(),
        cotVigente = true,
        cotDescuento = 0,
        cotSubtotal = 0,
        cotTotal = 0,
        cliCodigo = null,
        saveOrUpdate,
        findById
    } = useCotizacionStore();

    const { content: cliente } = useClienteListStore();
  
    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            cotCodigo: cotCodigo ? cotCodigo : 0,
            cotFechaCreacion: values.cotFechaCreacion,
            cotFechaVencimiento: values.cotFechaVencimiento,
            cotDescuento: Number(values.cotDescuento),
            cotSubtotal: Number(values.cotSubtotal),
            cotTotal: Number(values.cotTotal),
            cotVigente: values.cotVigente,
            cliCodigo: values.cliCodigo,
            cliente: cliente.find(t => t.cliCodigo === values.cliCodigo) || null
        },
        cotCodigo ? true : false
    );

        if (cotCodigo) {
            await findById(cotCodigo.toString());
        }

        if(isSuccess){
            onClean();
        }
    };

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/cotizacion-list`);
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/cotizacion-list`);
    };

    return (
        <FormLayout
            update={!!cotCodigo}
            initialValues={{cotFechaCreacion, cotFechaVencimiento, cotDescuento, cotSubtotal, cotTotal, cotVigente, cliCodigo }}
            validationSchema={cotizacionValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomDatePicker label={'Fecha de creación'} name={'cotFechaCreacion'}  xs={3} restrictToToday={true} minDate={moment()}/>
            <CustomDatePicker label={'Fecha de vencimiento'} name={'cotFechaVencimiento'}  xs={3} minDate={moment()}/>
            <CustomInputText label={'Porcentaje de descuento'} name={'cotDescuento'} xs={2}/>
            <CustomInputText label={'Subtotal'} name={'cotSubtotal'} xs={2}/>
            <CustomInputText label={'Total'} name={'cotTotal'} xs={2}/>
          
            <CustomSelect label={'Cliente'} name={'cliCodigo'} xs={3}>
                {cliente.map(t => (
                    <MenuItem key={t.cliCodigo} value={t.cliCodigo}>
                        {t.cliNombres} {t.cliApellidos}
                    </MenuItem>
                ))}
            </CustomSelect>
            <CustomSwitchComponent label={'Vigente'} name={'cotVigente'} />
        </FormLayout>
    );
};
