import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { CitaForm } from "../../forms/CitaForm";
import { useCitaStore } from "../../../../hooks";

export const CitaPage = () => {
  const { ctaCodigo } = useParams<{ ctaCodigo: string }>();
  const { findById, cleanForm } = useCitaStore();

  useEffect(() => {
    cleanForm();
    if (ctaCodigo) {
      findById(Number(ctaCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Cita ' + (ctaCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CitaForm />
        </Grid>
      </Grid>
    </>
  );
};
