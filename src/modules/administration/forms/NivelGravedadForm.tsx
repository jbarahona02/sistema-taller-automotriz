import { useNivelGravedadStore } from "../../../hooks/nivelGravedad/useNivelGravedadStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { nivelGravedadValidationSchema } from "./validations/nivelGravedadValidationSchema";
import { CustomInputText, CustomSwitchComponent } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";

export const NivelGravedadForm = () => {
    const navigate = useNavigate();

    const {
        ngrCodigo,
        ngrNombre = '',
        ngrDetalle = '',
        ngrEstado = false,
        saveOrUpdate,
        findById
    } = useNivelGravedadStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            ngrCodigo: ngrCodigo ? ngrCodigo : 0,
            ngrNombre: values.ngrNombre,
            ngrDetalle: values.ngrDetalle,
            ngrEstado: values.ngrEstado
        });
        if (ngrCodigo) {
            await findById(Number(ngrCodigo));
        }

        if(isSuccess){
            onClean();
        }
    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/nivel-gravedad-list`);
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/nivel-gravedad-list`);
    }

    return (
        <FormLayout
            update={!!ngrCodigo}
            initialValues={{ ngrNombre, ngrDetalle, ngrEstado }}
            validationSchema={nivelGravedadValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'ngrNombre'} xs={3}/>
            <CustomInputText label={'Descripción'} name={'ngrDetalle'} xs={5}/>
            <CustomSwitchComponent label={'Estado'} name={'ngrEstado'} />
        </FormLayout>
    );
};
