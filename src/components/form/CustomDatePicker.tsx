import { Grid, TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import 'moment/locale/es'; // Importa el idioma español

// Asegura que Moment esté configurado en español
moment.locale('es');

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

    // Convierte el valor del campo a Moment
    const fieldValue = field.value ? moment(field.value) : null;

    // Configura la fecha máxima permitida como Moment
    const maxDate: Moment = moment();

    return (
        <Grid item xs={xs}>
            <LocalizationProvider 
                dateAdapter={AdapterMoment} 
                adapterLocale="es" // Configura explícitamente el locale aquí
            >
                <DatePicker
                    {...field}
                    {...props}
                    value={fieldValue}
                    onChange={(value: Moment | null) => {
                        setFieldValue(field.name, value ? value.toDate() : null); 
                        if (onChange) {
                            onChange(value);
                        }
                    }}
                    sx={{ width: '100%' }}
                    format={'DD/MM/YYYY'}
                    maxDate={maxDate} // Usa Moment para la fecha máxima
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(meta.touched && meta.error)}
                            helperText={meta.touched && meta.error ? meta.error : ''}
                            fullWidth
                        />
                    )}
                />
            </LocalizationProvider>
        </Grid>
    );
};
