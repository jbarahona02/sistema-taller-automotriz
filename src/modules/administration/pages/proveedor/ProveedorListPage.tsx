import {useNavigate} from "react-router-dom";
import {CustomInputText} from "../../../../components/form";
import {QueryContentLayout, SearchBarLayout} from "../../../../layout";
import {TitleComponent} from "../../components";
import {ADMIN_BASE_PATH} from "../../../../util";
import {useProveedorListStore} from "../../../../hooks";
import {useEffect, useState} from 'react';

const tableHeaders = ['Nombre', 'Nombre de contacto', 'Teléfono', 'Correo', 'Estado', 'Acciones'];

export const ProveedorListPage = () => {
    const navigate = useNavigate();
    const {content, totalElements, findAll, remove} = useProveedorListStore();
    const [page, setPage] = useState(0);

    const onAdd = () => {
        navigate(`${ADMIN_BASE_PATH}/proveedor/`);
    };

    const onUpdate = (prvCodigo: number) => {
        if (prvCodigo !== null) {
            navigate(`${ADMIN_BASE_PATH}/proveedor/${prvCodigo}`);
        }
    };

    const onDelete = (prvCodigo: number) => {
        if (prvCodigo !== null) {
            remove(prvCodigo);
        }
    };

    const renderTableBody = () => {
        if (!content || content.length === 0) return [];

        return content.map((item) => ({
            ...item,
            'estado': item.prvEstado,
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
            <TitleComponent title={'Proveedores'}/>

            <SearchBarLayout
                initialValues={{nombre: '', telefono: '', correo: ''}}
                onSubmit={async ({nombre, telefono, correo}) => {
                    setPage(0);
                    await findAll(nombre, telefono, correo);
                }}
                onClean={() => findAll()}
            >
                <CustomInputText label={'Nombre de proveedor o nombre de contacto'} name={'nombre'} xs={12}/>
                <CustomInputText label={'Teléfono'} name={'telefono'} xs={20}/>
                <CustomInputText label={'Correo'} name={'correo'} xs={20}/>
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
                properties={['prvNombre', 'prvNombreContacto', 'prvTelefono', 'prvCorreo', 'estado']}
                tableBody={renderTableBody()}
                idField="prvCodigo"
            />
        </>
    );
};
