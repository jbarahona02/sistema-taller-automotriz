import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { CustomInputText, CustomSelect, CustomDatePicker } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { MenuItem } from "@mui/material";
import { useMechanicListStore, useMarcaEquipoListStore, useEquipoTallerStore } from "../../../hooks";
import { equipoTallerValidationSchema } from "./validations/equipoTallerValidationSchema";
import moment from "moment";

export const EquipoTallerForm = () => {
    const navigate = useNavigate();

    const {
        etaCodigo,
        etaNombre = '',
        etaDescripcion = '',
        etaModelo = '',
        etaFechaIngreso = moment().toDate(),
        etaEstado = 0,
        mecCodigo = null,
        meqCodigo = null,
        saveOrUpdate,
        findById
    } = useEquipoTallerStore();

    const { content: mecanicos } = useMechanicListStore();
    const { content: marcasEquipos } = useMarcaEquipoListStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            etaCodigo: etaCodigo ? etaCodigo : 0,
            etaNombre: values.etaNombre,
            etaDescripcion: values.etaDescripcion,
            etaModelo: values.etaModelo,
            etaFechaIngreso: values.etaFechaIngreso,
            etaEstado: Number(values.etaEstado),
            mecCodigo: values.mecCodigo,
            meqCodigo: values.meqCodigo,
            mecanico: mecanicos.find(mecanico => mecanico.mecCodigo === values.mecCodigo) || null,
            marcaEquipo: marcasEquipos.find(marcaE => marcaE.meqCodigo === values.meqCodigo) || null
        },
        etaCodigo ? true : false
    );

        if (etaCodigo) {
            await findById(etaCodigo.toString());
        }

        if(isSuccess){
            onClean();
        }
    };

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/equipo-taller-list`);
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/equipo-taller-list`);
    };

    return (
        <FormLayout
            update={!!etaCodigo}
            initialValues={{ etaNombre, etaDescripcion, etaModelo, etaFechaIngreso, etaEstado, mecCodigo, meqCodigo }}
            validationSchema={equipoTallerValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'etaNombre'} xs={3}/>
            <CustomInputText label={'Descripción'} name={'etaDescripcion'} xs={6}/>
            <CustomInputText label={'Modelo'} name={'etaModelo'} xs={2}/>
            <CustomDatePicker label={'Fecha de ingreso'} name={'etaFechaIngreso'} restrictToToday={true} xs={2}/>
            <CustomInputText label={'Estado'} name={'etaEstado'} xs={2}/>
            <CustomSelect label={'Mecanico'} name={'mecCodigo'} xs={3}>
                {mecanicos.map(t => (
                    <MenuItem key={t.mecCodigo} value={t.mecCodigo}>
                        {t.mecNombres}
                    </MenuItem>
                ))}
            </CustomSelect>
            <CustomSelect label={'Marca de equipo'} name={'meqCodigo'} xs={3}>
                {marcasEquipos.map(t => (
                    <MenuItem key={t.meqCodigo} value={t.meqCodigo}>
                        {t.meqNombre}
                    </MenuItem>
                ))}
            </CustomSelect>
        </FormLayout>
    );
};
