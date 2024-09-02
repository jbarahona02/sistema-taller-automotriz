import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { useTipoRepuestoStore } from "../../../../hooks";
import { TipoRepuestoForm } from "../../forms/TipoRepuestoForm";

export const TipoRepuestoPage = () => {
  const { trpCodigo } = useParams<{ trpCodigo: string }>();
  const { findById, cleanForm } = useTipoRepuestoStore();

  useEffect(() => {
    cleanForm();
    if (trpCodigo) {
      findById(Number(trpCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Tipo repuesto ' + (trpCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TipoRepuestoForm />
        </Grid>
      </Grid>
    </>
  );
};
