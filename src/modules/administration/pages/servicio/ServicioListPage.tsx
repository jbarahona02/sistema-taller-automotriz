import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useServicioListStore } from "../../../../hooks";

const tableHeaders = ['Nombre', 'Descripción', 'Costo', 'Estado', 'Tipo de servicio', 'Acciones'];

export const ServicioListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useServicioListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/servicio/`);
  };

  const onUpdate = (srvCodigo: string) => {
    if (srvCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/servicio/${srvCodigo}`);
    }
  };

  const onDelete = (srvCodigo: string) => {
    if (srvCodigo !== null) {
      remove(srvCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];

    return content.map((item) => ({
      ...item,
      'estado': item.srvEstado,
      'tipoServicio.tsrNombre': item.tipoServicio ? item.tipoServicio.tsrNombre : 'No disponible',
    }));
  };

  return (
    <>
      <TitleComponent title={'Servicios'} />

      <SearchBarLayout
        initialValues={{ search: '' }}
        onSubmit={({search}) => findAll(search)}
        onClean={() => findAll()}
      >
        <CustomInputText label={'Nombre o descripción'} name={'search'} xs={20} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['srvNombre', 'srvDescripcion','srvCosto','estado', 'tipoServicio.tsrNombre']}
        tableBody={renderTableBody()}
        idField="srvCodigo"
      />
    </>
  );
};
