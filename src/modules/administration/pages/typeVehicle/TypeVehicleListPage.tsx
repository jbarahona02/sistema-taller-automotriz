import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useTypeVehicleListStore } from "../../../../hooks";
import {useEffect, useState} from 'react';

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Acciones'];

export const TypeVehicleListPage = () => {
    const navigate = useNavigate();
    const {content, totalElements, findAll, remove} = useTypeVehicleListStore();
    const [page, setPage] = useState(0);

    const onAdd = () => {
        navigate(`${ADMIN_BASE_PATH}/type-vehicle/`);
    };

    const onUpdate = (tveCodigo: number) => {
        if (tveCodigo !== null) {
            navigate(`${ADMIN_BASE_PATH}/type-vehicle/${tveCodigo}`);
        }
    };

    const onDelete = (tveCodigo: number) => {
        if (tveCodigo !== null) {
            remove(tveCodigo);
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
      <TitleComponent title={'Tipos de vehículos'} />

      <SearchBarLayout
        initialValues={{ nombre : ''}}
        onSubmit={async ({nombre}) => {
            setPage(0);
            await findAll(0, nombre);
        }}
        onClean={() => findAll()}
      >
        <CustomInputText label={'Nombre'} name={'nombre'} xs={12} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        paginationOptions={{
            totalElements,
            page,
            changePage
        }}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['tveCodigo', 'tveNombre', 'tveDescripcion']}
        tableBody={renderTableBody()}
        idField="tveCodigo"
      />
    </>
  );
};
