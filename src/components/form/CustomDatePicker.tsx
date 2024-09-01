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
    restrictToToday?: boolean; // Para restringir la fecha máxima
    minDate?: string; // Nueva propiedad para la fecha mínima en formato string
    [x: string]: any;
    onChange?: (value: Moment | null) => void;
}

export const CustomDatePicker = ({ xs = 6, onChange, restrictToToday = false, minDate, ...props }: Props) => {
    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);

    // Convierte el valor del campo a Moment
    const fieldValue = field.value ? moment(field.value) : undefined;

    // Configura la fecha máxima permitida si restrictToToday es true
    const maxDate: Moment | undefined = restrictToToday ? moment() : undefined;

    // Convierte minDate de string a Moment, si es proporcionada
    const minDateMoment: Moment | undefined = minDate ? moment(minDate, 'DD/MM/YYYY') : undefined;

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
                        setFieldValue(field.name, value ? value.toDate() : undefined); 
                        if (onChange) {
                            onChange(value);
                        }
                    }}
                    sx={{ width: '100%' }}
                    format={'DD/MM/YYYY'}
                    maxDate={maxDate} // Usa undefined si no hay restricción de fecha máxima
                    minDate={minDateMoment} // Aplica la fecha mínima si es proporcionada
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
