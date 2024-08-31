import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useNivelGravedadListStore } from "../../../../hooks";

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Estado', 'Acciones'];

export const NivelGravedadListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useNivelGravedadListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/nivel-gravedad/`);
  };

  const onUpdate = (ngrCodigo: number) => {
    if (ngrCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/nivel-gravedad/${ngrCodigo}`);
    }
  };

  const onDelete = (ngrCodigo: number) => {
    if (ngrCodigo !== null) {
      remove(ngrCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content.map((item) => ({
      ...item,
      'estado': item.ngrEstado
    }));
  };



  return (
    <>
      <TitleComponent title={'Niveles de gravedad'} />

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
        properties={['ngrCodigo', 'ngrNombre', 'ngrDetalle', 'estado']}
        tableBody={renderTableBody()}
        idField="ngrCodigo"
      />
    </>
  );
};
