import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { useProductoStore } from "../../../../hooks";
import { ProductoForm } from "../../forms/ProductoForm";

export const ProductoPage = () => {
  const { proCodigo } = useParams<{ proCodigo: string }>();
  const { findById, cleanForm } = useProductoStore();

  useEffect(() => {
    cleanForm();
    if (proCodigo) {
      findById(proCodigo);
    }
  }, []);

  return (
    <>
      <TitleComponent title={'Productos ' + (proCodigo ? '- Editar' : '- Crear')} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ProductoForm />
        </Grid>
      </Grid>
    </>
  );
};
