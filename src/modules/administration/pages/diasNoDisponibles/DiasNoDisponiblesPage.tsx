import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { DiasNoDisponiblesForm } from "../../forms/DiasNoDisponiblesForm";
import { useDiasNoDisponiblesStore } from "../../../../hooks";

export const DiasNoDisponiblesPage = () => {
  const { dndCodigo } = useParams<{ dndCodigo: string }>();
  const { findById, cleanForm } = useDiasNoDisponiblesStore();

  useEffect(() => {
    cleanForm();
    if (dndCodigo) {
      findById(Number(dndCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Día No Disponible ' + (dndCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DiasNoDisponiblesForm />
        </Grid>
      </Grid>
    </>
  );
};
