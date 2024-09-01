
import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../../components/form"
import { MechanicInterface } from "../../../../interfaces";
import { QueryContentLayout, SearchBarLayout } from "../../../../layout"
import { TitleComponent } from "../../components";
import { ADMIN_BASE_PATH } from "../../../../util";
import moment from "moment";
import { useMechanicListStore } from "../../../../hooks";

const tableHeaders = ['DPI', 'Nombres', 'Apellidos','NIT','Teléfono','Correo','Salario','Acciones'];

export const MechanicListPage = () => {

  const navigate = useNavigate();
  const { content, findAll, remove } = useMechanicListStore();

  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/mechanic`);
  }

  const onUpdate = (mecCodigo:string) => {
    if(mecCodigo !== null)  {
      navigate(`${ADMIN_BASE_PATH}/mechanic/${mecCodigo}`);
    }
  }

  const onDelete = (mecCodigo: string) => {
    if(mecCodigo !== null){
      remove(mecCodigo);
    }
  }

  const renderTableBody = () => {
    if (!content || content.length === 0) return [];
   
    return content.map((item) => ({
      ...item,
      'especialidadMecanica.emeNombre': item.especialidadMecanica?.emeNombre ? item.especialidadMecanica.emeNombre : 'No disponible',
    }));
  };

    return (
       <>
         <TitleComponent title={'Mecánicos'}></TitleComponent>
         
         <SearchBarLayout
            initialValues={{
              nombreApellidos: '', dpi: '', nit: '',telefono:'',correo:''
            }}
            onSubmit={({nombreApellidos,dpi,nit,telefono,correo}) => findAll(nombreApellidos,dpi,nit,telefono,correo) }
            onClean={() => findAll()}
         >
          <CustomInputText label={'Nombres o apellidos'} name={'nombreApellidos'} xs={10} />
          <CustomInputText label={'DPI'} name={'dpi'} xs={8} />
          <CustomInputText label={'NIT'} name={'nit'} xs={8}/>
          <CustomInputText label={'Teléfono'} name={'telefono'} xs={8}/>
          <CustomInputText label={'Correo'} name={'correo'} xs={10}/>
         </SearchBarLayout>

         <QueryContentLayout
                tableHeaders={tableHeaders}
                onAdd={onAdd}
                onDelete={onDelete}
                onUpdate={onUpdate}
                properties={['mecDpi', 'mecNombres', 'mecApellidos','mecNit','mecTelefono','mecCorreo','mecSalario']}
                tableBody={renderTableBody()}
                idField="mecCodigo"
            />
       </>
    )
}