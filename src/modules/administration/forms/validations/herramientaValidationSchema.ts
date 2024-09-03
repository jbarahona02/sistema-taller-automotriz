import * as Yup from 'yup';

export const herramientaValidationSchema = Yup.object({
    herNombre: Yup
        .string()
        .max(50, 'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido'),
    herDescripcion: Yup
        .string()
        .max(150,'La descripción puede ser de 150 caracteres máximo')
        .required('La descripción es requerida'),
    herCondicion: Yup
        .number()
        .min(1, 'La condición debe estar en una escala de 1 a 10')
        .max(10,'La condición solo puede estar en una escala de 1 a 10')
        .required('La condición es requerida'),
    mecCodigo: Yup 
        .number()
        .moreThan(0, 'El código de mecánico debe ser mayor o igual a 1')
        .required('El mecánico es requerido'),
    mheCodigo: Yup  
        .number()
        .moreThan(0, 'El código de la marca de herramienta debe ser mayor o igual a 1')
        .required('La marca de la herramienta es requerida'),
})