import {useNavigate} from "react-router-dom";
import {CustomInputText} from "../../../../components/form";
import {QueryContentLayout, SearchBarLayout} from "../../../../layout";
import {TitleComponent} from "../../components";
import {ADMIN_BASE_PATH} from "../../../../util";
import {useMarcaHerramientaListStore} from "../../../../hooks";
import {useEffect, useState} from 'react';

const tableHeaders = ['Id', 'Nombre', 'Acciones'];

export const MarcaHerramientaListPage = () => {
    const navigate = useNavigate();
    const {content, totalElements, findAll, remove} = useMarcaHerramientaListStore();
    const [page, setPage] = useState(0);

    const onAdd = () => {
        navigate(`${ADMIN_BASE_PATH}/marca-herramienta/`);
    };

    const onUpdate = (mheCodigo: number) => {
        if (mheCodigo !== null) {
            navigate(`${ADMIN_BASE_PATH}/marca-herramienta/${mheCodigo}`);
        }
    };

    const onDelete = (mheCodigo: number) => {
        if (mheCodigo !== null) {
            remove(mheCodigo);
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
            <TitleComponent title={'Marcas de herramientas'}/>

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
                    changePage,
                    totalElements
                }}
                tableHeaders={tableHeaders}
                onAdd={onAdd}
                onDelete={onDelete}
                onUpdate={onUpdate}
                properties={['mheCodigo', 'mheNombre']}
                tableBody={renderTableBody()}
                idField="mheCodigo"
            />
        </>
    );
};
