import moment from "moment";
import { useMechanicalSpecialtyListStore, useMechanicStore } from "../../../hooks/index";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { mechanicValidationSchema } from "./validations/mechanicValidationSchema";
import { CustomInputText, CustomSelect, CustomDatePicker } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { MenuItem } from "@mui/material";



export const MechanicForm = () => {

    const navigate = useNavigate();
    
    const {
        mecCodigo,
        mecDpi = '',
        mecNombres = '',
        mecApellidos = '',
        mecAniosExperiencia = 0,
        emeCodigo = null,
        mecCorreo = '',
        mecFechaContratacion = moment().toDate(),
        mecFechaNacimiento = moment().toDate(),
        mecNit = '',
        mecSalario = 0,
        mecTelefono = '',
        findById,
        saveOrUpdate,
        cleanForm
    } = useMechanicStore();

    const { content: mechanicalSpecialty } = useMechanicalSpecialtyListStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            mecCodigo: mecCodigo ? mecCodigo : 0,
            mecNombres: values.mecNombres,
            mecApellidos: values.mecApellidos,
            mecAniosExperiencia: values.mecAniosExperiencia,
            mecCorreo: values.mecCorreo,
            mecDpi: values.mecDpi,
            mecFechaContratacion: values.mecFechaContratacion,
            mecFechaNacimiento: values.mecFechaNacimiento,
            mecNit: values.mecNit,
            mecSalario: values.mecSalario,
            mecTelefono: values.mecTelefono,
            emeCodigo: values.emeCodigo,
            especialidadMecanica: mechanicalSpecialty.find(specialty => specialty.emeCodigo === values.emeCodigo) || null,
        }, mecCodigo ? true : false);

        if(mecCodigo) {
            await findById(mecCodigo.toString());
        }

        if(isSuccess){
            onClean();
        }
    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/mechanic-list`);
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/mechanic-list`);
    }

   return (
    
    <FormLayout
            update={!!mecCodigo}
            initialValues={{mecDpi,mecNit,mecNombres,mecApellidos,mecAniosExperiencia,emeCodigo,mecCorreo,mecFechaContratacion,mecFechaNacimiento,mecSalario,mecTelefono}}
            validationSchema={mechanicValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'DPI'} name={'mecDpi'} xs={2} />
            <CustomInputText label={'Nombres'} name={'mecNombres'} xs={3}/>
            <CustomInputText label={'Apellidos'} name={'mecApellidos'} xs={3} />
            <CustomInputText label={'NIT'} name={'mecNit'}  xs={2}/>
            <CustomInputText label={'Teléfono'} name={'mecTelefono'}  xs={2}/>
            <CustomInputText label={'Correo electrónico'} name={'mecCorreo'}  xs={3}/>
            <CustomDatePicker label={'Fecha de nacimiento'} name={'mecFechaNacimiento'}  xs={2}/>
            <CustomInputText label={'Salario'} name={'mecSalario'} xs={2}/>
            <CustomDatePicker label={'Fecha de contratación'} name={'mecFechaContratacion'}  xs={2}/>
            <CustomInputText label={'Años de experiencia'} name={'mecAniosExperiencia'}  xs={2}/>
           
            <CustomSelect label={'Especialidad mecánica'} name={'emeCodigo'}  xs={3}>
                    {mechanicalSpecialty.map(specialty => (
                        <MenuItem key={specialty.emeCodigo} value={specialty.emeCodigo}>
                            {specialty.emeNombre}
                        </MenuItem>
                    ))}
                </CustomSelect>
        </FormLayout>
    );
}