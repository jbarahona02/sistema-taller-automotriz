import {  } from "../../../hooks/vehiculo/useVehiculoStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import {  } from "./validations/vehiculoValidationSchema";
import { CustomInputText, CustomSelect, CustomSwitchComponent } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { MenuItem } from "@mui/material";
import { useProveedorListStore, useRepuestoStore, useTipoRepuestoListStore } from "../../../hooks";
import { repuestoValidationSchema } from "./validations/repuestoValidationSchema";

export const RepuestoForm = () => {
    const navigate = useNavigate();

    const {
        repCodigo,
        repNombre = '',
        repDescripcion = '',
        repOriginal = true,
        repPrecio = 0,
        repCantidadDisponible = 0,
        prvCodigo = null,
        trpCodigo = null,
        saveOrUpdate,
        findById
    } = useRepuestoStore();

    const { content: proveedores } = useProveedorListStore();
    const { content: tipoRepuestos } = useTipoRepuestoListStore();

    const onSubmit = async (values: FormikValues) => {
        const isSuccess = await saveOrUpdate({
            repCodigo: repCodigo ? repCodigo : 0,
            repNombre: values.repNombre,
            repDescripcion: values.repDescripcion,
            repOriginal: values.repOriginal,
            repPrecio: Number(values.repPrecio),
            repCantidadDisponible: Number(values.repCantidadDisponible),
            prvCodigo: values.prvCodigo,
            trpCodigo: values.trpCodigo,
            proveedor: proveedores.find(proveedor => proveedor.prvCodigo === values.prvCodigo) || null,
            tipoRepuesto: tipoRepuestos.find(tipoR => tipoR.trpCodigo === values.trpCodigo) || null
        },
        repCodigo ? true : false
    );

        if (repCodigo) {
            await findById(repCodigo.toString());
        }

        if(isSuccess){
            onClean();
        }
    };

    const onClean = () => {
        navigate(`${ADMIN_BASE_PATH}/repuestos-list`);
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/repuestos-list`);
    };

    return (
        <FormLayout
            update={!!repCodigo}
            initialValues={{ repNombre, repDescripcion, repOriginal, repPrecio, repCantidadDisponible, prvCodigo, trpCodigo }}
            validationSchema={repuestoValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Nombre'} name={'repNombre'} xs={3}/>
            <CustomInputText label={'Descripción'} name={'repDescripcion'} xs={6}/>
            <CustomInputText label={'Precio'} name={'repPrecio'} xs={2}/>
            <CustomInputText label={'Cantidad disponible'} name={'repCantidadDisponible'} xs={2}/>
            <CustomSelect label={'Proveedor'} name={'prvCodigo'} xs={3}>
                {proveedores.map(t => (
                    <MenuItem key={t.prvCodigo} value={t.prvCodigo}>
                        {t.prvNombre}
                    </MenuItem>
                ))}
            </CustomSelect>
            <CustomSelect label={'Tipo de repuesto'} name={'trpCodigo'} xs={3}>
                {tipoRepuestos.map(t => (
                    <MenuItem key={t.trpCodigo} value={t.trpCodigo}>
                        {t.trpNombre}
                    </MenuItem>
                ))}
            </CustomSelect>
            <CustomSwitchComponent label={'Es original'} name={'repOriginal'} />
        </FormLayout>
    );
};
