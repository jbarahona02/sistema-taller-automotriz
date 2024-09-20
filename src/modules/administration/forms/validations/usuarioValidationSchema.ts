import * as Yup from 'yup';

export const usuarioValidationSchema = Yup.object({
    usrContrasenia: Yup
        .string()
        .max(50, 'La contraseña puede ser de 50 caracteres máximo')
        .min(8, 'La contraseña debe tener un mínimo de 8 caracteres')
        .required('La contraseña es requerida'),
    usrEstado: Yup
        .boolean()
        .required('El estado es requerido'),
    usrAdministrador: Yup
        .boolean()
        .required('El valor de administrador es requerido'),
    mecCodigo: Yup
        .number()
        .moreThan(0, 'Debe seleccionar un Mecánico'),
    cliCodigo: Yup
        .number()
        .moreThan(0, 'Debe seleccionar un Cliente'),
    oneRequired: Yup
        .mixed()
        .test('oneRequired', 'Al menos uno de los campos es requerido', function() {
            const { mecCodigo, cliCodigo } = this.parent;
            return mecCodigo || cliCodigo;
        })
})
