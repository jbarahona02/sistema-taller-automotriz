import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useUsuarioListStore } from "../../../../hooks";

const tableHeaders = ['DPI', 'Nombres', 'Apellidos', 'Tipo Usuario', 'Es administrador'];

export const UsuarioListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useUsuarioListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/usuario/`);
  };

  const onUpdate = (usrCodigo: string) => {
    if (usrCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/usuario/${usrCodigo}`);
    }
  };

  const onDelete = (usrCodigo: string) => {
    if (usrCodigo !== null) {
      remove(usrCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];

    return content.map((item) => ({
      ...item,
      'estado': item.usrAdministrador,
      'dpi': item.cliente ? item.cliente.cliDpi : (item.mecanico ? item.mecanico.mecDpi : 'No disponible'),
      'nombre': item.cliente ? item.cliente.cliNombres : (item.mecanico ? item.mecanico.mecNombres : 'No disponible'),
      'apellido': item.cliente ? item.cliente.cliApellidos : (item.mecanico ? item.mecanico.mecApellidos : 'No disponible'),
      'tipo': item.cliente ? 'Cliente' : (item.mecanico ? 'Mecánico' : 'No disponible')
    }));
  };

  return (
    <>
      <TitleComponent title={'Usuarios'} />

      <SearchBarLayout
        initialValues={{ 
            clienteNombre: '', mecanicoNombre: '', clienteDpi: '', mecanicoDpi: ''
        }}
        onSubmit={({clienteNombre, mecanicoNombre, clienteDpi, mecanicoDpi}) => findAll(clienteNombre, mecanicoNombre, clienteDpi, mecanicoDpi)}
        onClean={() => findAll()}
      >
        <CustomInputText label={'Nombres cliente'} name={'clienteNombre'} xs={10} />
        <CustomInputText label={'Nombres mecánico'} name={'mecanicoNombre'} xs={8} />
        <CustomInputText label={'DPI cliente'} name={'clienteDpi'} xs={8}/>
        <CustomInputText label={'DPI Mecánico'} name={'mecanicoDpi'} xs={8}/>
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['dpi', 'nombre','apellido','tipo', 'usrAdministrador']}
        tableBody={renderTableBody()}
        idField="usrCodigo"
      />
    </>
  );
};
