import { Grid } from "@mui/material"
import { TitleComponent } from "../components"
import { MechanicForm } from "../forms/MechanicForm"
import { useMechanicStore } from "../../../hooks"


export const MechanicPage = () => {

    const {
        mecCodigo
    } = useMechanicStore();

    return (
        <>
            <TitleComponent title={'Mecánicos ' + (!!mecCodigo ? '- Editar' : '- Crear')}/>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                    <MechanicForm/>
                </Grid>
            </Grid>
        </>
    )
}