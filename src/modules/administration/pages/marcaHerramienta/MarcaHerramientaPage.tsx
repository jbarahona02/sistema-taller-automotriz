import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { useMarcaHerramientaStore } from "../../../../hooks";
import { MarcaHerramientaForm } from "../../forms/MarcaHerramientaForm";

export const MarcaHerramientaPage = () => {
  const { mheCodigo } = useParams<{ mheCodigo: string }>();
  const { findById, cleanForm } = useMarcaHerramientaStore();

  useEffect(() => {
    cleanForm();
    if (mheCodigo) {
      findById(Number(mheCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Marcas de herramientas ' + (mheCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MarcaHerramientaForm />
        </Grid>
      </Grid>
    </>
  );
};
