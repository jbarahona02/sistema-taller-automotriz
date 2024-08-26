import * as Yup from 'yup';


export const mechanicValidationSchema = Yup.object({
    mecDpi : Yup
        .string()
        .max(15,'El DPI puede ser de 15 caracteres máximo')
        .required('El DPI es requerido'),
    mecNombre: Yup
        .string()
        .max(80, 'Los nombres pueden ser de 80 caracteres máximo')
        .required('Los nombres son requeridos'),
    mecApellidos: Yup
        .string()
        .max(80,'Los apellidos pueden ser de 80 caracteres máximo')
        .required('Los apellidos son requeridos'),
    mecNit: Yup
        .string()
        .max(10,'El NIT puede ser de 10 caracteres máximo')
        .required('El NIT es requerido'),
    mecTelefono: Yup
        .string()
        .max(15, 'El teléfono puede ser d 15 caracteres máximo')
        .required('El teléfono es requerido'),
    mecCorreo: Yup
        .string()
        .max(20,'El correo puede ser de 20 caracteres máximo')
        .required('El correo es requerido'),  
    mecFechaNacimiento: Yup
        .date()
        .required('La fecha de nacimiento requerida'),
    mecSalario: Yup
        .number()
        .min(1,'El salario debe ser un valor mayor o igual a 1')
        .required('El salario es requerido'),
    mecFechaContratacion: Yup 
        .date()
        .required('La fecha de contratación requerida'),
    mecAniosExperiencia: Yup
        .number()
        .min(0,'Los años de experiencia deben ser un valor mayor o igual a 0'),
    mecCodigoEspecialidad: Yup 
        .number()
        .moreThan(0, 'El código de especialidad es requerido')
        .required('El código de especialidad es requerida'),
})