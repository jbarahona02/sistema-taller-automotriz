import * as Yup from 'yup';

export const productoValidationSchema = Yup.object({
    proNombre: Yup
        .string()
        .max(50, 'El nombre puede ser de 50 caracteres máximo')
        .required('El nombre es requerido'),
    proDescripcion: Yup
        .string()
        .max(150, 'La descripción puede ser de 150 caracteres máximo')
        .required('La descripción es requerida'),
    proPrecioCompra: Yup
        .number()
        .min(0, 'El precio debe ser mayor o igual a cero')
        .required('El precio es requerido'),
    proCantidadDisponible: Yup
        .number()
        .moreThan(0,"La cantidad disponible debe ser mayor o igual a cero")
        .required('La cantidad disponible es requerida'),
    proFechaIngreso: Yup
        .date()
        .required('La fecha de ingreso es requerida'),
    prvCodigo: Yup
        .number()
        .moreThan(0, 'El proveedor es requerido')
        .required('El proveedor es requerido'),
    mapCodigo: Yup
        .number()
        .moreThan(0, 'La marca de producto es requerida')
        .required('La marca de producto es requerida'),
})