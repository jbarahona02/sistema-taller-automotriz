import {useNavigate} from "react-router-dom";
import {CustomInputText} from "../../../../components/form";
import {QueryContentLayout, SearchBarLayout} from "../../../../layout";
import {TitleComponent} from "../../components";
import {ADMIN_BASE_PATH} from "../../../../util";
import {useMarcaEquipoListStore} from "../../../../hooks";
import {useEffect, useState} from 'react';

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Acciones'];

export const MarcaEquipoListPage = () => {
    const navigate = useNavigate();
    const {content, totalElements, findAll, remove} = useMarcaEquipoListStore();
    const [page, setPage] = useState(0);

    const onAdd = () => {
        navigate(`${ADMIN_BASE_PATH}/marca-equipo/`);
    };

    const onUpdate = (meqCodigo: number) => {
        if (meqCodigo !== null) {
            navigate(`${ADMIN_BASE_PATH}/marca-equipo/${meqCodigo}`);
        }
    };

    const onDelete = (meqCodigo: number) => {
        if (meqCodigo !== null) {
            remove(meqCodigo);
        }
    };

    const renderTableBody = () => {
        if (!content || content.length === 0) return [];
        return content.map((item) => ({
            ...item
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
            <TitleComponent title={'Marcas de Equipos'}/>

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
                properties={['meqCodigo', 'meqNombre', 'meqDescripcion']}
                tableBody={renderTableBody()}
                idField="meqCodigo"
            />
        </>
    );
};
