
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { useTipoRepuestoStore } from "../../../hooks";
import { tipoRepuestoValidationSchema } from "./validations/tipoRepuestoValidationSchema";


export const TipoRepuestoForm = () => {
    const navigate = useNavigate();
    
    const {
        trpCodigo,
        trpNombre = '',
        trpDescripcion = '',
        saveOrUpdate,
        findById
    } = useTipoRepuestoStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            trpCodigo: trpCodigo ? trpCodigo : 0,
            trpNombre: values.trpNombre,
            trpDescripcion: values.trpDescripcion,
        });
        if(trpCodigo){
            await findById(Number(trpCodigo));
        }

        if(isSuccess){
            onClean();
        }    
    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/tipo-repuesto-list`);
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/tipo-repuesto-list`);
    }

    return (
        <FormLayout
            update={!!trpCodigo}
            initialValues={{ trpNombre, trpDescripcion}}
            validationSchema={tipoRepuestoValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'trpNombre'}  xs={3} />
            <CustomInputText label={'Descripción'} name={'trpDescripcion'}  xs={5} />
        </FormLayout>
    );
};
