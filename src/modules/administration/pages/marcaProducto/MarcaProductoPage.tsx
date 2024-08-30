import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { TitleComponent } from "../../components";
import { MarcaProductoForm } from "../../forms/MarcaProductoForm";
import { useMarcaProductoStore } from "../../../../hooks";

export const MarcaProductoPage = () => {
    const { mapCodigo } = useParams<{ mapCodigo: string }>();
    const { findById, cleanForm } = useMarcaProductoStore();

    useEffect(() => {
        cleanForm();
        if(mapCodigo){
            findById(Number(mapCodigo));
        }
    }, []);

    return (
        <>
            <TitleComponent title={'Marca Producto - ' + (mapCodigo ? 'Editar' : 'Crear')}/>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MarcaProductoForm/>
                </Grid>
            </Grid>
        </>
    );
};
