import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { useTipoPagoStore } from "../../../../hooks";
import { TipoPagoForm } from "../../forms/TipoPagoForm";

export const TipoPagoPage = () => {
  const { tpaCodigo } = useParams<{ tpaCodigo: string }>();
  const { findById, cleanForm } = useTipoPagoStore();

  useEffect(() => {
    cleanForm();
    if (tpaCodigo) {
      findById(Number(tpaCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Tipos de pago ' + (tpaCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TipoPagoForm />
        </Grid>
      </Grid>
    </>
  );
};
