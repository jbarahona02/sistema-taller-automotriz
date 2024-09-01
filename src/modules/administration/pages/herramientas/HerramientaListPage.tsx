import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH, Utilities } from "../../../../util";
import { useHerramientaListStore } from "../../../../hooks";

const tableHeaders = ['Id','Nombre','Descripción','Condición','Mecánico','Marca','Acciones'];

export const HerramientaListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useHerramientaListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/herramienta/`);
  };

  const onUpdate = (herCodigo: string) => {
    if (herCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/herramienta/${herCodigo}`);
    }
  };

  const onDelete = (herCodigo: string) => {
    if (herCodigo !== null) {
      remove(herCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];

    return content.map((item) => ({
      ...item,
      'mecanico.mecNombres': item.mecanico ? Utilities.capitalizeFirstLetter(item.mecanico.mecNombres!) + " " +
        Utilities.capitalizeFirstLetter(item.mecanico.mecApellidos!) : 'No disponible',
      'marcaHerramienta.mheNombre': item.marcaHerramienta ? item.marcaHerramienta.mheNombre : 'No disponible'
    }));
  };

  return (
    <>
      <TitleComponent title={'Herramienta'} />

      <SearchBarLayout
        initialValues={{ nombreODescripcion : ""}}
        onSubmit={({nombreODescripcion}) => findAll(nombreODescripcion)}
        onClean={() => findAll()}
      >
        <CustomInputText label={'Nombre o descripción'} name={'nombreODescripcion'} xs={20} />     
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['herCodigo', 'herNombre', 'herDescripcion', 'herCondicion', 'mecanico.mecNombres', 'marcaHerramienta.mheNombre']}
        tableBody={renderTableBody()}
        idField="herCodigo"
      />
    </>
  );
};
