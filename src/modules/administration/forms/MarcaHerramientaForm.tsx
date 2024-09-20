
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { useMarcaHerramientaStore } from "../../../hooks";
import { marcaHerramientaValidationSchema } from "./validations/marcaHerramientaValidationSchema";

export const MarcaHerramientaForm = () => {
    const navigate = useNavigate();
    
    const {
        mheCodigo,
        mheNombre = "",
        saveOrUpdate,
        findById
    } = useMarcaHerramientaStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            mheCodigo: mheCodigo ? mheCodigo : 0,
            mheNombre: values.mheNombre
        });
        if(mheCodigo){
            await findById(Number(mheCodigo));
        }

        if(isSuccess){
            onClean();
        }    
    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/marca-herramienta-list`);
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/marca-herramienta-list`);
    }

    return (
        <FormLayout
            update={!!mheCodigo}
            initialValues={{ mheNombre }}
            validationSchema={marcaHerramientaValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'mheNombre'}  xs={3} />
        </FormLayout>
    );
};
