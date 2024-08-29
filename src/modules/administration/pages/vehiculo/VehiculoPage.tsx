import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { VehiculoForm } from "../../forms/VehiculoForm";
import { useVehiculoStore } from "../../../../hooks";

export const VehiculoPage = () => {
  const { vehPlaca } = useParams<{ vehPlaca: string }>();
  const { findById, cleanForm } = useVehiculoStore();

  useEffect(() => {
    cleanForm();
    if (vehPlaca) {
      findById(vehPlaca);
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Vehiculo ' + (vehPlaca ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <VehiculoForm />
        </Grid>
      </Grid>
    </>
  );
};
