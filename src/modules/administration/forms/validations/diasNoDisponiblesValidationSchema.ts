import * as Yup from 'yup';


export const diasNoDisponiblesValidationSchema = Yup.object({
    dndMotivo: Yup
        .string()
        .max(150, 'El motivo puede ser de 150 caracteres máximo')
        .required('El motivo es requerido'),
    dndFecha: Yup
        .date()
        .required('La fecha es requerida'),
    tllCodigo: Yup
        .number()
        .moreThan(0, 'Taller es requerido')
        .required('El taller es requerido'),
})