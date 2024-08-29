import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { NivelGravedadForm } from "../../forms/NivelGravedadForm";
import { useNivelGravedadStore } from "../../../../hooks";

export const NivelGravedadPage = () => {
  const { ngrCodigo } = useParams<{ ngrCodigo: string }>();
  const { findById, cleanForm } = useNivelGravedadStore();

  useEffect(() => {
    cleanForm();
    if (ngrCodigo) {
      findById(Number(ngrCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Nivel de gravedad ' + (ngrCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <NivelGravedadForm />
        </Grid>
      </Grid>
    </>
  );
};
