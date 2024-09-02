
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { useTipoPagoStore } from "../../../hooks";
import {  } from "./validations/marcaHerramientaValidationSchema";
import { tipoPagoValidationSchema } from "./validations/tipoPagoValidationSchema";

export const TipoPagoForm = () => {
    const navigate = useNavigate();
    
    const {
        tpaCodigo,
        tpaNombre = "",
        saveOrUpdate,
        findById
    } = useTipoPagoStore();

    const onSubmit = async (values: FormikValues) => {
        let params : any = {};

        if(tpaCodigo) params.tpaCodigo = tpaCodigo

        params.tpaNombre = values.tpaNombre
        const isSuccess = await saveOrUpdate(params);
        if(tpaCodigo){
            await findById(Number(tpaCodigo));
        }

        if(isSuccess){
            onClean();
        }    
    }

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/tipo-pago-list`);
    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/tipo-pago-list`);
    }

    return (
        <FormLayout
            update={!!tpaCodigo}
            initialValues={{ tpaNombre }}
            validationSchema={tipoPagoValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'tpaNombre'}  xs={3} />
        </FormLayout>
    );
};
