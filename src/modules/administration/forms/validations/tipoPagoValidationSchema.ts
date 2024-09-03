import * as Yup from 'yup';


export const tipoPagoValidationSchema = Yup.object({
    tpaNombre : Yup
        .string()
        .max(50,'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido')
})