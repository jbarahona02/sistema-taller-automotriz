import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { useRepuestoStore } from "../../../../hooks";
import { RepuestoForm } from "../../forms/RepuestoForm";

export const RepuestoPage = () => {
  const { repCodigo } = useParams<{ repCodigo: string }>();
  const { findById, cleanForm } = useRepuestoStore();

  useEffect(() => {
    cleanForm();
    if (repCodigo) {
      findById(repCodigo);
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Repuestos ' + (repCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <RepuestoForm />
        </Grid>
      </Grid>
    </>
  );
};
