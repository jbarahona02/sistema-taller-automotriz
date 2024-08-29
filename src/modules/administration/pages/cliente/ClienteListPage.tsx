import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useClienteListStore } from "../../../../hooks";

const tableHeaders = ['DPI', 'Nombres', 'Apellidos', 'Nit', 'Teléfono', 'Correo', 'Acciones'];

export const ClienteListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useClienteListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/cliente/`);
  };

  const onUpdate = (cliCodigo: number) => {
    if (cliCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/cliente/${cliCodigo}`);
    }
  };

  const onDelete = (cliCodigo: number) => {
    if (cliCodigo !== null) {
      remove(cliCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content;
  };


  return (
    <>
      <TitleComponent title={'Clientes'} />

      <SearchBarLayout
        initialValues={{ search: '' }}
        onSubmit={() => findAll()}
        onClean={() => findAll()}
        onClick={() => { }}
      >
        <CustomInputText label={'DPI'} name={'cliDpi'} xs={20} />
        <CustomInputText label={'Nombres'} name={'cliNombres'} xs={20} />
        <CustomInputText label={'Apellideos'} name={'cliApellidos'} xs={20} />
        <CustomInputText label={'NIT'} name={'cliNit'} xs={20} />
        <CustomInputText label={'Teléfono'} name={'cliTelefono'} xs={20} />
        <CustomInputText label={'Correo'} name={'cliCorreo'} xs={20} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['cliDpi', 'cliNombres', 'cliApellidos', 'cliNit', 'cliTelefono', 'cliCorreo']}
        tableBody={renderTableBody()}
        idField="cliCodigo"
      />
    </>
  );
};
