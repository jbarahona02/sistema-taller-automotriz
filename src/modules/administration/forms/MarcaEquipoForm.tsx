import { useMarcaEquipoStore } from "../../../hooks/marcaEquipo/useMarcaEquipoStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { marcaEquipoValidationSchema } from "./validations/marcaEquipoValidationSchema";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";

export const MarcaEquipoForm = () => {
    const navigate = useNavigate();
    
    const {
        meqCodigo,
        meqNombre = '',
        meqDescripcion = '',
        saveOrUpdate,
        findById
    } = useMarcaEquipoStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            meqCodigo: meqCodigo ? meqCodigo : 0,
            meqNombre: values.meqNombre,
            meqDescripcion: values.meqDescripcion,
        },
        meqCodigo ? true : false
    );

        if(meqCodigo){
            await findById(meqCodigo);
        }

        if(isSuccess) {
            onClean();
        }

    };

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/marca-equipo-list`);
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/marca-equipo-list`);
    };

    return (
        <FormLayout
            update={!!meqCodigo}
            initialValues={{ meqNombre, meqDescripcion}}
            validationSchema={marcaEquipoValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'meqNombre'} xs={3}/>
            <CustomInputText label={'Descripción'} name={'meqDescripcion'} xs={6}/>
        </FormLayout>
    );
};
