import {useNavigate} from "react-router-dom";
import {CustomInputText} from "../../../../components/form";
import {QueryContentLayout, SearchBarLayout} from "../../../../layout";
import {TitleComponent} from "../../components";
import {ADMIN_BASE_PATH} from "../../../../util";
import {useCitaListStore} from "../../../../hooks";
import moment from "moment";
import {useEffect, useState} from 'react';

const tableHeaders = ['Codigo', 'Fecha Cita', 'Descripción', 'Duración Estimada (min)', 'Confirmación', 'Vehiculo', 'Acciones'];

export const CitaListPage = () => {
    const navigate = useNavigate();
    const {content, totalElements, findAll, remove} = useCitaListStore();
    const [page, setPage] = useState(0);

    const onAdd = () => {
        navigate(`${ADMIN_BASE_PATH}/cita/`);
    };

    const onUpdate = (ctaCodigo: number) => {
        if (ctaCodigo !== null) {
            navigate(`${ADMIN_BASE_PATH}/cita/${ctaCodigo}`);
        }
    };

    const onDelete = (ctaCodigo: number) => {
        if (ctaCodigo !== null) {
            remove(ctaCodigo);
        }
    };

    const renderTableBody = () => {
        if (!content || content.length === 0) return [];

        return content.map((item) => ({
            ...item,
            'vehiculo.vehPlaca': item.vehiculo ? item.vehiculo.vehPlaca : 'No disponible',
            'fechaCita': `${moment(item.ctaFechaHora).format('DD/MM/YYYY')}`,
            'estado': item.ctaConfirmacion
        }));
    };

    useEffect(() => {
        setPage(0);
    }, []);

    const changePage = async (newPage: number) => {
      setPage(newPage);
      await findAll(newPage);
    }

    return (
        <>
            <TitleComponent title={'Citas'}/>

            <SearchBarLayout
                initialValues={{search: ''}}
                onSubmit={async ({search}) => {
                  setPage(0);
                  await findAll(0, search);
                }}
                onClean={() => findAll()}
            >
                <CustomInputText label={'Descripción'} name={'search'} xs={20}/>
            </SearchBarLayout>

            <QueryContentLayout
                paginationOptions={{
                  page,
                  changePage,
                  totalElements
                }}
                tableHeaders={tableHeaders}
                onAdd={onAdd}
                onDelete={onDelete}
                onUpdate={onUpdate}
                properties={['ctaCodigo', 'fechaCita', 'ctaDescripcion', 'ctaDuracionEstimadaMin', 'estado', 'vehiculo.vehPlaca']}
                tableBody={renderTableBody()}
                idField="ctaCodigo"
            />
        </>
    );
};
