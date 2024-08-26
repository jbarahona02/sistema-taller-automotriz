import {FormControl, FormHelperText, Grid, InputLabel, Select} from "@mui/material";
import {useField} from "formik";
import {ReactElement} from "react";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    xs?: number;
    children: ReactElement | ReactElement[]
    [x: string]: any;
}

export const CustomSelect = ({xs = 6, label, children, ...props}: Props) => {

    const [field, meta] = useField(props);


    return (
        <Grid item xs={xs}>
            <FormControl sx={{width: '100%'}} error={meta.touched && meta.error}>
                <InputLabel id={label}>{label}</InputLabel>
                <Select labelId={label} label={label} {...field} {...props} >
                    {children}
                </Select>
                <FormHelperText>{meta.touched && meta.error ? meta.error : ''}</FormHelperText>
            </FormControl>
        </Grid>
    )
}
