import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useTypeVehicleListStore } from "../../../../hooks";

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Acciones'];

export const TypeVehicleListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useTypeVehicleListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/type-vehicle/`);
  };

  const onUpdate = (tveCodigo: number) => {
    if (tveCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/type-vehicle/${tveCodigo}`);
    }
  };

  const onDelete = (tveCodigo: number) => {
    if (tveCodigo !== null) {
      remove(tveCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content;
  };


  return (
    <>
      <TitleComponent title={'Tipos de vehiculos'} />

      <SearchBarLayout
        initialValues={{ nombre : ''}}
        onSubmit={({nombre}) => findAll(nombre)}
      >
        <CustomInputText label={'Nombre'} name={'nombre'} xs={20} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['tveCodigo', 'tveNombre', 'tveDescripcion']}
        tableBody={renderTableBody()}
        idField="tveCodigo"
      />
    </>
  );
};
