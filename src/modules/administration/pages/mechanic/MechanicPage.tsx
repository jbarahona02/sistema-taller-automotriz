import { Grid } from "@mui/material"
import { TitleComponent } from "../../components"
import { MechanicForm } from "../../forms/MechanicForm"
import { useMechanicStore } from "../../../../hooks"
import { useParams } from "react-router-dom"
import { useEffect } from "react"


export const MechanicPage = () => {

    const { mecCodigo } = useParams<{mecCodigo: string}>();
    const { findById, cleanForm } = useMechanicStore();

    useEffect(() => {
        cleanForm();
        if (mecCodigo) {
          findById(mecCodigo);
        }
      }, []);

    return (
        <>
            <TitleComponent title={'Mecánicos ' + (mecCodigo ? '- Editar' : '- Crear')}/>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                    <MechanicForm/>
                </Grid>
            </Grid>
        </>
    )
}