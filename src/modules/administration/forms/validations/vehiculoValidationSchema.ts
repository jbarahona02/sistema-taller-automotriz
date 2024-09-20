import * as Yup from 'yup';


export const vehiculoValidationSchema = Yup.object({
    vehPlaca: Yup
        .string()
        .max(10, 'La placa puede ser de 10 caracteres máximo')
        .required('La placa es requerida'),
    vehNumeroChasis: Yup
        .string()
        .max(20, 'El número de chasis puede ser de 20 caracteres máximo')
        .required('El número de chasis es requerido'),
    vheModelo: Yup
        .number()
        .moreThan(0, 'Modelo es requerido')
        .required('El modelo es requerido'),
    vheColor: Yup
        .string()
        .max(20, 'El color puede ser de 20 caracteres máximo')
        .required('El color es requerido'),
    vehKilometraje: Yup
        .number()
        .moreThan(0, 'Kilometraje es requerido')
        .required('El kilometraje es requerido'),
    cliCodigo: Yup
        .number()
        .moreThan(0, 'Cliente es requerido')
        .required('El cliente es requerido'),
    mveCodigo: Yup
        .number()
        .moreThan(0, 'Marca de vehiculo es requerido')
        .required('La marca de vehiculo es requerida'),
    tveCodigo: Yup
        .number()
        .moreThan(0, 'Tipo de vehiculo es requerido')
        .required('El tipo de vehiculo es requerido'),
})