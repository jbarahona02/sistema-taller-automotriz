import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { useServicioStore } from "../../../../hooks";
import { ServicioForm } from "../../forms/ServicioForm";

export const ServicioPage = () => {
  const { srvCodigo } = useParams<{ srvCodigo: string }>();
  const { findById, cleanForm } = useServicioStore();

  useEffect(() => {
    cleanForm();
    if (srvCodigo) {
      findById(srvCodigo);
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Servicios ' + (srvCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ServicioForm />
        </Grid>
      </Grid>
    </>
  );
};
