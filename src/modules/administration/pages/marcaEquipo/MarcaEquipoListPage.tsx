import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useMarcaEquipoListStore } from "../../../../hooks";

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Acciones'];

export const MarcaEquipoListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useMarcaEquipoListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/marca-equipo/`);
  };

  const onUpdate = (meqCodigo: number) => {
    if (meqCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/marca-equipo/${meqCodigo}`);
    }
  };

  const onDelete = (meqCodigo: number) => {
    if (meqCodigo !== null) {
      remove(meqCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
    return content;
  };


  return (
    <>
      <TitleComponent title={'Marcas de Equipos'} />

      <SearchBarLayout
        initialValues={{ search: '' }}
        onSubmit={() => findAll()}
        onClean={() => findAll()}
        onClick={() => { }}
      >
        <CustomInputText label={'Nombre'} name={'meqNombre'} xs={20} />
        <CustomInputText label={'Descripción'} name={'meqDescripcion'} xs={20} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['meqCodigo', 'meqNombre', 'meqDescripcion']}
        tableBody={renderTableBody()}
        idField="meqCodigo"
      />
    </>
  );
};
