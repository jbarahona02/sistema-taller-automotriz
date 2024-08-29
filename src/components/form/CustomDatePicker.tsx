import { Grid } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    xs?: number;
    [x: string]: any;
    onChange?: (value: Moment | null) => void;
}

export const CustomDatePicker = ({ xs = 6, onChange, ...props }: Props) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);

    const fieldValue = field.value ? moment(field.value) : null;

    return (
        <Grid item xs={xs}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    {...field}
                    {...props}
                    value={fieldValue}
                    onChange={(value: Moment | null) => {
                        setFieldValue(field.name, value); 
                        if (onChange) {
                            onChange(value);
                        }
                    }}
                    sx={{ width: '100%' }}
                    format={'DD/MM/YYYY'}
                    slotProps={{
                        field: {
                            readOnly: true
                        }
                    }}
                    renderInput={(params) => (
                        <Grid item xs={xs}>
                            {params.input}
                            {meta.touched && meta.error ? (
                                <div style={{ color: 'red' }}>{meta.error}</div>
                            ) : null}
                        </Grid>
                    )}
                />
            </LocalizationProvider>
        </Grid>
    );
};
