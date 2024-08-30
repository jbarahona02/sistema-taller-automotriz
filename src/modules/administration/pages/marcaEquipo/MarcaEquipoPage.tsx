import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { MarcaEquipoForm } from "../../forms/MarcaEquipoForm";
import { useMarcaEquipoStore } from "../../../../hooks";

export const MarcaEquipoPage = () => {
  const { meqCodigo } = useParams<{ meqCodigo: string }>();
  const { findById, cleanForm } = useMarcaEquipoStore();

  useEffect(() => {
    cleanForm();
    if (meqCodigo) {
      findById(Number(meqCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Marcas de Equipos ' + (meqCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MarcaEquipoForm />
        </Grid>
      </Grid>
    </>
  );
};
