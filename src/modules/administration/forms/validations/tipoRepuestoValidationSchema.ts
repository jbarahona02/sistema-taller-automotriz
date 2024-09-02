import * as Yup from 'yup';

export const tipoRepuestoValidationSchema = Yup.object({
    trpNombre : Yup
        .string()
        .max(50, 'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido'),
    trpDescripcion: Yup   
        .string()
        .max(50,'La descripción puede ser de 50 caracteres máximo')
        .required('La descripción es requerida')     
});