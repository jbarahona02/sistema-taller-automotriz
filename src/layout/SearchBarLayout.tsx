import { Avatar, Box, Grid, IconButton } from "@mui/material";
import { Form, Formik, FormikValues } from "formik";
import {FormikProps} from "formik/dist/types";
import { ReactElement, useRef } from "react";
import { FormikHelpers } from "formik/dist/types";
import { CancelOutlined, SearchOutlined } from "@mui/icons-material";
import React from "react";
import { CustomSwitchComponent } from "../components/form";

interface Props {
    children: ReactElement | ReactElement[];
    initialValues: FormikValues;
    validationSchema?: any | (() => any);
    onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void;
}

export const SearchBarLayout = ({
    children,
    initialValues,
    validationSchema,
    onSubmit
}: Props) => {
    const formRef = useRef<FormikProps<any>>(null);
    return (
        <Grid
            container
            spacing={2}
            sx={{
                backgroundColor: 'white',
                borderRadius: 5,
                paddingTop: 0,
                marginTop: 2,
                marginLeft: -1,
            }}
            alignItems={'center'}
            className={'grid-main-container'}
        >
            <Grid item xs={10} style={{ paddingBottom: 15 }}>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize={true}
                    innerRef={formRef}
                >
                    {(props) => {

                        return (
                            <Form>
                                <Grid container spacing={2} direction="row">
                                    {React.Children.map(children, (child) => (
                                        <Grid item xs="auto">
                                            {child}
                                        </Grid>
                                    ))}
                                    {/* <Grid item xs="auto">
                                        <CustomSwitchComponent label="Valor" name="valor" />
                                    </Grid> */}
                                </Grid>
                            </Form>
                        )
                    }}
                </Formik>
            </Grid>
            <Grid item xs={2} sx={{ pl: 1.5 }}>
                <IconButton onClick={() => formRef.current?.submitForm()}>
                    <SearchOutlined />
                </IconButton>
                <IconButton onClick={() => formRef.current?.resetForm()}>
                    <CancelOutlined style={{ color: 'red' }} />
                </IconButton>
            </Grid>
        </Grid>
    );
};
