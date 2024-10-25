import {useNavigate} from "react-router-dom";
import {CustomInputText} from "../../../../components/form";
import {QueryContentLayout, SearchBarLayout} from "../../../../layout";
import {TitleComponent} from "../../components";
import {ADMIN_BASE_PATH} from "../../../../util";
import {useTipoRepuestoListStore} from "../../../../hooks";
import {useEffect, useState} from 'react';

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Acciones'];

export const TipoRepuestoListPage = () => {
    const navigate = useNavigate();
    const {content, totalElements, findAll, remove} = useTipoRepuestoListStore();
    const [page, setPage] = useState(0);

    const onAdd = () => {
        navigate(`${ADMIN_BASE_PATH}/tipo-repuesto/`);
    };

    const onUpdate = (trpCodigo: number) => {
        if (trpCodigo !== null) {
            navigate(`${ADMIN_BASE_PATH}/tipo-repuesto/${trpCodigo}`);
        }
    };

    const onDelete = (trpCodigo: number) => {
        if (trpCodigo !== null) {
            remove(trpCodigo);
        }
    };

    const renderTableBody = () => {
        if (!content || content.length === 0) return [];

        return content;
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
            <TitleComponent title={'Tipo repuesto'}/>

            <SearchBarLayout
                initialValues={{nombreODescripcion: ''}}
                onSubmit={async ({nombreODescripcion}) => {
                    setPage(0);
                    await findAll(0, nombreODescripcion);
                }}
                onClean={() => findAll()}
            >
                <CustomInputText label={'Nombre o Descripción'} name={'nombreODescripcion'} xs={20}/>
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
                properties={['trpCodigo', 'trpNombre', 'trpDescripcion']}
                tableBody={renderTableBody()}
                idField="trpCodigo"
            />
        </>
    );
};
