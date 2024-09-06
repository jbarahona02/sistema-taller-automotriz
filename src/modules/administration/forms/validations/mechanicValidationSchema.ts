import * as Yup from 'yup';
import moment from 'moment-timezone';

export const mechanicValidationSchema = Yup.object({
    mecDpi : Yup
        .string()
        .max(15,'El DPI puede ser de 15 caracteres máximo')
        .required('El DPI es requerido'),
    mecNombres: Yup
        .string()
        .max(80, 'Los nombres pueden ser de 80 caracteres máximo')
        .required('Los nombres son requeridos'),
    mecApellidos: Yup
        .string()
        .max(80,'Los apellidos pueden ser de 80 caracteres máximo')
        .required('Los apellidos son requeridos'),
    mecNit: Yup
        .string()
        // .matches(/^\d{9}$|^\d{7}-\d{1}$|^\d{8}-\d{1}$/, 
        //     "El campo debe tener 9 dígitos o un formato de 7 o 8 dígitos seguidos de un guión y un dígito")
        .max(10,'El NIT puede ser de 10 caracteres máximo')
        .required('El NIT es requerido'),
    mecTelefono: Yup
        .string()
        //.matches(/^\d{1,6}-\d{4}-\d{4}$/, 'El número de teléfono no es válido. Debe seguir el formato "extensión 1234-5678"')
        .max(15, 'El teléfono puede ser de 15 caracteres máximo')
        .required('El teléfono es requerido'),
    mecCorreo: Yup
        .string()
        .max(20,'El correo puede ser de 20 caracteres máximo')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "El correo electrónico no es válido"
        )
        .required('El correo es requerido'),  
    mecFechaNacimiento: Yup
        .date()
        .max(moment().toDate(), "La fecha no puede ser mayor a la fecha actual")
        // .min(
        //     moment().subtract(18, 'years').toDate(),
        //     "Debe ser mayor de edad"
        // )
        .required('La fecha de nacimiento es requerida'),
    mecSalario: Yup
        .number()
        .min(1,'El salario debe ser un valor mayor o igual a 1')
        .required('El salario es requerido'),
    mecFechaContratacion: Yup 
        .date()
        .max(moment().toDate(), "La fecha no puede ser mayor a la fecha actual")
        .required('La fecha de contratación requerida'),
    mecAniosExperiencia: Yup
        .number()
        .min(0,'Los años de experiencia deben ser un valor mayor o igual a 0'),
    emeCodigo: Yup 
        .number()
        .moreThan(0, 'El código de especialidad es requerido')
        .required('La especialidad mecánica es requerida'),
})