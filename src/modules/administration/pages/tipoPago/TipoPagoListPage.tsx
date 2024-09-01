import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useTipoPagoListStore } from "../../../../hooks";

const tableHeaders = ['Id', 'Nombre','Acciones'];

export const TipoPagoListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useTipoPagoListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/tipo-pago/`);
  };

  const onUpdate = (tpaCodigo: number) => {
    if (tpaCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/tipo-pago/${tpaCodigo}`);
    }
  };

  const onDelete = (tpaCodigo: number) => {
    if (tpaCodigo !== null) {
      remove(tpaCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content;
  };


  return (
    <>
      <TitleComponent title={'Tipos o formas de pago'} />

      <SearchBarLayout
        initialValues={{ nombre : ''}}
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
        properties={['tpaCodigo', 'tpaNombre']}
        tableBody={renderTableBody()}
        idField="tpaCodigo"
      />
    </>
  );
};
