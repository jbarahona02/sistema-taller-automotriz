import {useNavigate} from "react-router-dom";
import {CustomInputText} from "../../../../components/form";
import {QueryContentLayout, SearchBarLayout} from "../../../../layout";
import {TitleComponent} from "../../components";
import {ADMIN_BASE_PATH} from "../../../../util";
import {useTipoPagoListStore} from "../../../../hooks";
import {useEffect, useState} from 'react';

const tableHeaders = ['Id', 'Nombre', 'Acciones'];

export const TipoPagoListPage = () => {
    const navigate = useNavigate();
    const {content, totalElements, findAll, remove} = useTipoPagoListStore();
    const [page, setPage] = useState(0);

    const onAdd = () => {
        navigate(`${ADMIN_BASE_PATH}/tipo-pago/`);
    };

    const onUpdate = (tpaCodigo: number) => {
        if (tpaCodigo !== null) {
            navigate(`${ADMIN_BASE_PATH}/tipo-pago/${tpaCodigo}`);
        }
    };

    const onDelete = (tpaCodigo: number) => {
        if (tpaCodigo !== null) {
            remove(tpaCodigo);
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
            <TitleComponent title={'Tipos o formas de pago'}/>

            <SearchBarLayout
                initialValues={{nombre: ''}}
                onSubmit={async ({nombre}) => {
                    setPage(0);
                    await findAll(0, nombre);
                }}
                onClean={() => findAll()}
            >
                <CustomInputText label={'Nombre'} name={'nombre'} xs={20}/>
            </SearchBarLayout>

            <QueryContentLayout
                paginationOptions={{
                    page,
                    totalElements,
                    changePage
                }}
                tableHeaders={tableHeaders}
                onAdd={onAdd}
                onDelete={onDelete}
                onUpdate={onUpdate}
                properties={['tpaCodigo', 'tpaNombre']}
                tableBody={renderTableBody()}
                idField="tpaCodigo"
            />
        </>
    );
};
