import { useDiasNoDisponiblesStore } from "../../../hooks/diasNoDisponibles/useDiasNoDisponiblesStore";
import { useTallerListStore } from "../../../hooks/taller/useTallerListStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { diasNoDisponiblesValidationSchema } from "./validations/diasNoDisponiblesValidationSchema";
import { CustomDatePicker, CustomInputText, CustomSelect } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import moment from "moment";
import { MenuItem } from "@mui/material";

export const DiasNoDisponiblesForm = () => {
    const navigate = useNavigate();

    const {
        dndCodigo,
        dndMotivo = '',
        dndFecha = moment().toDate(),
        tllCodigo = null,
        saveOrUpdate,
        findById
    } = useDiasNoDisponiblesStore();

    const { content: taller } = useTallerListStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            dndCodigo: dndCodigo ? dndCodigo : 0,
            dndMotivo: values.dndMotivo,
            dndFecha: values.dndFecha,
            tllCodigo: values.tllCodigo,
            taller: taller.find(t => t.tllCodigo === values.tllCodigo) || null
        });

        if (dndCodigo) {
            await findById(Number(dndCodigo));
        }

        if(isSuccess){
            onClean();
        }
    };

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/dias-no-disponibles-list`);
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/dias-no-disponibles-list`);
    };

    return (
        <FormLayout
            update={!!dndCodigo}
            initialValues={{ dndMotivo, dndFecha, tllCodigo }}
            validationSchema={diasNoDisponiblesValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Motivo'} name={'dndMotivo'} />
            <CustomDatePicker label={'Fecha'} name={'dndFecha'} />
            
            <CustomSelect label={'Taller'} name={'tllCodigo'}>
                {taller.map(t => (
                    <MenuItem key={t.tllCodigo} value={t.tllCodigo}>
                        {t.tllNombre}
                    </MenuItem>
                ))}
            </CustomSelect>
        </FormLayout>
    );
};
