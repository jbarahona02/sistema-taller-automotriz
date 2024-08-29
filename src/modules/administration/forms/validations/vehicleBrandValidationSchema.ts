import * as Yup from 'yup';


export const vehicleBrandValidationSchema = Yup.object({
    mveNombre : Yup
        .string()
        .max(40,'El nombre puede ser de 40 caracteres máximo')
        .required('El nombre es requerido')
})