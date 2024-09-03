
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";

import { CustomInputText, CustomSelect } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH, Utilities } from "../../../util";
import { MenuItem } from "@mui/material";
import { useHerramientaStore, useMarcaHerramientaListStore, useMechanicListStore } from "../../../hooks";
import { herramientaValidationSchema } from "./validations/herramientaValidationSchema";

export const HerramientaForm = () => {
    const navigate = useNavigate();

    const {
        herCodigo,
        herNombre = "",
        herDescripcion = "",
        herCondicion = 0,
        mecCodigo = null,
        mheCodigo = null,
        cleanForm,
        saveOrUpdate,
        findById
    } = useHerramientaStore();

    const { content: marcasHerramienta } = useMarcaHerramientaListStore();
    const { content: mecanicos } = useMechanicListStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            herCodigo: herCodigo ? herCodigo : 0,
            herNombre : values.herNombre,
            herDescripcion : values.herDescripcion,
            herCondicion: values.herCondicion,
            mheCodigo: values.mheCodigo,
            mecCodigo: values.mecCodigo,
            mecanico: mecanicos.find(mecanico => mecanico.mecCodigo === values.mecCodigo) || null,
            marcaHerramienta: marcasHerramienta.find(marca => marca.mheCodigo === values.mheCodigo) || null
        },
        herCodigo ? true : false
    );

        if (herCodigo) {
            await findById(herCodigo.toString());
        }

        if(isSuccess){
            onClean();
        }
    };

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/herramientas-list`);
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/herramientas-list`);
    };

    return (
        <FormLayout
            update={!!herCodigo}
            initialValues={{ herCodigo, herNombre, herDescripcion, herCondicion, mecCodigo, mheCodigo }}
            validationSchema={herramientaValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'herNombre'} xs={3}/>
            <CustomInputText label={'Descripción'} name={'herDescripcion'} />
            <CustomInputText label={'Condición de 1 a 10'} name={'herCondicion'} xs={2} />
           
            <CustomSelect label={'Mecánico'} name={'mecCodigo'} xs={4}>
                {mecanicos.map(mecanico => (
                    <MenuItem key={mecanico.mecCodigo} value={mecanico.mecCodigo}>
                       {`${mecanico.mecCodigo ? mecanico.mecCodigo + ' -' : ""}  ${Utilities.capitalizeFirstLetter(mecanico.mecNombres!)} 
                             ${Utilities.capitalizeFirstLetter(mecanico.mecApellidos!)}`}
                    </MenuItem>
                ))}
            </CustomSelect>
            <CustomSelect label={'Marca de herramienta'} name={'mheCodigo'} xs={3}>
                {marcasHerramienta.map(marca => (
                    <MenuItem key={marca.mheCodigo} value={marca.mheCodigo}>
                        {marca.mheNombre}
                    </MenuItem>
                ))}
            </CustomSelect>
            
        </FormLayout>
    );
};
