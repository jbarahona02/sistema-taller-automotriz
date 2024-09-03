import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useVehiculoListStore } from "../../../../hooks";

const tableHeaders = ['Placa', 'Chasis', 'Modelo', 'Kilometraje', 'Cliente', 'Marca', 'Tipo', 'Acciones'];

export const VehiculoListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useVehiculoListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/vehiculo/`);
  };

  const onUpdate = (vehPlaca: string) => {
    if (vehPlaca !== null) {
      navigate(`${ADMIN_BASE_PATH}/vehiculo/${vehPlaca}`);
    }
  };

  const onDelete = (vehPlaca: string) => {
    if (vehPlaca !== null) {
      remove(vehPlaca);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];

    return content.map((item) => ({
      ...item,
      'cliente.cliNombres': item.cliente ? item.cliente.cliNombres : 'No disponible',
      'marcaVehiculo.mveNombre': item.marcaVehiculo ? item.marcaVehiculo.mveNombre : 'No disponible',
      'tipoVehiculo.tveNombre': item.tipoVehiculo ? item.tipoVehiculo.tveNombre : 'No disponible',
    }));
  };

  return (
    <>
      <TitleComponent title={'Vehiculos'} />

      <SearchBarLayout
        initialValues={{ placa : '', chasis: '', color: '', kilometraje: ''}}
        onSubmit={({placa, chasis, color, kilometraje}) => findAll(placa, chasis, color, kilometraje)}
        onClean={() => findAll()}
      >
        <CustomInputText label={'Placa'} name={'placa'} xs={11} />
        <CustomInputText label={'Chasis'} name={'chasis'} xs={11} />
        <CustomInputText label={'Color'} name={'color'} xs={11} />
        <CustomInputText label={'Kilometraje'} name={'kilometraje'} xs={8} />      
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['vehPlaca', 'vehNumeroChasis', 'vheModelo', 'vehKilometraje', 'cliente.cliNombres', 'marcaVehiculo.mveNombre', 'tipoVehiculo.tveNombre']}
        tableBody={renderTableBody()}
        idField="vehPlaca"
      />
    </>
  );
};
