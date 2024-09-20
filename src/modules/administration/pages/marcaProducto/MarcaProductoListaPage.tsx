import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useMarcaProductoListaStore } from "../../../../hooks";

const tableHeaders = ['Id', 'Nombre', 'Acciones'];

export const MarcaProductoListaPage = () => {
    const navigate = useNavigate();
    const { content, findAll, remove } = useMarcaProductoListaStore();

    const onAdd = () => {
        navigate(`${ADMIN_BASE_PATH}/marca-producto/`);
    };

    const onUpdate = (mapCodigo: number) => {
        if(mapCodigo !== null) {
            navigate(`${ADMIN_BASE_PATH}/marca-producto/${mapCodigo}`);
        }
    };

    const onDelete = (mapCodigo: number) => {
        if(mapCodigo !== null) {
            remove(mapCodigo);
        }
    };

    const renderTableBody = () => {
        if(!content || content.length === 0) return [];
        return content.map((item) => ({
            ...item
        }));
    };

    return (
        <>
            <TitleComponent title={'Marcas de Productos'}/>
            <SearchBarLayout
                initialValues={{ search: '' }}
                onSubmit={({search}) => findAll(search)}
                onClean={() => findAll()}
            >
                <CustomInputText label={'Nombre'} name={'search'} xs={20}/>
            </SearchBarLayout>

            <QueryContentLayout
                tableHeaders={tableHeaders}
                onAdd={onAdd}
                onDelete={onDelete}
                onUpdate={onUpdate}
                properties={['mapCodigo', 'mapNombre']}
                tableBody={renderTableBody()}
                idField="mapCodigo"
            />
        </>
    );
};
