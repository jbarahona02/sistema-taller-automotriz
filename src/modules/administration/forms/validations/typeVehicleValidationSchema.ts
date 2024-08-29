import * as Yup from 'yup';


export const typeVehicleValidationSchema = Yup.object({
    tveNombre : Yup
        .string()
        .max(40,'El nombre puede ser de 40 caracteres máximo')
        .required('El nombre es requerido'),
    tveDescripcion : Yup
        .string()
        .max(150,'La descripción puede ser de 150 caracteres máximo')
        .required('La descripción es requerido'),
})