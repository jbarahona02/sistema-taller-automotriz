import {Grid, IconButton} from "@mui/material";
import {Form, Formik, FormikValues} from "formik";
import {FormikHelpers, FormikProps} from "formik/dist/types";
import React, {ReactElement, useRef} from "react";
import {CancelOutlined, SearchOutlined} from "@mui/icons-material";

interface Props {
    children: ReactElement | ReactElement[];
    initialValues: FormikValues;
    validationSchema?: any | (() => any);
    onSubmit: (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>) => void;
    onClean?: () => void;
    useCustom?: boolean;
}

export const SearchBarLayout = ({
                                    children,
                                    initialValues,
                                    validationSchema,
                                    onSubmit,
                                    onClean,
                                    useCustom,
                                }: Props) => {
    const formRef = useRef<FormikProps<any>>(null);

    const onClick = () => {
        formRef.current?.resetForm();
        if (onClean) onClean();
    }

    return (
        <Grid
            container
            spacing={2}
            sx={{
                backgroundColor: 'white',
                borderRadius: 5,
                paddingTop: 0,
                marginTop: 2,
                marginLeft: -1
            }}
            alignItems={'center'}
            className={'grid-main-container'}
        >
            <Grid item xs={10} style={{paddingBottom: 15}}>
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
                                {
                                    useCustom
                                        ? <Grid container spacing={2} direction="row"> {children} </Grid>
                                        : <Grid container spacing={2} direction="row">
                                            {React.Children.map(children, (child) => (
                                                <Grid item xs="auto">
                                                    {child}
                                                </Grid>
                                            ))}
                                        </Grid>
                                }
                            </Form>
                        )
                    }}
                </Formik>
            </Grid>
            <Grid item xs={2} sx={{pl: 1.5}}>
                <IconButton onClick={() => formRef.current?.submitForm()}>
                    <SearchOutlined/>
                </IconButton>
                <IconButton onClick={onClick}>
                    <CancelOutlined style={{color: 'red'}}/>
                </IconButton>
            </Grid>
        </Grid>
    );
};
