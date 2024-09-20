import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { CustomInputText, CustomSelect, CustomDatePicker } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { MenuItem } from "@mui/material";
import { useProveedorListStore, useMarcaProductoListaStore, useProductoStore } from "../../../hooks";
import { productoValidationSchema } from "./validations/productoValidationSchema";
import moment from "moment";

export const ProductoForm = () => {
    const navigate = useNavigate();

    const {
        proCodigo,
        proNombre = '',
        proDescripcion = '',
        proPrecioCompra = 0,
        proCantidadDisponible = 0,
        proFechaIngreso = moment().toDate(),
        prvCodigo = null,
        mapCodigo = null,
        saveOrUpdate,
        findById
    } = useProductoStore();

    const { content: proveedores } = useProveedorListStore();
    const { content: marcasProductos } = useMarcaProductoListaStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            proCodigo: proCodigo ? proCodigo : 0,
            proNombre: values.proNombre,
            proDescripcion: values.proDescripcion,
            proPrecioCompra: Number(values.proPrecioCompra),
            proCantidadDisponible: Number(values.proCantidadDisponible),
            proFechaIngreso: values.proFechaIngreso,
            prvCodigo: values.prvCodigo,
            mapCodigo: values.mapCodigo,
            proveedor: proveedores.find(proveedor => proveedor.prvCodigo === values.prvCodigo) || null,
            marcaProducto: marcasProductos.find(marcaP => marcaP.mapCodigo === values.mapCodigo) || null
        },
        proCodigo ? true : false
    );

        if (proCodigo) {
            await findById(proCodigo.toString());
        }

        if(isSuccess){
            onClean();
        }
    };

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/producto-list`);
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/producto-list`);
    };

    return (
        <FormLayout
            update={!!proCodigo}
            initialValues={{ proNombre, proDescripcion, proPrecioCompra, proCantidadDisponible, proFechaIngreso, prvCodigo, mapCodigo }}
            validationSchema={productoValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'proNombre'} xs={3}/>
            <CustomInputText label={'Descripción'} name={'proDescripcion'} xs={6}/>
            <CustomInputText label={'Precio de compra'} name={'proPrecioCompra'} xs={2}/>
            <CustomInputText label={'Cantidad disponible'} name={'proCantidadDisponible'} xs={2}/>
            <CustomDatePicker label={'Fecha de ingreso'} name={'proFechaIngreso'} restrictToToday={true} xs={3}/>

            <CustomSelect label={'Proveedor'} name={'prvCodigo'} xs={3}>
                {proveedores.map(t => (
                    <MenuItem key={t.prvCodigo} value={t.prvCodigo}>
                        {t.prvNombre}
                    </MenuItem>
                ))}
            </CustomSelect>
            <CustomSelect label={'Marca de producto'} name={'mapCodigo'} xs={3}>
                {marcasProductos.map(t => (
                    <MenuItem key={t.mapCodigo} value={t.mapCodigo}>
                        {t.mapNombre}
                    </MenuItem>
                ))}
            </CustomSelect>
        </FormLayout>
    );
};
