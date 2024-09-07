import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useVehicleBrandListStore } from "../../../../hooks";

const tableHeaders = ['Id', 'Nombre', 'Acciones'];

export const VehicleBrandListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useVehicleBrandListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/vehicle-brand/`);
  };

  const onUpdate = (mveCodigo: number) => {
    if (mveCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/vehicle-brand/${mveCodigo}`);
    }
  };

  const onDelete = (mveCodigo: number) => {
    if (mveCodigo !== null) {
      remove(mveCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content;
  };


  return (
    <>
      <TitleComponent title={'Marcas de vehículos'} />

      <SearchBarLayout
        initialValues={{ nombre : '' }}
        onSubmit={({nombre}) => findAll(nombre)}
        onClean={() => findAll()}
      >
        <CustomInputText label={'Nombre'} name={'nombre'} xs={20} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['mveCodigo', 'mveNombre']}
        tableBody={renderTableBody()}
        idField="mveCodigo"
      />
    </>
  );
};
