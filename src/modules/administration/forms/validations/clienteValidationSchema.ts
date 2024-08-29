import * as Yup from 'yup';


export const clienteValidationSchema = Yup.object({
    cliDpi: Yup
        .string()
        .max(15, 'El DPI puede ser de 15 caracteres máximo')
        .required('El DPI es requerido'),
    cliNombres: Yup
        .string()
        .max(80, 'El nombre puede ser de 80 caracteres máximo')
        .required('El nombre es requerido'),
    cliApellidos: Yup
        .string()
        .max(80, 'El apellido puede ser de 80 caracteres máximo')
        .required('El apellido es requerido'),
    cliNit: Yup
        .string()
        .max(10, 'El NIT puede ser de 10 caracteres máximo')
        .required('El NIT es requerido'),
    cliTelefono: Yup
        .string()
        .max(15, 'El teléfono puede ser de 15 caracteres máximo')
        .required('El teléfono es requerido'),
    cliCorreo: Yup
        .string()
        .max(20, 'El correo puede ser de 20 caracteres máximo')
        .required('El correo es requerido'),
})