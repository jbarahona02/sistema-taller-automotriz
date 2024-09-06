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
    return content.map((item) => ({
      ...item
    }));
  };


  return (
    <>
      <TitleComponent title={'Marcas de Equipos'} />

      <SearchBarLayout
        initialValues={{ search: '' }}
        onSubmit={({search}) => findAll(search)}
        onClean={() => findAll()}
      >
        <CustomInputText label={'Nombre o Descripción'} name={'search'} xs={20} />
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
