import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { useCotizacionStore } from "../../../../hooks";
import { CotizacionForm } from "../../forms/CotizacionForm";

export const CotizacionPage = () => {
  const { cotCodigo } = useParams<{ cotCodigo: string }>();
  const { findById, cleanForm } = useCotizacionStore();

  useEffect(() => {
    cleanForm();
    console.log(cotCodigo);
    if (cotCodigo) {
      findById(cotCodigo);
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Cotización ' + (cotCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CotizacionForm/>
        </Grid>
      </Grid>
    </>
  );
};
