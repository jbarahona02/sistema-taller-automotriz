import { useTipoServicioStore } from "../../../hooks/tipoServicio/useTipoServicioStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { tipoServicioValidationSchema } from "./validations/tipoServicioValidationSchema";
import { CustomInputText, CustomSwitchComponent } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";

export const TipoServicioForm = () => {
    const navigate = useNavigate();
    
    const {
        tsrCodigo,
        tsrNombre = '',
        tsrDescripcion = '',
        tsrEstado = false,
        saveOrUpdate,
        findById
    } = useTipoServicioStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            tsrCodigo: tsrCodigo ? tsrCodigo : 0,
            tsrNombre: values.tsrNombre,
            tsrDescripcion: values.tsrDescripcion,
            tsrEstado: values.tsrEstado,
        },
        tsrCodigo ? true : false
    );

        if(tsrCodigo){
            await findById(tsrCodigo);
        }

        if(isSuccess) {
            onClean();
        }

    };

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/tipo-servicio-list`);
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/tipo-servicio-list`);
    };

    return (
        <FormLayout
            update={!!tsrCodigo}
            initialValues={{ tsrNombre, tsrDescripcion, tsrEstado }}
            validationSchema={tipoServicioValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'tsrNombre'} xs={3}/>
            <CustomInputText label={'Descripción'} name={'tsrDescripcion'} xs={6}/>
            <CustomSwitchComponent label={'Estado'} name={'tsrEstado'} />
        </FormLayout>
    );
};
