import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { TypeVehicleForm } from "../../forms/TypeVehicleForm";
import { useTypeVehicleStore } from "../../../../hooks";

export const TypeVehiclePage = () => {
  const { tveCodigo } = useParams<{ tveCodigo: string }>();
  const { findById, cleanForm } = useTypeVehicleStore();

  useEffect(() => {
    cleanForm();
    if (tveCodigo) {
      findById(Number(tveCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Tipos de vehiculos ' + (tveCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TypeVehicleForm />
        </Grid>
      </Grid>
    </>
  );
};
