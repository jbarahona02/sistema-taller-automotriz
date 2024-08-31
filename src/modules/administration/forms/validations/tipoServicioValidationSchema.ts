import * as Yup from 'yup';

export const tipoServicioValidationSchema = Yup.object({
    tsrNombre: Yup
        .string()
        .max(15, 'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido'),
    tsrDescripcion: Yup
        .string()
        .max(80, 'La descripción puede ser de 150 caracteres máximo')
        .required('La descripción es requerida'),
})