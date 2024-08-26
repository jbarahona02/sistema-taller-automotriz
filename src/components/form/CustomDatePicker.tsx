import {Grid} from "@mui/material";
import {useField, useFormikContext} from "formik";
import {LocalizationProvider, PickerValidDate} from "@mui/x-date-pickers";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import {PickerChangeHandlerContext} from "@mui/x-date-pickers/models";


interface Props {
    label: string;
    name: string;
    placeholder?: string;
    xs?: number;
    [x: string]: any;
    onChange?: (value: PickerValidDate | null) => void;
}

export const CustomDatePicker = ({xs = 6, onChange, ...props}: Props) => {

    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(props);

    return (
        <Grid item xs={xs}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                    {...field}
                    {...props}
                    onChange={value => {
                        setFieldValue(field.name, value);
                        if (onChange) {
                            onChange(value);
                        }
                    }}
                    sx={{width: '100%'}}
                    format={'DD/MM/YYYY'}
                    slotProps={{
                        field: {
                            readOnly: true
                        }
                    }}
                    error={meta.touched && meta.error !== undefined && meta.error !== null && meta.error.trim().length > 0}
                    helperText={meta.touched && meta.error ? meta.error : ''}
                />
            </LocalizationProvider>
        </Grid>
    );
};
