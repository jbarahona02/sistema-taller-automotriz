import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { useProveedorStore } from "../../../../hooks";
import {  } from "../../forms/TipoRepuestoForm";
import { ProveedorForm } from "../../forms/ProveedorForm";

export const ProveedorPage = () => {
  const { prvCodigo } = useParams<{ prvCodigo: string }>();
  const { findById, cleanForm } = useProveedorStore();

  useEffect(() => {
    cleanForm();
    if (prvCodigo) {
      findById(prvCodigo);
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Proveedor ' + (prvCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProveedorForm />
        </Grid>
      </Grid>
    </>
  );
};
