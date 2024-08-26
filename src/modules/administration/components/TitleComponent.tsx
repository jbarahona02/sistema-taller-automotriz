import {DialogTitle} from "@mui/material";
import {mainTheme} from "../../../theme/mainTheme.ts";

interface Props {
	title: string;
}

export const TitleComponent = ({ title }: Props) => {
	return (
		<DialogTitle sx={{
				color: mainTheme.palette.primary.dark,
				textAlign: "left",
				p: 0,
				mb: 1,
				fontSize: '30px',
				fontWeight: 'bold',
				textTransform: "uppercase",
				fontFamily: "sans-serif"
			}}
		>
			{title}
		</DialogTitle>
	)
}
