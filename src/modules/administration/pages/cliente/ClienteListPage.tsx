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
        initialValues={{ dpi : '', nit: '', telefono: '', correo: ''}}
        onSubmit={({dpi, nit, direccion, correo}) => findAll(dpi, nit, direccion, correo)}
        onClean={() => findAll()}
      >
        <CustomInputText label={'DPI'} name={'dpi'} xs={10} />
        <CustomInputText label={'NIT'} name={'nit'} xs={10} />
        <CustomInputText label={'Teléfono'} name={'telefono'} xs={10} />
        <CustomInputText label={'Correo'} name={'correo'} xs={10} />      
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
