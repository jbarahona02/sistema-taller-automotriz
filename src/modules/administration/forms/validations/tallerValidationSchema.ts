import * as Yup from 'yup';


export const tallerValidationSchema = Yup.object({
    tllNombre : Yup
        .string()
        .max(40,'El nombre puede ser de 40 caracteres máximo')
        .required('El nombre es requerido'),
    tllTelefono : Yup
        .string()
        .max(10,'El telefono puede ser de 10 caracteres máximo')
        .required('El telefono es requerido'),
    tllDireccion : Yup
        .string()
        .max(150,'La dirección puede ser de 150 caracteres máximo')
        .required('La dirección es requerida'),
    tllCorreo : Yup
        .string()
        .max(30,'El correo puede ser de 30 caracteres máximo')
        .required('El correo es requerido'),
})