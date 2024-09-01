import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useMarcaHerramientaListStore } from "../../../../hooks";

const tableHeaders = ['Id', 'Nombre','Acciones'];

export const MarcaHerramientaListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useMarcaHerramientaListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/marca-herramienta/`);
  };

  const onUpdate = (mheCodigo: number) => {
    if (mheCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/marca-herramienta/${mheCodigo}`);
    }
  };

  const onDelete = (mheCodigo: number) => {
    if (mheCodigo !== null) {
      remove(mheCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content;
  };


  return (
    <>
      <TitleComponent title={'Marcas de herramientas'} />

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
        properties={['mheCodigo', 'mheNombre']}
        tableBody={renderTableBody()}
        idField="mheCodigo"
      />
    </>
  );
};
