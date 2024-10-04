import {Box, Button, Grid, Tooltip} from "@mui/material";
import {Add, ArrowBack, PowerSettingsNew, Backspace, SaveAs} from "@mui/icons-material";
import {TitleComponent} from "../modules/administration";
import {Form, Formik, FormikValues} from "formik";
import {ReactElement} from "react";
import {FormikHelpers} from "formik/dist/types";

interface Props {
    useButtons?: boolean;
    useStatus?: boolean;
    statusActive?: boolean;
    children: ReactElement | ReactElement[];
    initialValues: FormikValues;
    validationSchema?: any | (() => any);
    onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void;
    onCancel: () => void;
    onClean?: () => void;
    onChangeStatus?: () => void;
}


export const FormLayout = ({
                               useButtons = true,
                               useStatus = false,
                               statusActive = false,
                               children,
                               initialValues,
                               validationSchema,
                               onSubmit,
                               onCancel,
                               onChangeStatus,
                           }: Props) => {
    return (
        <>
            <Grid
                container
                spacing={0}
                // style={{paddingRight: 200}}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 2,
                    p: 3
                }}
                className={'grid-main-container'}
            >
                <Box className={'form-header'}>
                    {

                        useStatus &&
                        (
                            <Tooltip title={`${statusActive ? 'Habilitado' : 'Deshabilitado'}`}>
                                <Button
                                    className={`form-status-button ${statusActive ? 'active' : 'inactive'}`}
                                    too={'Test'}
                                    onClick={onChangeStatus}
                                >
                                    <PowerSettingsNew/>
                                </Button>
                            </Tooltip>
                        )
                    }

                </Box>
                <Box sx={{width: '100%'}}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={onSubmit}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                    >
                        {
                            _ => (
                                <Form>
                                    <Box className={'form-content'}>
                                        <Grid container spacing={2}>
                                            {children}
                                        </Grid>
                                    </Box>
                                    {
                                        useButtons &&
                                        <div className="button-container">
                                            <Button variant="contained" type="button" onClick={onCancel}
                                                    id="cancel-button"> Cancelar <Backspace
                                                sx={{marginLeft: '5px', color: "white", height: "18px"}}/></Button>
                                            <Button variant="contained" type="submit"
                                                    id="submit-button"> Guardar <SaveAs
                                                sx={{marginLeft: '5px', color: "white", height: "18px"}}/> </Button>
                                        </div>
                                    }
                                </Form>
                            )
                        }
                    </Formik>
                </Box>
            </Grid>
        </>
    )
}
