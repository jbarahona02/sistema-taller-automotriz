import * as Yup from 'yup';

export const marcaHerramientaValidationSchema = Yup.object({
    mheNombre : Yup
        .string()
        .max(50, 'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido')
});