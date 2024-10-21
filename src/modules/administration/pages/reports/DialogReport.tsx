import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setOpenDialog} from '../../../../store/modules/administration/report/reportSlice.ts';
import {
    useClienteListStore, useMechanicListStore,
    useReportsStore,
    useTipoRepuestoListStore,
    useTipoServicioListStore,
    useTypeVehicleListStore, useVehicleBrandListStore
} from '../../../../hooks';
import {Form, Formik} from 'formik';
import {useEffect, useRef, useState} from 'react';
import {FormikProps} from 'formik/dist/types';
import {CustomDatePicker, CustomInputText, CustomSelect} from '../../../../components/form';
import moment, {Moment} from 'moment';
import {reportsKeys} from '../../../../util';

export const DialogReport = () => {

    const {content: tipoServicioContent} = useTipoServicioListStore(5000);
    const {content: tipoRepuestoContent} = useTipoRepuestoListStore(5000);
    const {content: tipoVehiculoContent } = useTypeVehicleListStore(5000);
    const {content: marcaVehiculoContent} = useVehicleBrandListStore(5000);
    const {content: mecanicoContent} = useMechanicListStore(5000);
    const {content: clientesContent} = useClienteListStore(5000);
    const {url, title} = useParams();
    const {handleDownloadReport} = useReportsStore();
    const formikRef = useRef<FormikProps<any>>();
    const [initValues, setInitValues] = useState({});
    const [startDateValue, setStartDateValue] = useState<Moment>(moment().startOf('month'));
    const report = useSelector(state => state.reportSlice);
    const dispatch = useDispatch();

    const handleCloseDialog = () => {
        dispatch(setOpenDialog(false));
    }

    const handleDownload = async () => {
        await handleDownloadReport(url, title);
        dispatch(setOpenDialog(false));
    }

    const handleSubmit = async (formValues) => {
        console.log(formValues);
    }

    useEffect(() => {
        switch (url) {
            case reportsKeys.serviciosMenosSolicitados:
            case reportsKeys.serviciosMasSolicitados:
                setInitValues({
                    startDate: moment().startOf('month'),
                    endDate: moment(),
                    tipoServicio: 0,
                });
                return;
            case reportsKeys.repuestosMenosCaros:
            case reportsKeys.repuestosMasCaros:
                setInitValues({
                    startDate: moment().startOf('month'),
                    endDate: moment(),
                    tipoRepuesto: 0
                });
                return;
            case reportsKeys.marcasMasAtendidas:
                setInitValues({
                    startDate: moment().startOf('month'),
                    endDate: moment(),
                    tipoDeVehiculo: 0,
                    marca: 0
                });
                return;
            case reportsKeys.clientesMasRecurrentes:
                setInitValues({
                    startDate: moment().startOf('month'),
                    endDate: moment(),
                    tipoDeVehiculo: 0,
                });
                return;
            case reportsKeys.mecanicosConMaServicios:
                setInitValues({
                    startDate: moment().startOf('month'),
                    endDate: moment(),
                    tipoServicio: 0,
                    tipoVehiculo: 0,
                    marca: 0
                });
                return;
            case reportsKeys.serviciosPrestadosMasCaros:
            case reportsKeys.serviciosPrestadosMenosCaros:
                setInitValues({
                    startDate: moment().startOf('month'),
                    endDate: moment(),
                    tipoServicio: 0,
                    mecanico: 0
                });
                return;
            case reportsKeys.vehiculosMenosNuevosReparados:
            case reportsKeys.vehiculosMasNuevosReparados:
            case reportsKeys.diasConMasMenosCitas:
                setInitValues({
                    startDate: moment().startOf('month'),
                    endDate: moment(),
                    placa: '',
                    tipoVehiculo: 0,
                    cliente: 0,
                });
                return;
        }

    }, [url]);

    const renderComponent = () => {
        switch (url) {
            case reportsKeys.serviciosMenosSolicitados:
            case reportsKeys.serviciosMasSolicitados:
                return (
                    <>
                        <CustomDatePicker
                            xs={3}
                            label={'Fecha inicial'}
                            name={'startDate'}
                            maxDate={moment()}
                            onChange={value => setStartDateValue(value)}
                        />
                        <CustomDatePicker
                            xs={3}
                            label={'Fecha final'}
                            name={'endDate'}
                            maxDate={moment()}
                            minDate={startDateValue}
                        />
                        <CustomSelect label={'Tipo de Servicio'} name={'tipoServicio'}>
                            {
                                tipoServicioContent.map(item => (
                                    <MenuItem key={item.tsrCodigo} value={item.tsrCodigo}>
                                        {item.tsrNombre}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                    </>
                );
            case reportsKeys.repuestosMenosCaros:
            case reportsKeys.repuestosMasCaros:
                return (
                    <>
                        <CustomDatePicker
                            xs={3}
                            label={'Fecha inicial'}
                            name={'startDate'}
                            maxDate={moment()}
                            onChange={value => setStartDateValue(value)}
                        />
                        <CustomDatePicker
                            xs={3}
                            label={'Fecha final'}
                            name={'endDate'}
                            maxDate={moment()}
                            minDate={startDateValue}
                        />
                        <CustomSelect label={'Tipo de Repuesto'} name={'tipoServicio'}>
                            {
                                tipoRepuestoContent.map(item => (
                                    <MenuItem key={item.trpCodigo} value={item.trpCodigo}>
                                        {item.trpNombre}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                    </>
                );
            case reportsKeys.marcasMasAtendidas:
                return (
                    <>
                        <CustomDatePicker
                            xs={2}
                            label={'Fecha inicial'}
                            name={'startDate'}
                            maxDate={moment()}
                            onChange={value => setStartDateValue(value)}
                        />
                        <CustomDatePicker
                            xs={2}
                            label={'Fecha final'}
                            name={'endDate'}
                            maxDate={moment()}
                            minDate={startDateValue}
                        />

                        <CustomSelect xs={3} label={'Tipo de Vehiculo'} name={'tipoDeVehiculo'}>
                            {
                                tipoVehiculoContent.map((item) => (
                                    <MenuItem key={item.tveCodigo} value={item.tveCodigo}>
                                        {item.tveNombre}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>

                        <CustomSelect xs={5} label={'Marca Vehiculo'} name={'marca'}>
                            {
                                marcaVehiculoContent.map((item) => (
                                    <MenuItem key={item.mveCodigo} value={item.mveCodigo}>
                                        {item.mveNombre}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                    </>
                );
            case reportsKeys.clientesMasRecurrentes:
                return (
                    <>
                        <CustomDatePicker
                            xs={2}
                            label={'Fecha inicial'}
                            name={'startDate'}
                            maxDate={moment()}
                            onChange={value => setStartDateValue(value)}
                        />
                        <CustomDatePicker
                            xs={2}
                            label={'Fecha final'}
                            name={'endDate'}
                            maxDate={moment()}
                            minDate={startDateValue}
                        />

                        <CustomSelect xs={4} label={'Tipo de Vehiculo'} name={'tipoVehiculo'}>
                            {
                                tipoVehiculoContent.map((item) => (
                                    <MenuItem key={item.tveCodigo} value={item.tveCodigo}>
                                        {item.tveNombre}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                    </>
                );
            case reportsKeys.mecanicosConMaServicios:
                return (
                    <>
                        <CustomDatePicker
                            xs={2}
                            label={'Fecha inicial'}
                            name={'startDate'}
                            maxDate={moment()}
                            onChange={value => setStartDateValue(value)}
                        />
                        <CustomDatePicker
                            xs={2}
                            label={'Fecha final'}
                            name={'endDate'}
                            maxDate={moment()}
                            minDate={startDateValue}
                        />

                        <CustomSelect xs={4} label={'Tipo de Vehiculo'} name={'tipoDeVehiculo'}>
                            {
                                tipoVehiculoContent.map((item) => (
                                    <MenuItem key={item.tveCodigo} value={item.tveCodigo}>
                                        {item.tveNombre}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                        <CustomSelect xs={3} label={'Marca Vehiculo'} name={'marca'}>
                            {
                                marcaVehiculoContent.map((item) => (
                                    <MenuItem key={item.mveCodigo} value={item.mveCodigo}>
                                        {item.mveNombre}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                        <CustomSelect label={'Tipo de Servicio'} name={'tipoServicio'}>
                            {
                                tipoServicioContent.map(item => (
                                    <MenuItem key={item.tsrCodigo} value={item.tsrCodigo}>
                                        {item.tsrNombre}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                    </>
                );
            case reportsKeys.serviciosPrestadosMenosCaros:
            case reportsKeys.serviciosPrestadosMasCaros:
                return (
                    <>
                        <CustomDatePicker
                            xs={2}
                            label={'Fecha inicial'}
                            name={'startDate'}
                            maxDate={moment()}
                            onChange={value => setStartDateValue(value)}
                        />
                        <CustomDatePicker
                            xs={2}
                            label={'Fecha final'}
                            name={'endDate'}
                            maxDate={moment()}
                            minDate={startDateValue}
                        />
                        <CustomSelect xs={3} label={'Tipo de Servicio'} name={'tipoServicio'}>
                            {
                                tipoServicioContent.map(item => (
                                    <MenuItem key={item.tsrCodigo} value={item.tsrCodigo}>
                                        {item.tsrNombre}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                        <CustomSelect xs={5} label={'Mecanico'} name={'mecanico'}>
                            {
                                mecanicoContent.map(item => (
                                    <MenuItem key={item.mecCodigo} value={item.mecCodigo}>
                                        {`${item.mecCodigo} - ${item.mecNombres} ${item.mecApellidos}`}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                    </>
                );
            case reportsKeys.vehiculosMenosNuevosReparados:
            case reportsKeys.vehiculosMasNuevosReparados:
            case reportsKeys.diasConMasMenosCitas:
                return (
                    <>
                        <CustomDatePicker
                            xs={3}
                            label={'Fecha inicial'}
                            name={'startDate'}
                            maxDate={moment()}
                            onChange={value => setStartDateValue(value)}
                        />
                        <CustomDatePicker
                            xs={3}
                            label={'Fecha final'}
                            name={'endDate'}
                            maxDate={moment()}
                            minDate={startDateValue}
                        />
                        <CustomInputText label={'Placa'} name={'placa'} />
                        <CustomSelect xs={3} label={'Tipo de Vehiculo'} name={'tipoDeVehiculo'}>
                            {
                                tipoVehiculoContent.map((item) => (
                                    <MenuItem key={item.tveCodigo} value={item.tveCodigo}>
                                        {item.tveNombre}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                        <CustomSelect xs={3} label={'Cliente'} name={'cliente'}>
                            {
                                clientesContent.map((item) => (
                                    <MenuItem key={item.cliCodigo} value={item.cliCodigo}>
                                        {item.cliNombres}
                                    </MenuItem>
                                ))
                            }
                        </CustomSelect>
                    </>
                );
        }
    }

    return (
        <Dialog
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            open={report.openDialog}
            maxWidth={'lg'} fullWidth
        >
            <DialogTitle id="alert-dialog-title">
                {`Reporte ${title}`}
            </DialogTitle>
            <DialogContent>
                <Formik
                    innerRef={formikRef}
                    initialValues={initValues}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {
                        _ => (
                            <Form>
                                <Grid sx={{p: 1}} container spacing={2}>
                                    {renderComponent()}
                                </Grid>
                            </Form>
                        )
                    }
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cerrar</Button>
                <Button onClick={async () => {
                    await formikRef.current?.submitForm();
                }} autoFocus> Descargar </Button>
            </DialogActions>
        </Dialog>
    );
};
