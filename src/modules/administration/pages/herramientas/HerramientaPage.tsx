import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { VehiculoForm } from "../../forms/VehiculoForm";
import { useHerramientaStore, useVehiculoStore } from "../../../../hooks";
import { HerramientaForm } from "../../forms/HerramientaForm";

export const HerramientaPage = () => {
  const { herCodigo } = useParams<{ herCodigo: string }>();
  const { findById, cleanForm } = useHerramientaStore();

  useEffect(() => {
    cleanForm();
    if (herCodigo) {
      findById(herCodigo);
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Herramienta ' + (herCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HerramientaForm />
        </Grid>
      </Grid>
    </>
  );
};
