import {useNavigate} from "react-router-dom";
import {CustomInputText} from "../../../../components/form";
import {QueryContentLayout, SearchBarLayout} from "../../../../layout";
import {TitleComponent} from "../../components";
import {ADMIN_BASE_PATH} from "../../../../util";
import {useTipoServicioListStore} from "../../../../hooks";
import {useEffect, useState} from 'react';

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Estado', 'Acciones'];

export const TipoServicioListPage = () => {
    const navigate = useNavigate();
    const {content, totalElements, findAll, remove} = useTipoServicioListStore();
    const [page, setPage] = useState(0);

    const onAdd = () => {
        navigate(`${ADMIN_BASE_PATH}/tipo-servicio/`);
    };

    const onUpdate = (tsrCodigo: number) => {
        if (tsrCodigo !== null) {
            navigate(`${ADMIN_BASE_PATH}/tipo-servicio/${tsrCodigo}`);
        }
    };

    const onDelete = (tsrCodigo: number) => {
        if (tsrCodigo !== null) {
            remove(tsrCodigo);
        }
    };

    const renderTableBody = () => {
        if (!content || content.length === 0) return [];

        return content.map((item) => ({
            ...item,
            'estado': item.tsrEstado
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
            <TitleComponent title={'Tipos de Servicios'}/>

            <SearchBarLayout
                initialValues={{search: ''}}
                onSubmit={async ({search}) => {
                    setPage(0);
                    await findAll(0, search);
                }}
                onClean={() => findAll()}
            >
                <CustomInputText label={'Nombre o Descripción'} name={'search'} xs={20}/>
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
                properties={['tsrCodigo', 'tsrNombre', 'tsrDescripcion', 'estado']}
                tableBody={renderTableBody()}
                idField="tsrCodigo"
            />
        </>
    );
};
