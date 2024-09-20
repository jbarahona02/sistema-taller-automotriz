import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { VehicleBrandForm } from "../../forms/VehicleBrandForm";
import { useVehicleBrandStore } from "../../../../hooks";

export const VehicleBrandPage = () => {
  const { mveCodigo } = useParams<{ mveCodigo: string }>();
  const { findById, cleanForm } = useVehicleBrandStore();

  useEffect(() => {
    cleanForm();
    if (mveCodigo) {
      findById(Number(mveCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Marcas de vehículos ' + (mveCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <VehicleBrandForm />
        </Grid>
      </Grid>
    </>
  );
};
