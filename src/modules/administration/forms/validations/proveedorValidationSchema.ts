import * as Yup from 'yup';

export const proveedorValidationSchema = Yup.object({
    prvNombre: Yup
        .string()
        .max(50, 'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido'),
    prvNombreContacto: Yup
        .string()
        .max(50,'El nombre de contacto puede ser de 50 caracteres máximo')
        .required('Los apellidos son requeridos'),
    prvTelefono: Yup
        .string()
        .matches(/^\+\d{1,4} \d{4}-\d{4}$/, 'El número de teléfono no es válido. Debe seguir el formato "extensión 1234-5678"')
        .max(15,'El teléfono puede ser de 15 caracteres máximo')
        .required('El teléfono es requerido'),
    prvCorreo: Yup
        .string()
        .max(20,'El correo puede ser de 20 caracteres máximo')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "El correo electrónico no es válido"
        )
        .required('El correo es requerido'), 
    prvEstado: Yup
        .boolean()
        .required('El estado es requerido')
})