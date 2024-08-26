
import { useNavigate } from "react-router-dom";
import { CustomInputText } from "../../../components/form"
import { MechanicInterface } from "../../../interfaces";
import { QueryContentLayout, SearchBarLayout } from "../../../layout"
import { TitleComponent } from "../components";
import { ADMIN_BASE_PATH } from "../../../util";
import moment from "moment";

const tableHeaders = ['DPI', 'Nombres', 'Apellidos','Teléfono','Especialidad','Salario','Estado','Acciones'];
const properties = ['mecDpi', 'mecNombres', 'mecApellidos','mecTelefono','mecCodigoEspecialidad','mecSalario'];




export const MechanicListPage = () => {

  const navigate = useNavigate();


  const onAdd = () => {
    navigate(`${ADMIN_BASE_PATH}/mechanic`);
  }

  const onUpdate = () => {

  }

  const onDelete = () => {

  }

  const onSelect = () => {

  }

  const content : MechanicInterface[] = [
    {
      mecAniosExperiencia: 4,
      mecApellidos:"Barahona",
      mecCodigo: 2,
      mecCodigoEspecialidad: 2,
      mecCorreo: "CSdasd",
      mecDpi: "asdasdas",
      mecFechaNacimiento: "sdas",
      mecNit: "A454545",
      mecNombres: "Javier",
      mecSalario: 45,
      mecTelefono: "asasd",
      estado: true,
      mecFechaContratacion: moment()
    }
  ]

    return (
       <>
         <TitleComponent title={'Mecánicos'}></TitleComponent>
         
         <SearchBarLayout
            initialValues={{
              
            }}
            onSubmit={() => console.log("")}
            onClean={() => {
              
            }}
            onClick={() => {}}
         >
          <CustomInputText label={'CUI'} name={'mecCUI'} xs={12} />
          <CustomInputText label={'Nombre'} name={'mecNombre'} xs={12}/>
          <CustomInputText label={'Apellido'} name={'mecApellido'} xs={12}/>
          <CustomInputText label={'Salario'} name={'mecSalario'} xs={12}/>
         </SearchBarLayout>

         <QueryContentLayout
                tableHeaders={tableHeaders}
                onAdd={onAdd}
                onSelect={onSelect}
                onDelete={onDelete}
                onUpdate={onUpdate}
                properties={properties}
                tableBody={content}
            />
       </>
    )
}