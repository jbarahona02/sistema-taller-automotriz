import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { TallerForm } from "../../forms/TallerForm";
import { useTallerStore } from "../../../../hooks";

export const TallerPage = () => {
  const { tllCodigo } = useParams<{ tllCodigo: string }>();
  const { findById, cleanForm } = useTallerStore();

  useEffect(() => {
    cleanForm();
    if (tllCodigo) {
      findById(Number(tllCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Taller ' + (tllCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TallerForm />
        </Grid>
      </Grid>
    </>
  );
};
