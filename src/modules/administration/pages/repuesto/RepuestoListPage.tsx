import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useRepuestoListStore } from "../../../../hooks";

const tableHeaders = ['Nombre', 'Descripción', 'Es original', 'Precio', 'Cantidad disponible', 'Proveedor', 'Acciones'];

export const RepuestoListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useRepuestoListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/repuesto/`);
  };

  const onUpdate = (repCodigo: string) => {
    if (repCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/repuesto/${repCodigo}`);
    }
  };

  const onDelete = (repCodigo: string) => {
    if (repCodigo !== null) {
      remove(repCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];

    return content.map((item) => ({
      ...item,
      'estado': item.repOriginal,
      'proveedor.prvNombre': item.proveedor ? item.proveedor.prvNombre : 'No disponible',
      'tipoRepuesto.trpNombre': item.tipoRepuesto ? item.tipoRepuesto.trpNombre : 'No disponible',
    }));
  };

  return (
    <>
      <TitleComponent title={'Repuestos'} />

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
        properties={['repNombre', 'repDescripcion','estado','repPrecio', 'repCantidadDisponible', 'proveedor.prvNombre']}
        tableBody={renderTableBody()}
        idField="repCodigo"
      />
    </>
  );
};
