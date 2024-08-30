import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout";
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import { useMechanicalSpecialtyListStore } from "../../../../hooks";
import { useState } from "react";

const tableHeaders = ['Id', 'Nombre', 'Descripción', 'Acciones'];

export const MechanicalSpecialtyListPage = () => {
  const navigate = useNavigate();
  const { content, findAll, remove } = useMechanicalSpecialtyListStore();
  const [search, setSearch] = useState('');

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/especialidad-mecanica/`);
  };

  const onUpdate = (emeCodigo: number) => {
    if (emeCodigo !== null) {
      navigate(`${ADMIN_BASE_PATH}/especialidad-mecanica/${emeCodigo}`);
    }
  };

  const onDelete = (emeCodigo: number) => {
    if (emeCodigo !== null) {
      remove(emeCodigo);
    }
  };

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
  
    return content;
  };


  return (
    <>
      <TitleComponent title={'Especialidad mecánica'} />

      <SearchBarLayout
        initialValues={{ nombre : '' }}
        onSubmit={({nombre}) => findAll(nombre)}
      >
        <CustomInputText label={'Nombre o Descripción'} name={'nombre'} xs={20} />
      </SearchBarLayout>

      <QueryContentLayout
        tableHeaders={tableHeaders}
        onAdd={onAdd}
        onDelete={onDelete}
        onUpdate={onUpdate}
        properties={['emeCodigo', 'emeNombre', 'emeDescripcion']}
        tableBody={renderTableBody()}
        idField="emeCodigo"
      />
    </>
  );
};
