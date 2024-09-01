import { useNavigate } from "react-router-dom";
import { CustomDatePicker } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useCotizacionListStore } from "../../../../hooks";
import moment from "moment";

const tableHeaders = ['Id', 'Fecha de creación', 'Fecha de vencimiento', '% Descuento', 'Total', 'Cliente','Acciones'];

export const CotizacionListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useCotizacionListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/cotizacion/`);
  };

  const onUpdate = (cotCodigo: string) => {
    console.log("codigo: ",cotCodigo);
    if (cotCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/cotizacion/${cotCodigo}`);
    }
  };

  const onDelete = (cotCotizacion: string) => {
    if (cotCotizacion !== null) {
      remove(cotCotizacion);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];

    return content.map((item) => ({
      ...item,
      'fechaCreacion': `${moment(item.cotFechaCreacion).format('DD/MM/YYYY')}`,
      'fechaVencimiento': `${moment(item.cotFechaVencimiento).format('DD/MM/YYYY')}`,
      'cliente.cliNombres': item.cliente ? `${item.cliente.cliNombres} ${item.cliente.cliApellidos}` : 'No disponible',
    }));
  };

  return (
    <>
      <TitleComponent title={'Cotizaciones'} />

      <SearchBarLayout
        initialValues={{inicioFechaCreacion: "", finFechaCreacion:"",inicioFechaVencimiento:"",finFechaVencimiento:""}}
        onSubmit={({inicioFechaCreacion,finFechaCreacion,inicioFechaVencimiento,finFechaVencimiento}) =>
             findAll(inicioFechaCreacion,finFechaCreacion,inicioFechaVencimiento,finFechaVencimiento)}
        onClean={() => findAll()}
      >
       <CustomDatePicker label={'Inicio fecha de creación'} name={'inicioFechaCreacion'}  xs={12} />
       <CustomDatePicker label={'Fin fecha de creación'} name={'finFechaCreacion'}  xs={12} restrictToToday={true}/>
       <CustomDatePicker label={'Inicio fecha de vencimiento'} name={'inicioFechaVencimiento'}  xs={12}/>
       <CustomDatePicker label={'Fin fecha de vencimiento'} name={'finFechaVencimiento'}  xs={12} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['cotCodigo', 'fechaCreacion', 'fechaVencimiento', 'cotDescuento','cotTotal','cliente.cliNombres']}
        tableBody={renderTableBody()}
        idField="cotCodigo"
      />
    </>
  );
};
