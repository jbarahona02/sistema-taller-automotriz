import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useTallerListStore } from "../../../../hooks";

const tableHeaders = ['Nombre', 'Télefono', 'Dirección', 'Correo', 'Acciones'];

export const TallerListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useTallerListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/taller/`);
  };

  const onUpdate = (tllCodigo: number) => {
    if (tllCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/taller/${tllCodigo}`);
    }
  };

  const onDelete = (tllCodigo: number) => {
    if (tllCodigo !== null) {
      remove(tllCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content;
  };


  return (
    <>
      <TitleComponent title={'Talleres'} />

      <SearchBarLayout
        initialValues={{ search: '' }}
        onSubmit={() => findAll()}
        onClean={() => findAll()}
        onClick={() => { }}
      >
        <CustomInputText label={'Nombre'} name={'tllNombre'} xs={20} />
        <CustomInputText label={'Télefono'} name={'tllTelefono'} xs={20} />
        <CustomInputText label={'Dirección'} name={'tllDireccion'} xs={20} />
        <CustomInputText label={'Correo'} name={'tllCorreo'} xs={20} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['tllNombre', 'tllTelefono', 'tllDireccion', 'tllCorreo']}
        tableBody={renderTableBody()}
        idField="tllCodigo"
      />
    </>
  );
};
