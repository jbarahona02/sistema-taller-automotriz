import * as Yup from 'yup';

export const crearOrdenValidations = Yup.object({
    diasGarantia : Yup
        .number()
        .typeError('Solo se aceptan números')
        .integer('Solo se aceptan números enteros')
        .required('Los días de garantía son requeridos')
        .positive('No valores negativos')
        .min(1, 'Se necesita al menos 1 día de garantía'),
    detalleEstadoPrevio : Yup
        .string()
        .trim()
        .required('El estado previo es requerido')
        .max(250, 'Máximo 250 cáracteres'),
    tallCodigo: Yup
        .number()
        .moreThan(0, 'El taller es requerido')
        .required('El taller es requerido')
})


export const desperfectoValidations = Yup.object({
    desperfecto: Yup
        .string()
        .trim()
        .max(200, 'Máximo 200 cáracteres')
        .required('El desperfecto es requerido')
});

export const agregarServicioValidations = (ordenDiasGarantia: number) => {
    return Yup.object({
        estadoPrevio: Yup
            .string()
            .trim()
            .max(200, 'Máximo 200 cáracteres')
            .required('El estado previo es requerido'),
        diasGarantia: Yup
            .number()
            .typeError('Solo números')
            .integer('Solo números enteros')
            .positive('Solo números postivios')
            .min(1, 'Mínimo 1 día de garantía')
            .max(ordenDiasGarantia, `Máximo ${ordenDiasGarantia} días de garantía`)
            .required('Los días de garantía son requeridos'),
        srvCodigo: Yup
            .number()
            .moreThan(0, 'El servicio es requerido'),
        mecCodigo: Yup
            .number()
            .moreThan(0, 'El mecánico es requerido')
    });
}


export const agregarProductoValidations = Yup.object({
    cantidad: Yup
        .number()
        .typeError('Solo números')
        .integer('Solo números enteros')
        .positive('Solo números postivios')
        .min(1, 'Mínimo 1 producto')
        .required('La cantidad requerida'),
    proCodigo: Yup
        .number()
        .moreThan(0, 'El producto es requerido')
});

export const agregarRepuestoValidations = Yup.object({
    cantidad: Yup
        .number()
        .typeError('Solo números')
        .integer('Solo números enteros')
        .positive('Solo números postivios')
        .min(1, 'Mínimo 1 repuesto')
        .required('La cantidad requerida'),
    repCodigo: Yup
        .number()
        .moreThan(0, 'El repuesto es requerido')
});
