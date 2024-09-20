import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { ClienteForm } from "../../forms/ClienteForm";
import { useClienteStore } from "../../../../hooks";

export const ClientePage = () => {
  const { cliCodigo } = useParams<{ cliCodigo: string }>();
  const { findById, cleanForm } = useClienteStore();

  useEffect(() => {
    cleanForm();
    if (cliCodigo) {
      findById(Number(cliCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Cliente ' + (cliCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ClienteForm />
        </Grid>
      </Grid>
    </>
  );
};
