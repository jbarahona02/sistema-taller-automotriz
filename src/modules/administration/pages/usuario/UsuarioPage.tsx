import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { useUsuarioStore } from "../../../../hooks";
import { UsuarioForm } from "../../forms/UsuarioForm";

export const UsuarioPage = () => {
  const { usrCodigo } = useParams<{ usrCodigo: string }>();
  const { findById, cleanForm } = useUsuarioStore();

  useEffect(() => {
    cleanForm();
    if (usrCodigo) {
      findById(usrCodigo);
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Usuarios ' + (usrCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UsuarioForm />
        </Grid>
      </Grid>
    </>
  );
};
