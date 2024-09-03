import * as Yup from 'yup';


export const repuestoValidationSchema = Yup.object({
    repNombre: Yup
        .string()
        .max(50, 'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido'),
    repDescripcion: Yup
        .string()
        .max(150, 'La descripción puede ser de 150 caracteres máximo')
        .required('La descripción es requerida'),
    repOriginal: Yup
        .boolean()
        .required('El valor de originalidad es requerido'),
    repPrecio: Yup
        .number()
        .min(0,"El precio debe ser mayor o igual a cero")
        .required('El precio es requerido'),
    repCantidadDisponible: Yup
        .number()
        .moreThan(0, 'La cantidad debe ser mayor a cero')
        .required('La cantidad es requerida'),
    prvCodigo: Yup
        .number()
        .moreThan(0, 'El proveedor es requerido')
        .required('El proveedor es requerido'),
    trpCodigo: Yup
        .number()
        .moreThan(0, 'El tipo de repuesto es requerido')
        .required('El tipo de repuesto es requerido'),
})