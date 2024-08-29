import * as Yup from 'yup';


export const nivelGravedadValidationSchema = Yup.object({
    ngrNombre : Yup
        .string()
        .max(50,'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido'),
    ngrDetalle : Yup
        .string()
        .max(50,'El detalle puede ser de 50 caracteres máximo')
        .required('El detalle es requerido'),
})