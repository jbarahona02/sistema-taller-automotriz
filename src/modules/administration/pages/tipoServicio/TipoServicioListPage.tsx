import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useTipoServicioListStore } from "../../../../hooks";

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Estado', 'Acciones'];

export const TipoServicioListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useTipoServicioListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/tipo-servicio/`);
  };

  const onUpdate = (tsrCodigo: number) => {
    if (tsrCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/tipo-servicio/${tsrCodigo}`);
    }
  };

  const onDelete = (tsrCodigo: number) => {
    if (tsrCodigo !== null) {
      remove(tsrCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content.map((item) => ({
        ...item,
        'estado': item.tsrEstado
    }));
  };


  return (
    <>
      <TitleComponent title={'Tipos de Servicios'} />

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
        properties={['tsrCodigo', 'tsrNombre', 'tsrDescripcion', 'estado']}
        tableBody={renderTableBody()}
        idField="tsrCodigo"
      />
    </>
  );
};
