import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { TipoServicioForm } from "../../forms/TipoServicioForm";
import { useTipoServicioStore } from "../../../../hooks";

export const TipoServicioPage = () => {
  const { tsrCodigo } = useParams<{ tsrCodigo: string }>();
  const { findById, cleanForm } = useTipoServicioStore();

  useEffect(() => {
    cleanForm();
    if (tsrCodigo) {
      findById(Number(tsrCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Tipo de Servicios ' + (tsrCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TipoServicioForm />
        </Grid>
      </Grid>
    </>
  );
};
