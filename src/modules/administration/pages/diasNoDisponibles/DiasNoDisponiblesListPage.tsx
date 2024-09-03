import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useDiasNoDisponiblesListStore } from "../../../../hooks";
import moment from "moment";

const tableHeaders = ['Motivo', 'Fecha', 'Taller', 'Acciones'];

export const DiasNoDisponiblesListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useDiasNoDisponiblesListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/dias-no-disponibles/`);
  };

  const onUpdate = (dndCodigo: number) => {
    if (dndCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/dias-no-disponibles/${dndCodigo}`);
    }
  };

  const onDelete = (dndCodigo: number) => {
    if (dndCodigo !== null) {
      remove(dndCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];

    return content.map((item) => ({
      ...item,
      'fecha': `${moment(item.dndFecha).format('DD/MM/YYYY')}`,
      'taller.tllNombre': item.taller ? item.taller.tllNombre : 'No disponible',
    }));
  };

  return (
    <>
      <TitleComponent title={'Dias No Disponibles'} />

      <SearchBarLayout
        initialValues={{ motivo : ''}}
        onSubmit={({motivo}) => findAll(motivo)}
        onClean={() => findAll()}
      >
        <CustomInputText label={'Motivo'} name={'motivo'} xs={20} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['dndMotivo', 'fecha', 'taller.tllNombre']}
        tableBody={renderTableBody()}
        idField="dndCodigo"
      />
    </>
  );
};
