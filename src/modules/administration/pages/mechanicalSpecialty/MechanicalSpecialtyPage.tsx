import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { MechanicalSpecialtyForm  } from "../../forms/MechanicalSpecialtyForm";
import { useMechanicalSpecialtyStore } from "../../../../hooks";

export const MechanicalSpecialtyPage = () => {
  const { emeCodigo } = useParams<{ emeCodigo: string }>();
  const { findById, cleanForm } = useMechanicalSpecialtyStore();

  useEffect(() => {
    cleanForm();
    if (emeCodigo) {
      findById(Number(emeCodigo));
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Especialidad mecánica ' + (emeCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MechanicalSpecialtyForm />
        </Grid>
      </Grid>
    </>
  );
};
