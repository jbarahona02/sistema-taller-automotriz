import * as Yup from 'yup';


export const tallerValidationSchema = Yup.object({
    tllNombre : Yup
        .string()
        .max(40,'El nombre puede ser de 40 caracteres máximo')
        .required('El nombre es requerido'),
    tllTelefono : Yup
        .string()
        .max(10,'El teléfono puede ser de 10 caracteres máximo')
        .matches(/^\d{4}-\d{4}$/, 'El número de teléfono no es válido. Debe seguir el formato "1234-5678"')
        .required('El teléfono es requerido'),
    tllDireccion : Yup
        .string()
        .max(150,'La dirección puede ser de 150 caracteres máximo')
        .required('La dirección es requerida'),
    tllCorreo : Yup
        .string()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "El correo electrónico no es válido"
        )
        .max(20,'El correo puede ser de 20 caracteres máximo')
        .required('El correo es requerido'),
})