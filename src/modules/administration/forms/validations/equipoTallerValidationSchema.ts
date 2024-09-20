import * as Yup from 'yup';

export const equipoTallerValidationSchema = Yup.object({
    etaNombre: Yup
        .string()
        .max(50, 'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido'),
    etaDescripcion: Yup
        .string()
        .max(150, 'La descripción puede ser de 150 caracteres máximo')
        .required('La descripción es requerida'),
    etaModelo: Yup
        .string()
        .max(50, 'El modelo puede ser de 150 caracteres máximo')
        .required('El modelo es requerido'),
    etaFechaIngreso: Yup
        .date()
        .required('La fecha de ingreso es requerida'),
    etaEstado: Yup
        .number()
        .moreThan(0, 'El porcentaje de estado debe ser mayor a cero')
        .lessThan(100, 'El porcentaje de estado debe ser menor a cien')
        .required('El porcentaje de estado es requerido'),
    mecCodigo: Yup
        .number()
        .moreThan(0, 'El mecanico es requerido')
        .required('El mecanico es requerido'),
    meqCodigo: Yup
        .number()
        .moreThan(0, 'La marca del equipo es requerida')
        .required('La marca del equipo es requerida'),
})