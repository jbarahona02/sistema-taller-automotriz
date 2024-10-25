import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useVehicleBrandListStore } from "../../../../hooks";
import {useEffect, useState} from 'react';

const tableHeaders = ['Id', 'Nombre', 'Acciones'];

export const VehicleBrandListPage = () => {
  const navigate = useNavigate();
  const { content, totalElements, findAll, remove } = useVehicleBrandListStore();
    const [page, setPage] = useState(0);

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/vehicle-brand/`);
  };

  const onUpdate = (mveCodigo: number) => {
    if (mveCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/vehicle-brand/${mveCodigo}`);
    }
  };

  const onDelete = (mveCodigo: number) => {
    if (mveCodigo !== null) {
      remove(mveCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content;
  };

  const changePage = async (newPage: number) => {
        setPage(newPage);
        await findAll(newPage);
  }

    useEffect(() => {
        setPage(0);
    }, []);

  return (
    <>
      <TitleComponent title={'Marcas de vehículos'} />

      <SearchBarLayout
        initialValues={{ nombre : '' }}
        onSubmit={async ({nombre}) => {
            setPage(0);
            await findAll(0, nombre);
        }}
        onClean={() => findAll()}
      >
        <CustomInputText label={'Nombre'} name={'nombre'} xs={20} />
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
            properties={['mveCodigo', 'mveNombre']}
            tableBody={renderTableBody()}
            idField="mveCodigo"
        />
    </>
  );
};
