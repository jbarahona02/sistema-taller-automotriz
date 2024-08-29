import { useVehiculoStore } from "../../../hooks/vehiculo/useVehiculoStore";
import { FormikValues } from "formik";
import { FormLayout } from "../../../layout/FormLayout";
import { vehiculoValidationSchema } from "./validations/vehiculoValidationSchema";
import { CustomInputText, CustomSelect } from "../../../components/form";
import { useNavigate } from "react-router-dom";
import { ADMIN_BASE_PATH } from "../../../util";
import { MenuItem } from "@mui/material";
import { useClienteListStore, useTypeVehicleListStore, useVehicleBrandListStore } from "../../../hooks";

export const VehiculoForm = () => {
    const navigate = useNavigate();

    const {
        vehPlaca,
        vehNumeroChasis = '',
        vheModelo = 0,
        vheColor = '',
        vehKilometraje = 0,
        cliCodigo = null,
        mveCodigo = null,
        tveCodigo = null,
        saveOrUpdate,
        findById
    } = useVehiculoStore();

    const { content: cliente } = useClienteListStore();
    const { content: marcaVehiculo } = useVehicleBrandListStore();
    const { content: tipoVehiculo } = useTypeVehicleListStore();

    const onSubmit = async (values: FormikValues) => {
        await saveOrUpdate({
            vehPlaca: values.vehPlaca,
            vehNumeroChasis: values.vehNumeroChasis,
            vheModelo: values.vheModelo,
            vheColor: values.vheColor,
            vehKilometraje: values.vehKilometraje,
            cliCodigo: values.cliCodigo,
            mveCodigo: values.mveCodigo,
            tveCodigo: values.tveCodigo,
            cliente: cliente.find(t => t.cliCodigo === values.cliCodigo) || null,
            marcaVehiculo: marcaVehiculo.find(t => t.mveCodigo === values.mveCodigo) || null,
            tipoVehiculo: tipoVehiculo.find(t => t.tveCodigo === values.tveCodigo) || null
        },
        vehPlaca ? true : false
    );

        if (vehPlaca) {
            await findById(vehPlaca);
        }
    };

    const onClean = () => {
    
    };

    const onCancel = () => {
        navigate(`${ADMIN_BASE_PATH}/vehiculo-list`);
    };

    return (
        <FormLayout
            update={!!vehPlaca}
            initialValues={{ vehPlaca, vehNumeroChasis, vheModelo, vheColor, vehKilometraje, cliCodigo, mveCodigo, tveCodigo }}
            validationSchema={vehiculoValidationSchema}
            onSubmit={onSubmit}
            onClean={onClean}
            onCancel={onCancel}
        >
            <CustomInputText label={'Placa'} name={'vehPlaca'} />
            <CustomInputText label={'Número de chasis'} name={'vehNumeroChasis'} />
            <CustomInputText label={'Modelo'} name={'vheModelo'} />
            <CustomInputText label={'Color'} name={'vheColor'} />
            <CustomInputText label={'Kilometraje'} name={'vehKilometraje'} />
            <CustomSelect label={'Cliente'} name={'cliCodigo'}>
                {cliente.map(t => (
                    <MenuItem key={t.cliCodigo} value={t.cliCodigo}>
                        {t.cliNombres}
                    </MenuItem>
                ))}
            </CustomSelect>
            <CustomSelect label={'Marca de vehiculo'} name={'mveCodigo'}>
                {marcaVehiculo.map(t => (
                    <MenuItem key={t.mveCodigo} value={t.mveCodigo}>
                        {t.mveNombre}
                    </MenuItem>
                ))}
            </CustomSelect>
            <CustomSelect label={'Tipo de vehiculo'} name={'tveCodigo'}>
                {tipoVehiculo.map(t => (
                    <MenuItem key={t.tveCodigo} value={t.tveCodigo}>
                        {t.tveNombre}
                    </MenuItem>
                ))}
            </CustomSelect>
        </FormLayout>
    );
};
