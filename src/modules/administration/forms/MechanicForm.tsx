import moment from "moment";
import { useMechanicStore } from "../../../hooks/useMechanicStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { mechanicValidationSchema } from "./validations/mechanicTypeValidationSchema";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";



export const MechanicForm = () => {

    const navigate = useNavigate();
    
    const {
        mecCodigo,
        mecDpi = '',
        mecNombres = '',
        mecApellidos = '',
        mecAniosExperiencia = 0,
        mecCodigoEspecialidad = 0,
        mecCorreo = '',
        mecFechaContratacion = moment().toDate(),
        mecFechaNacimiento = moment().toDate(),
        mecNit = '',
        mecSalario = 0,
        mecTelefono = '',
        estado = true,
        findById,
        saveOrUpdate,
        cleanForm
    } = useMechanicStore();

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({...values, mecCodigo});
    }

    const onClean = () => {
        cleanForm();
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/mechanic-list`);
    }

   return <FormLayout
        update={!!mecCodigo}
        initialValues={{mecDpi,mecNit,mecNombres,mecApellidos,mecAniosExperiencia,mecCodigoEspecialidad,mecCorreo,mecFechaContratacion,mecFechaNacimiento,mecSalario,mecTelefono}}
        validationSchema={mechanicValidationSchema}
        onSubmit={onSubmit}
        onClean={onClean}
        onCancel={onCancel}
    >
        <CustomInputText label={'DPI'} name={'mecDPI'} />
        <CustomInputText label={'Nombres'} name={'mecNombres'} />
        <CustomInputText label={'Apellidos'} name={'mecApellidos'} />
        <CustomInputText label={'NIT'} name={'mecNIT'} />
        <CustomInputText label={'Teléfono'} name={'mecTelefono'} />
    </FormLayout>
}