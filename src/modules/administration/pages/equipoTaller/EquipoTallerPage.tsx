import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { useEquipoTallerStore } from "../../../../hooks";
import { EquipoTallerForm } from "../../forms/EquipoTallerForm";

export const EquipoTallerPage = () => {
  const { etaCodigo } = useParams<{ etaCodigo: string }>();
  const { findById, cleanForm } = useEquipoTallerStore();

  useEffect(() => {
    cleanForm();
    if (etaCodigo) {
      findById(etaCodigo);
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Equipos de taller ' + (etaCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <EquipoTallerForm />
        </Grid>
      </Grid>
    </>
  );
};
