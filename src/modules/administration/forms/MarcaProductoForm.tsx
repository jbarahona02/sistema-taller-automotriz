import { useMarcaProductoStore } from "../../../hooks/marcaProducto/useMarcaProductoStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { marcaProductoValidationSchema } from "./validations/marcaProductoValidationSchema";
import { CustomInputText } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";

export const MarcaProductoForm = () => {

    const navigate = useNavigate();

    const {
        mapCodigo,
        mapNombre = '',
        saveOrUpdate,
        findById
    } = useMarcaProductoStore();

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({
            mapCodigo: mapCodigo ? mapCodigo : 0,
            mapNombre: values.mapNombre
        });
        if(mapCodigo) {
            await findById(Number(mapCodigo));
        }
    }

    const onClean = () => {

    }

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/marca-producto-list`);
    }

    return(
        <FormLayout
            update={!!mapCodigo}
            initialValues={{mapCodigo, mapNombre}}
            validationSchema={marcaProductoValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={"Nombre"} name={"mapNombre"}/>
        </FormLayout>
    );

};
