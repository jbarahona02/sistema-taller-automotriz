import * as Yup from 'yup';

export const servicioValidationSchema = Yup.object({
    srvNombre: Yup
        .string()
        .max(50, 'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido'),
    srvDescripcion: Yup
        .string()
        .max(150, 'La descripción puede ser de 150 caracteres máximo')
        .required('La descripción es requerida'),
    srvCosto: Yup
        .number()
        .min(0, 'El costo debe ser mayor o igual a cero')
        .required('El costo es requerido'),
    srvEstado: Yup
        .boolean()
        .required('El estado es requerido'),
    tsrCodigo: Yup
        .number()
        .moreThan(0, 'El tipo de servicio es requerido')
        .required('El tipo de servicio es requerido'),
})