import * as Yup from 'yup';

export const mechanicalSpecialtyValidationSchema = Yup.object({
    emeNombre : Yup
        .string()
        .max(50, 'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido'),
    emeDescripcion: Yup   
        .string()
        .max(150,'La descripción puede ser de 150 caracteres máximo')
        .required('La descripción es requerida')     
});