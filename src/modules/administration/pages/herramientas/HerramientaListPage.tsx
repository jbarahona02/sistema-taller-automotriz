import {useNavigate} from "react-router-dom";
import {CustomInputText} from "../../../../components/form";
import {QueryContentLayout, SearchBarLayout} from "../../../../layout";
import {TitleComponent} from "../../components";
import {ADMIN_BASE_PATH} from "../../../../util";
import {useHerramientaListStore} from "../../../../hooks";
import {useEffect, useState} from 'react';

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Condición', 'Mecánico', 'Marca', 'Acciones'];

export const HerramientaListPage = () => {
    const navigate = useNavigate();
    const {content, totalElements, findAll, remove} = useHerramientaListStore();
    const [page, setPage] = useState(0);

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

    useEffect(() => {
        setPage(0);
    }, []);

    const changePage = async (newPage: number) => {
        setPage(newPage);
        await findAll(newPage);
    }

    const renderTableBody = () => {
        if (!content || content.length === 0) return [];

        return content.map((item) => ({
            ...item,
            'mecanico.mecNombres': item.mecanico ? item.mecanico.mecNombres + " " +
                item.mecanico.mecApellidos : 'No disponible',
            'marcaHerramienta.mheNombre': item.marcaHerramienta ? item.marcaHerramienta.mheNombre : 'No disponible'
        }));
    };

    return (
        <>
            <TitleComponent title={'Herramienta'}/>

            <SearchBarLayout
                initialValues={{nombreODescripcion: ""}}
                onSubmit={async ({nombreODescripcion}) => {
                  setPage(0);
                  await findAll(0, nombreODescripcion);
                }}
                onClean={() => findAll()}
            >
                <CustomInputText label={'Nombre o descripción'} name={'nombreODescripcion'} xs={20}/>
            </SearchBarLayout>

            <QueryContentLayout
                paginationOptions={{
                  totalElements,
                  page,
                  changePage
                }}
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
