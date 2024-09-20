import * as Yup from 'yup';

export const citaValidationSchema = Yup.object({
    ctaFechaHora: Yup
        .date()
        .required('La fecha es requerida'),
    ctaEstado: Yup
        .boolean()
        .required('El estado es requerido'),
    ctaDescripcion: Yup
        .string()
        .max(250, 'La descripción puede ser de 250 caracteres máximo')
        .required('La descripción es requerida'),
    ctaDuracionEstimadaMin: Yup
        .number()
        .required('La duración estimada es requerida'),
    ctaConfirmacion: Yup
        .boolean(),
    vehPlaca: Yup
        .string()
        .max(10, 'La placa puede ser de 10 caracteres máximo')
        .required('La placa es requerida'),
})