import { FormControl, FormHelperText, Grid, InputLabel, Select } from "@mui/material";
import {useField, useFormikContext} from "formik";
import { ReactElement } from "react";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    xs?: number;
    children: ReactElement | ReactElement[];
    [x: string]: any;
    onChange?: (value) => void;
}

export const CustomSelect = ({ xs = 6, label, children, onChange, ...props }: Props) => {
    const [field, meta] = useField(props);
    const {setFieldValue} = useFormikContext();

    const isError = meta.touched && Boolean(meta.error);

    return (
        <Grid item xs={xs}>
            <FormControl 
                sx={{ width: '100%' }} 
                error={isError}
            >
                <InputLabel id={label}>{label}</InputLabel>
                <Select 
                    labelId={label} 
                    label={label} 
                    {...field} 
                    {...props}
                    onChange={
                        event => {
                            if (onChange) onChange(event.target.value);
                            setFieldValue(field.name, event.target.value);
                        }
                    }
                    value={field.value || ''}
                >
                    {children}
                </Select>
                {isError && <FormHelperText>{meta.error}</FormHelperText>}
            </FormControl>
        </Grid>
    );
};
