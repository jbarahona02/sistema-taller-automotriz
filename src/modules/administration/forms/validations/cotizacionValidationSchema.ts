import * as Yup from 'yup';


export const cotizacionValidationSchema = Yup.object({
    cotFechaCreacion: Yup
        .date()
        .required("La fecha de creación es requerida"),
    cotFechaVencimiento: Yup
        .date()
        .required('La fecha de vencimiento es requerida'),
    cotVigente: Yup
        .boolean()
        .required("El valor de vigencia es requerido"),
    cotSubtotal:  Yup
        .number()
        .min(0,"El valor debe ser mayor a 0")
        .required("El subtotal es requerido"),
    cotDescuento: Yup
        .number()
        .min(0,"Se debe ingresar un valor mayor o igual a cero")
        .max(100,"Solo se puede ingresar un valor de 100, porque representa el valor de porcentaje de descuento")
        .required("El porcentaje de descuento es requerido"),   
    cotTotal: Yup  
        .number()
        .min(0,"Se debe ingresar un valor mayor o igual a cero")
        .required("El total es requerido"),
    cliCodigo: Yup
        .number()
        .moreThan(0, 'El cliente es requerido')
        .required('El cliente es requerido'),
})