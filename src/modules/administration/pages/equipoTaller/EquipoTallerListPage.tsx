import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useEquipoTallerListStore } from "../../../../hooks";
import moment from "moment";

const tableHeaders = ['Nombre', 'Descripción', 'Modelo', 'Fecha de ingreso', 'Estado', 'Mecánico', 'Marca', 'Acciones'];

export const EquipoTallerListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useEquipoTallerListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/equipo-taller/`);
  };

  const onUpdate = (etaCodigo: string) => {
    if (etaCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/equipo-taller/${etaCodigo}`);
    }
  };

  const onDelete = (etaCodigo: string) => {
    if (etaCodigo !== null) {
      remove(etaCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];

    return content.map((item) => ({
      ...item,
      'fechaIngreso': `${moment(item.etaFechaIngreso).format('DD/MM/YYYY')}`,
      'mecanico.mecNombres': item.mecanico ? item.mecanico.mecNombres : 'No disponible',
      'marcaEquipo.meqNombre': item.marcaEquipo ? item.marcaEquipo.meqNombre : 'No disponible',
    }));
  };

  return (
    <>
      <TitleComponent title={'Equipos de Taller'} />

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
        properties={['etaNombre', 'etaDescripcion','etaModelo','fechaIngreso', 'etaEstado', 'mecanico.mecNombres', 'marcaEquipo.meqNombre']}
        tableBody={renderTableBody()}
        idField="etaCodigo"
      />
    </>
  );
};
