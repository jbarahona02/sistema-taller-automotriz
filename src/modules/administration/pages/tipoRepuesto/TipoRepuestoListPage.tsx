import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useTipoRepuestoListStore } from "../../../../hooks";

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Acciones'];

export const TipoRepuestoListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useTipoRepuestoListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/tipo-repuesto/`);
  };

  const onUpdate = (trpCodigo: number) => {
    if (trpCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/tipo-repuesto/${trpCodigo}`);
    }
  };

  const onDelete = (trpCodigo: number) => {
    if (trpCodigo !== null) {
      remove(trpCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content;
  };


  return (
    <>
      <TitleComponent title={'Tipo repuesto'} />

      <SearchBarLayout
        initialValues={{ nombreODescripcion : '' }}
        onSubmit={({nombreODescripcion}) => findAll(nombreODescripcion)}
        onClean={() => findAll()}
      >
        <CustomInputText label={'Nombre o Descripción'} name={'nombreODescripcion'} xs={20} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['trpCodigo', 'trpNombre', 'trpDescripcion']}
        tableBody={renderTableBody()}
        idField="trpCodigo"
      />
    </>
  );
};
