import {useField} from "formik";
import {Grid, TextField} from "@mui/material";

interface Props {
	label: string;
	name: string;
	type?: 'text' | 'email' | 'password' | 'number';
	placeholder?: string;
	xs?: number;
	[x: string]: any;
}

export const CustomInputText = ({ xs = 6, ...props }: Props) => {

	const [field, meta] = useField(props);

	return (
		<Grid item xs={xs}>
			<TextField
				{...field}
				{...props}
				error={meta.touched && meta.error !== undefined && meta.error !== null && meta.error.trim().length > 0}
				id="outlined-error-helper-text"
				helperText={meta.touched && meta.error ? meta.error : ''}
				sx={{width: '100%'}}
			>

			</TextField>
		</Grid>
	)
}
