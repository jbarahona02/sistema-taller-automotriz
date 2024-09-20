import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useProductoListStore } from "../../../../hooks";

const tableHeaders = ['Codigo', 'Nombre', 'Descripción', 'Precio compra', 'Cantidad disponible', 'Proveedor', 'Marca', 'Acciones'];

export const ProductoListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useProductoListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/producto/`);
  };

  const onUpdate = (proCodigo: string) => {
    if (proCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/producto/${proCodigo}`);
    }
  };

  const onDelete = (proCodigo: string) => {
    if (proCodigo !== null) {
      remove(proCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];

    return content.map((item) => ({
      ...item,
      'proveedor.prvNombre': item.proveedor ? item.proveedor.prvNombre : 'No disponible',
      'marcaProducto.mapNombre': item.marcaProducto ? item.marcaProducto.mapNombre : 'No disponible',
    }));
  };

  return (
    <>
      <TitleComponent title={'Productos'} />

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
        properties={['proCodigo', 'proNombre','proDescripcion','proPrecioCompra', 'proCantidadDisponible', 'proveedor.prvNombre', 'marcaProducto.mapNombre']}
        tableBody={renderTableBody()}
        idField="proCodigo"
      />
    </>
  );
};
