import {TitleComponent} from '../../components';
import {QueryContentLayout, SearchBarLayout} from '../../../../layout';
import {CustomDatePicker, CustomInputText, CustomSelect} from '../../../../components/form';
import moment from 'moment';
import {useEffect, useState} from 'react';
import {
    ContentOrdenTrabajo,
    Desperfecto,
    OrdenTrabajoPaging,
    ordenTrabajoStore,
    ServiciosOrdenTrabajo
} from '../../../../hooks/ordenTrabajo/ordenTrabajoStore.ts';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    List,
    ListItemText,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from '@mui/material';
import {FormLayout} from '../../../../layout/FormLayout.tsx';
import {Utilities} from '../../../../util';
import {Backspace, CheckCircle, Construction, ProductionQuantityLimits, RemoveRedEye, SaveAs} from '@mui/icons-material'
import {servicioOrdenTrabajoStore} from '../../../../hooks/servicioOrdenTrabajo/servicioOrdenTrabajoStore.ts';
import {Form, Formik} from 'formik';
import {useMechanicListStore, useServicioListStore, useTipoPagoListStore} from '../../../../hooks';
import {ProductoInterface, RepuestoInterface} from '../../../../interfaces';
import {ApplyPayment, DescribePayment, pagosStore} from '../../../../hooks/pagos/pagosStore.ts';
import {
    agregarProductoValidations,
    agregarRepuestoValidations,
    agregarServicioValidations,
    desperfectoValidations
} from './validations/formulariosValidations.ts';
import * as Yup from 'yup';


const parseValue = (estado: string): string => {
    switch (estado) {
        case 'CREADO':
            return 'Creado';
        case 'EN_PROCESO':
            return 'Orden en Proceso';
        case 'TERMINADA':
            return 'Orden Terminada';
        case 'PAGADO':
            return 'Orden Pagada';
        case 'PG_PROCESO':
            return 'Pago en Proceso';
    }
}

export const ConsultaOrdenesDeTrabajo = () => {

    const {findAll, findById, agregarDesperfecto} = ordenTrabajoStore();
    const {describePayment, applyPayment, historialDePagos} = pagosStore();
    const {findAll: findAllTipoPagos, content: contentTipoPagos} = useTipoPagoListStore();
    const {
        findById: findServicioOrdenTrabajo,
        save: saveServicioOrdenTrabajo,
        agregarProducto,
        agregarRepuesto,
        terminarServicio
    } = servicioOrdenTrabajoStore()
    const {findAll: mecanicFindAll, content: mechanicContent} = useMechanicListStore();
    const {
        findAll: serviciosFindAll,
        content: serviciosContent,
        productosPorServicio,
        repuestosPorServicio
    } = useServicioListStore();
    const [{startDate, endDate}, setFormInitialDates] = useState({
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
    const [responsePaging, setResponsePaging] = useState<OrdenTrabajoPaging>();
    const [parseResponsing, setParseResponsing] = useState<any[]>([]);
    const [openVewDialog, setOpenVewDialog] = useState(false);
    const [openServiceDialog, setOpenServiceDialog] = useState(false);
    const [body, setBody] = useState<ContentOrdenTrabajo>();
    const [servicioOrdenTrabajo, setServicioOrdenTrabajo] = useState<ServiciosOrdenTrabajo>();
    const [openAgregarDesperfecto, setOpenAgregarDesperfecto] = useState(false);
    const [openAddService, setOpenAddService] = useState(false);
    const [openAgregarProducto, setOpenAgregarProducto] = useState(false);
    const [openAgregarRepuesto, setOpenAgregarRepuesto] = useState(false);
    const [productos, setProductos] = useState<ProductoInterface[]>([]);
    const [repuestos, setRepuestos] = useState<RepuestoInterface[]>([]);
    const [openPayment, setOpenPayment] = useState(false);
    const [paymentDescribe, setPaymentDescribe] = useState<DescribePayment>();
    const [openHistorialPagos, setOpenHistorialPagos] = useState(false);
    const [paymentHistory, setPaymentHistory] = useState<ApplyPayment[]>([]);
    const [paymentValidations, setPaymentValidations] = useState(Yup.object({
        total: Yup
            .number()
            .typeError('Solo acepta números')
            .positive('Solo valores positivos')
            .min(1, 'No se pueden realizar pagos a 0')
            .required('El total a pagar es requerido'),
        tpaCodigo: Yup
            .number()
            .moreThan(0, 'El tipo de pago es requerido')
    }))

    const handleSubmit = async (formValues) => {
        const response = await findAll(formValues.inicioFechaCreacion, formValues.finFechaCreacion);
        setResponsePaging(response);
    }

    const handleOnView = async (body: ContentOrdenTrabajo) => {
        const response = await findById(body.ortCodigo);
        setBody(response);
        setOpenVewDialog(true);
    }

    const handleOnViewService = async (sorCodigo: number) => {
        const response = await findServicioOrdenTrabajo(sorCodigo);
        setOpenServiceDialog(true);
        setServicioOrdenTrabajo(response);
    }

    const handleAgregarDesperfecto = async (code) => {
        const response = await findById(+code);
        setOpenAgregarDesperfecto(true);
        setBody(response);
    }

    const handleAddService = async (body: ContentOrdenTrabajo) => {
        const response = await findById(body.ortCodigo);
        setOpenAddService(true);
        setBody(response);
    }

    const handleOpenAgregarProducto = async (srvCodigo: number, sorCodigo: number) => {
        const productos = await productosPorServicio(srvCodigo);
        const response = await findServicioOrdenTrabajo(sorCodigo);
        setServicioOrdenTrabajo(response);
        setProductos(productos);
        setOpenAgregarProducto(true);
    }

    const handleSubmitAgregarProducto = async (formikValues) => {
        setOpenAgregarProducto(false);
        await agregarProducto(+formikValues.cantidad, +formikValues.proCodigo, servicioOrdenTrabajo?.sorCodigo ?? 0);
    }

    const handleOpenAgregarRepuesto = async (srvCodigo: number, sorCodigo: number) => {
        const repuestos = await repuestosPorServicio(srvCodigo);
        const response = await findServicioOrdenTrabajo(sorCodigo);
        setServicioOrdenTrabajo(response);
        setRepuestos(repuestos);
        setOpenAgregarRepuesto(true);
    }

    const handleSubmitAgregarRepuesto = async (formikValues) => {
        setOpenAgregarRepuesto(false);
        await agregarRepuesto(+formikValues.cantidad, +formikValues.repCodigo, servicioOrdenTrabajo!.sorCodigo!);
    }

    const handleTerminarServicio = async (ortCodigo: number, sorCodigo: number) => {
        await terminarServicio(sorCodigo);
        const body = await findById(ortCodigo);
        setBody(body);
    }

    const handleOpenPaymentHistory = async (ortCodigo: number) => {
        const history = await historialDePagos(ortCodigo);
        setPaymentHistory(history);
        setOpenHistorialPagos(true);
    }

    const handleSumbitPayment = async (formikValues) => {
        const applyPaymentBody: ApplyPayment = {
            ortCodigo: body?.ortCodigo,
            pagDocumentoPago: formikValues.document,
            pagNumeroAutorizacion: formikValues.autorizacion,
            tpaCodigo: formikValues.tpaCodigo,
            pagReferencia: formikValues.referencia,
            pagTotal: +formikValues.total
        };

        setOpenPayment(prev => !prev);
        await applyPayment(applyPaymentBody);
        const pagingResponse = await findAll(startDate, endDate);
        setResponsePaging(pagingResponse);
    }

    const handleCloseViewDialog = async () => {
        setOpenVewDialog(false);
        const pageResponse = await findAll(startDate, endDate);
        setResponsePaging(pageResponse);
    }

    const openApplyPayment = async (content: ContentOrdenTrabajo) => {
        setOpenPayment(true);
        const findContent = await findById(content.ortCodigo);
        setBody(findContent);
        const payment = await describePayment(content.ortCodigo);
        setPaymentDescribe(payment);
        await findAllTipoPagos();
    }

    const closeApplyPayment = async () => {
        setOpenPayment(false);
        const response = await findAll(startDate, endDate);
        setResponsePaging(response);
    }

    const handleAgregarServicio = async (formikValues) => {
        const servicioOrdenTrabajo = {
            diasGarantia: +formikValues.diasGarantia,
            fechaEntrega: formikValues.fechaEntrega,
            mecCodigo: formikValues.mecCodigo,
            srvCodigo: formikValues.srvCodigo,
            ortCodigo: body?.ortCodigo,
            estadoPrevio: formikValues.estadoPrevio.trim()
        }
        const resultSave = await saveServicioOrdenTrabajo(servicioOrdenTrabajo);
        if (!resultSave) return;
        const pagingResponse = await findAll(startDate, endDate);
        setResponsePaging(pagingResponse);
        setOpenAddService(false);
        await Utilities.successAlarm('Se ha creado el nuevo servicio');
    }

    const handleSubmitDesperfecto = async (formikValues) => {
        const desperfecto: Desperfecto = {
            ortCodigo: body?.ortCodigo!,
            desperfecto: formikValues.desperfecto.trim()
        };


        setOpenAgregarDesperfecto(false);
        await agregarDesperfecto(desperfecto);
    }

    const handleChangePaymentType = (paymentType: number) => {
        switch (paymentType) {
            case 1:
                setPaymentValidations(prev => Yup.object({
                    total: Yup
                        .number()
                        .typeError('Solo acepta números')
                        .positive('Solo valores positivos')
                        .min(1, 'No se pueden realizar pagos a 0')
                        .required('El total a pagar es requerido'),
                    tpaCodigo: Yup
                        .number()
                        .moreThan(0, 'El tipo de pago es requerido'),
                    referencia: Yup
                        .string()
                        .trim()
                        .required('La referencia es requerida')
                        .max(30, 'Máximo 30 cáracteres'),
                    autorizacion: Yup
                        .string()
                        .trim()
                        .required('La autorización es requerida')
                        .max(30, 'Máximo 30 minutos'),
                }));
                break;
            case 2:
                setPaymentValidations(prev => Yup.object({
                    total: Yup
                        .number()
                        .typeError('Solo acepta números')
                        .positive('Solo valores positivos')
                        .min(1, 'No se pueden realizar pagos a 0')
                        .required('El total a pagar es requerido'),
                    tpaCodigo: Yup
                        .number()
                        .moreThan(0, 'El tipo de pago es requerido'),
                    document: Yup
                        .string()
                        .trim()
                        .required('El documento es requerido')
                        .max(30, 'Máximo 30 cáracteres'),
                }));
                break;
            case 3:
                setPaymentValidations(Yup.object({
                    total: Yup
                        .number()
                        .typeError('Solo acepta números')
                        .positive('Solo valores positivos')
                        .min(1, 'No se pueden realizar pagos a 0')
                        .required('El total a pagar es requerido'),
                    tpaCodigo: Yup
                        .number()
                        .moreThan(0, 'El tipo de pago es requerido')
                }));
                break;
            case 4:
                setPaymentValidations(prev => Yup.object({
                    total: Yup
                        .number()
                        .typeError('Solo acepta números')
                        .positive('Solo valores positivos')
                        .min(1, 'No se pueden realizar pagos a 0')
                        .required('El total a pagar es requerido'),
                    tpaCodigo: Yup
                        .number()
                        .moreThan(0, 'El tipo de pago es requerido'),
                    autorizacion: Yup
                        .string()
                        .trim()
                        .required('La autorizacion es requerida')
                        .max(30, 'Máximo 30 minutos')
                }));
                break;
        }
    }

    useEffect(() => {
        findAll(startDate, endDate).then(
            value => {
                setResponsePaging(value);
            }
        );
        mecanicFindAll().then();
        serviciosFindAll().then()
    }, []);

    useEffect(() => {
        if (!responsePaging?.content || responsePaging?.content.length === 0) {
            setParseResponsing([]);
            return;
        }

        setParseResponsing(
            responsePaging?.content.map((item) => ({
                ...item,
                vehiculo: item.vehiculo ? item.vehiculo.vehPlaca : 'No disponible',
                fechaEntrega: moment(item.ortFechaEntrega).format('DD/MM/YYYY'),
                estadoOrden: parseValue(item.ortStatus),
                taller: item.taller.tllNombre,
                estadoPrevio: item.ortEstadoPrevio
            }))
        );
    }, [responsePaging]);

    return (
        <>

            <TitleComponent title={'Consulta ordenes de trabajo'}/>

            <SearchBarLayout
                initialValues={{
                    inicioFechaCreacion: startDate,
                    finFechaCreacion: endDate
                }}
                useCustom
                onSubmit={handleSubmit}
                onClean={console.log}
            >
                <CustomDatePicker label={'Fecha inicial'}
                                  name={'inicioFechaCreacion'} xs={4}
                                  onChange={value => setFormInitialDates(prev => ({
                                      ...prev,
                                      startDate: value?.startOf('day')
                                  }))}
                                  restrictToToday={false}
                                  maxDate={endDate}
                />
                <CustomDatePicker label={'Fecha final'}
                                  name={'finFechaCreacion'} xs={4}
                                  minDate={startDate}
                                  onChange={value => setFormInitialDates(prev => ({
                                      ...prev,
                                      endDate: value?.endOf('month')
                                  }))}
                />
            </SearchBarLayout>


            <QueryContentLayout<ContentOrdenTrabajo>
                tableHeaders={['Vehiculo', 'Taller', 'Descripcion', 'Estado', 'Fecha estimada entrega', 'Acciones']}
                tableBody={parseResponsing}
                properties={['vehiculo', 'taller', 'estadoPrevio', 'estadoOrden', 'fechaEntrega']}
                idField={'ortCodigo'}
                onView={handleOnView}
                useDelete={false}
                useAdd={false}
                disableService={item => ['TERMINADA', 'PAGADO', 'PG_PROCESO'].includes(item.ortStatus)}
                disableUpdate={item => ['TERMINADA', 'PAGADO', 'PG_PROCESO'].includes(item.ortStatus)}
                disablePayment={item => item.ortStatus !== 'TERMINADA' && item.ortStatus !== 'PG_PROCESO'}
                disabledPaymentHistory={item => !(['PG_PROCESO', 'PAGADO'].includes(item.ortStatus))}
                showPaymentHistory
                payment
                applyPayment={openApplyPayment}
                addService
                updateTooltip={'Agregar desperfecto'}
                detail
                paymentHistory={item => handleOpenPaymentHistory(item?.ortCodigo ?? 0)}
                onUpdate={handleAgregarDesperfecto}
                addServiceAction={handleAddService}
            />

            <Dialog open={openAgregarDesperfecto} maxWidth={'md'} fullWidth>
                <DialogTitle>
                    <Typography variant={'h5'}>AGREGAR DESPERFECTO</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{p: 2.5}}>
                        <Formik
                            initialValues={{
                                desperfecto: ''
                            }}
                            validationSchema={desperfectoValidations}
                            onSubmit={handleSubmitDesperfecto}
                        >
                            {
                                props => (
                                    <>
                                        <Form>
                                            <CustomInputText label={'Desperfecto*'} name={'desperfecto'}/>
                                        </Form>
                                        <Box className="button-container" sx={{mt: 2.5}}>
                                            <Button variant="contained"
                                                    type="button"
                                                    onClick={() => setOpenAgregarDesperfecto(false)}
                                                    id="cancel-button"
                                            > Cancelar
                                                <Backspace sx={{
                                                    marginLeft: '5px',
                                                    color: "white",
                                                    height: "18px"
                                                }}
                                                />
                                            </Button>

                                            <Button variant="contained"
                                                    type="submit"
                                                    id="submit-button"
                                                    onClick={() => props.submitForm()}
                                            >
                                                Guardar
                                                <SaveAs sx={{
                                                    marginLeft: '5px',
                                                    color: "white",
                                                    height: "18px"
                                                }}/>
                                            </Button>
                                        </Box>
                                    </>

                                )
                            }
                        </Formik>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={openAddService} maxWidth={'lg'} fullWidth>
                <DialogTitle>
                    <Typography variant={'h5'}>AGREGAR SERVICIO</Typography>
                </DialogTitle>
                <DialogContent>
                    <FormLayout
                        initialValues={{
                            estadoPrevio: '',
                            fechaEntrega: moment().add('days', 1),
                            diasGarantia: 1,
                            srvCodigo: 0,
                            mecCodigo: 0
                        }}
                        onSubmit={handleAgregarServicio}
                        validationSchema={agregarServicioValidations(body?.ortDiasGarantia ?? 0)}
                        onCancel={() => setOpenAddService(false)}
                    >
                        <CustomDatePicker label={'Fecha de Entrega*'} name={'fechaEntrega'}
                                          minDate={moment().add('days', 1)}/>
                        <CustomInputText label={'Dias de garantía*'} name={'diasGarantia'}/>
                        <CustomSelect label={'Servicio*'} name={'srvCodigo'}>
                            {serviciosContent.map(item => (
                                <MenuItem key={item.srvCodigo} value={item.srvCodigo}>
                                    {item.srvNombre}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                        <CustomSelect label={'Mecanico*'} name={'mecCodigo'}>
                            {mechanicContent.map(item => (
                                <MenuItem key={item.mecCodigo} value={item.mecCodigo}>
                                    {`${item.mecNombres} ${item.mecApellidos}`}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                        <CustomInputText label={'Estado Previo*'} name={'estadoPrevio'} xs={12}/>
                    </FormLayout>
                </DialogContent>
            </Dialog>

            <Dialog open={openVewDialog} maxWidth={'lg'} fullWidth>
                <DialogTitle id="alert-dialog-title">
                    <Typography variant={'h5'}>DETALLE ORDEN TRABAJO</Typography>
                </DialogTitle>
                <DialogContent>
                    <FormLayout initialValues={{
                        vehiculo: body?.vehiculo.vehPlaca,
                        cliente: `${body?.vehiculo.cliente.cliNombres} ${body?.vehiculo.cliente.cliApellidos}`,
                        taller: body?.taller.tllNombre,
                        fechaEntrega: `${moment(body?.ortFechaEntrega).format('DD/MM/YYY')}`,
                        detalle: body?.ortEstadoPrevio
                    }}
                                useButtons={false}
                                onSubmit={console.log}
                                onCancel={console.log}
                    >
                        <CustomInputText label={'Cliente'} name={'cliente'} disabled/>
                        <CustomInputText label={'Vehiculo'} name={'vehiculo'} disabled/>
                        <CustomInputText label={'Taller'} name={'taller'} disabled/>
                        <CustomInputText label={'Fecha estimada de entrega'} name={'fechaEntrega'} disabled/>
                        <CustomInputText label={'Detalle Estado Previo'} name={'detalle'} disabled xs={12}/>

                        <Box sx={{width: '100vw', p: '1.5rem'}}>
                            <Typography variant={'h5'}> Desperfectos </Typography>
                            <List>
                                {
                                    body?.desperfectos.map(
                                        (item, i) => (
                                            <ListItemText primary={`Desperfecto ${i + 1}`}
                                                          secondary={item.dsorDesperfecto}/>
                                        )
                                    )
                                }
                            </List>
                        </Box>

                        <Box sx={{width: '100vw', p: '1.5rem'}}>
                            <Typography variant={'h5'}> Servicios Asociados </Typography>
                            <TableContainer component={Paper} sx={{mt: '15px'}}>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Servicio</TableCell>
                                            <TableCell>Costo</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {body?.serviciosOrdenTrabajo.map((row) => (
                                            <TableRow key={row.servicio.srvCodigo}>
                                                <TableCell component="th"> {row.servicio.srvNombre} </TableCell>
                                                <TableCell>{Utilities.formatCurrency(row.servicio.srvCosto)}</TableCell>
                                                <TableCell>
                                                    <Tooltip title={'Productos'}>
                                                        <IconButton sx={{color: 'black'}}
                                                                    disabled={row.sorEstadoServicio === 'TERMINADA'}
                                                                    onClick={() => handleOpenAgregarProducto(row.servicio.srvCodigo, row.sorCodigo)}>
                                                            <ProductionQuantityLimits/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title={'Repuestos'}>
                                                        <IconButton sx={{color: 'black'}}
                                                                    disabled={row.sorEstadoServicio === 'TERMINADA'}
                                                                    onClick={() => handleOpenAgregarRepuesto(row.servicio.srvCodigo, row.sorCodigo)}>
                                                            <Construction/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <IconButton sx={{color: 'black'}}
                                                                onClick={() => handleOnViewService(row.sorCodigo)}>
                                                        <RemoveRedEye/>
                                                    </IconButton>
                                                    <Tooltip title={'Terminar Servicio'}>
                                                        <IconButton sx={{color: 'green'}}
                                                                    onClick={() => handleTerminarServicio(body!.ortCodigo!, row.sorCodigo)}
                                                                    disabled={row.sorEstadoServicio === 'TERMINADA'}
                                                        >
                                                            <CheckCircle/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </FormLayout>
                    <div className="button-container">
                        <Button
                            variant="contained"
                            type="button"
                            onClick={handleCloseViewDialog}
                            id="cancel-button">
                            Cerrar
                            <Backspace sx={{marginLeft: '5px', color: "white", height: "18px"}}/></Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openServiceDialog} maxWidth={'md'} fullWidth>
                <DialogTitle>
                    <Typography variant={'h5'}>DETALLE SERVICIO</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{width: '100%', p: 5}}>
                        <Formik
                            initialValues={{
                                servicio: servicioOrdenTrabajo?.servicio.srvNombre,
                                costo: Utilities.formatCurrency(servicioOrdenTrabajo?.servicio.srvCosto ?? 0),
                                initDate: moment(servicioOrdenTrabajo?.sorFechaServicio).format('DD/MM/YYYY'),
                                endDate: moment(servicioOrdenTrabajo?.sorFechaEntrega).format('DD/MM/YYYY'),
                            }}
                            onSubmit={console.log}
                        >
                            {
                                _ => (
                                    <Form>
                                        <Grid container spacing={2}>
                                            <CustomInputText label={'Servicio'} name={'servicio'} disabled/>
                                            <CustomInputText label={'Costo'} name={'costo'} disabled/>
                                            <CustomInputText label={'Fecha inicio servicio'} name={'initDate'}
                                                             disabled/>
                                            <CustomInputText label={'Fecha entrega servicio'} name={'endDate'}
                                                             disabled/>
                                        </Grid>
                                    </Form>
                                )
                            }


                        </Formik>
                        <Typography variant={'h4'} sx={{mt: 5, mb: 3}}>Productos utilizados</Typography>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Producto</TableCell>
                                    <TableCell>Cantidad utilizada</TableCell>
                                    <TableCell>Precio Unitario</TableCell>
                                    <TableCell>Fecha de uso</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {servicioOrdenTrabajo?.productos.map((row) => (
                                    <TableRow key={row.proCodigo}>
                                        <TableCell component="th" scope={'row'}> {row.proNombre} </TableCell>
                                        <TableCell
                                            align={'center'}>  {Utilities.formatDecimal(row.cantidad)}</TableCell>
                                        <TableCell
                                            align={'center'}>  {Utilities.formatCurrency(row.proPrecio)}</TableCell>
                                        <TableCell
                                            align={'center'}> {moment(row.fecha).format('DD/MM/YYYY')} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Typography variant={'h4'} sx={{mt: 5, mb: 3}}>Repuestos utilizados</Typography>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Repuesto</TableCell>
                                    <TableCell>Cantidad utilizada</TableCell>
                                    <TableCell>Precio Unitario</TableCell>
                                    <TableCell>Fecha de uso</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {servicioOrdenTrabajo?.repuestos.map((row) => (
                                    <TableRow key={row.repCodigo}>
                                        <TableCell component="th" scope={'row'}> {row.repNombre} </TableCell>
                                        <TableCell
                                            align={'center'}>  {Utilities.formatDecimal(row.cantidad)}</TableCell>
                                        <TableCell
                                            align={'center'}>  {Utilities.formatCurrency(row.repPrecio)}</TableCell>
                                        <TableCell
                                            align={'center'}> {moment(row.fecha).format('DD/MM/YYYY')} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </DialogContent>
                <DialogActions sx={{pb: 3}}>
                    <div className="button-container">
                        <Button
                            variant="contained"
                            type="button"
                            onClick={() => setOpenServiceDialog(false)}
                            id="cancel-button">
                            Cerrar
                            <Backspace sx={{marginLeft: '5px', color: "white", height: "18px"}}/></Button>
                    </div>
                </DialogActions>
            </Dialog>

            <Dialog open={openAgregarProducto} maxWidth={'md'} fullWidth>
                <DialogTitle>
                    <Typography variant={'h5'}> AGREGAR PRODUCTOS A SERVICIO </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{width: '100%', p: 5}}>
                        <Formik
                            initialValues={{cantidad: 0, proCodigo: 0}}
                            onSubmit={handleSubmitAgregarProducto}
                            validationSchema={agregarProductoValidations}
                        >
                            {
                                _ => (
                                    <Form>
                                        <Box>
                                            <Grid container spacing={2}>
                                                <CustomSelect label={'Producto'} name={'proCodigo'}>
                                                    {
                                                        productos.map(item => (
                                                            <MenuItem key={item.proCodigo} value={item.proCodigo}>
                                                                {item.proNombre}
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </CustomSelect>
                                                <CustomInputText label={'Cantidad'} name={'cantidad'}/>
                                            </Grid>
                                        </Box>

                                        <Box className="button-container" sx={{mt: 5}}>
                                            <Button
                                                variant="contained"
                                                type="button"
                                                onClick={() => setOpenAgregarProducto(false)}
                                                id="cancel-button">
                                                Cerrar
                                                <Backspace sx={{marginLeft: '5px', color: "white", height: "18px"}}/>
                                            </Button>

                                            <Button
                                                variant="contained"
                                                type="submit"
                                                id="submit-button">
                                                Guardar
                                                <SaveAs sx={{marginLeft: '5px', color: "white", height: "18px"}}/>
                                            </Button>
                                        </Box>
                                    </Form>
                                )
                            }
                        </Formik>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={openAgregarRepuesto} maxWidth={'md'} fullWidth>
                <DialogTitle>
                    <Typography variant={'h5'}> AGREGAR REPUESTOS A SERVICIO </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{width: '100%', p: 5}}>
                        <Formik
                            initialValues={{
                                cantidad: 0,
                                repCodigo: 0
                            }}
                            onSubmit={handleSubmitAgregarRepuesto}
                            validationSchema={agregarRepuestoValidations}
                        >
                            {
                                _ => (
                                    <Form>
                                        <Box>
                                            <Grid container spacing={2}>
                                                <CustomSelect label={'Repuesto'} name={'repCodigo'}>
                                                    {
                                                        repuestos.map(item => (
                                                            <MenuItem key={item.repCodigo} value={item.repCodigo}>
                                                                {item.repNombre}
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </CustomSelect>
                                                <CustomInputText label={'Cantidad'} name={'cantidad'}/>
                                            </Grid>
                                        </Box>

                                        <Box className="button-container" sx={{mt: 5}}>
                                            <Button
                                                variant="contained"
                                                type="button"
                                                onClick={() => setOpenAgregarRepuesto(false)}
                                                id="cancel-button"
                                            >
                                                Cerrar
                                                <Backspace sx={{marginLeft: '5px', color: "white", height: "18px"}}/>
                                            </Button>

                                            <Button
                                                variant="contained"
                                                type="submit"
                                                id="submit-button">
                                                Guardar
                                                <SaveAs sx={{marginLeft: '5px', color: "white", height: "18px"}}/>
                                            </Button>
                                        </Box>
                                    </Form>
                                )
                            }
                        </Formik>
                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={openPayment} maxWidth={'md'} fullWidth>
                <DialogTitle>
                    <Typography variant={'h5'}>APLICAR PAGO</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{width: '100%', p: 4}}>
                        <Formik initialValues={{
                            tpaCodigo: 0,
                            total: 0,
                            referencia: '',
                            document: '',
                            autorizacion: ''
                        }}
                                validationSchema={paymentValidations}
                                onSubmit={handleSumbitPayment}
                        >
                            {
                                props => (
                                    <Form>
                                        <Box>
                                            <Grid container spacing={2}>
                                                <CustomSelect label={'Tipo Pago*'}
                                                              name={'tpaCodigo'}
                                                              onChange={handleChangePaymentType}
                                                >
                                                    {
                                                        contentTipoPagos.map(item => (
                                                            <MenuItem key={item.tpaCodigo} value={item.tpaCodigo}>
                                                                {item.tpaNombre}
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </CustomSelect>
                                                <CustomInputText label={'Total a Pagar*'} name={'total'}/>
                                                {
                                                    props.values.tpaCodigo === 1 && (
                                                        <CustomInputText label={'Referencia'} name={'referencia'}/>
                                                    )
                                                }
                                                {
                                                    props.values.tpaCodigo === 2 && (
                                                        <CustomInputText label={'Documento'} name={'document'} xs={12}/>
                                                    )
                                                }
                                                {
                                                    (props.values.tpaCodigo === 4 || props.values.tpaCodigo === 1) && (
                                                        <CustomInputText label={'Autorizacion'} name={'autorizacion'}
                                                                         xs={props.values.tpaCodigo === 4 ? 12 : 6}/>
                                                    )
                                                }
                                            </Grid>

                                        </Box>
                                        <Box sx={{mt: 5}}>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between"
                                                 alignItems="center">
                                                <Typography variant="h5">Total de Servicios:</Typography>
                                                <Typography
                                                    variant="h5">{Utilities.formatCurrency(paymentDescribe?.servicios ?? 0)}</Typography>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between"
                                                 alignItems="center">
                                                <Typography variant="h5">Total de Repuestos:</Typography>
                                                <Typography
                                                    variant="h5">{Utilities.formatCurrency(paymentDescribe?.repuestos ?? 0)}</Typography>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between"
                                                 alignItems="center">
                                                <Typography variant="h5">Total de Productos:</Typography>
                                                <Typography
                                                    variant="h5">{Utilities.formatCurrency(paymentDescribe?.productos ?? 0)}</Typography>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between"
                                                 alignItems="center">
                                                <Typography variant="h5">Pagos Aplicados:</Typography>
                                                <Typography
                                                    variant="h5">{Utilities.formatCurrency(paymentDescribe?.pagosAplicados ?? 0)}</Typography>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between"
                                                 alignItems="center">
                                                <Typography variant="h5">Subtotal:</Typography>
                                                <Typography
                                                    variant="h5">{Utilities.formatCurrency(paymentDescribe?.subtotal ?? 0)}</Typography>
                                            </Box>
                                            <Box display="flex" flexDirection="row" justifyContent="space-between"
                                                 alignItems="center">
                                                <Typography variant="h5">Total:</Typography>
                                                <Typography
                                                    variant="h5">{Utilities.formatCurrency(paymentDescribe?.total ?? 0)}</Typography>
                                            </Box>
                                        </Box>
                                        <Box className={'button-container'} sx={{mt: 5}}>
                                            <Button
                                                variant={'contained'}
                                                type={'button'}
                                                onClick={() => closeApplyPayment()}
                                                id="cancel-button"
                                            >
                                                Cerrar
                                                <Backspace sx={{marginLeft: '5px', color: "white", height: "18px"}}/>
                                            </Button>
                                            <Button
                                                variant="contained"
                                                type="submit"
                                                id="submit-button">
                                                Guardar
                                                <SaveAs sx={{marginLeft: '5px', color: "white", height: "18px"}}/>
                                            </Button>
                                        </Box>
                                    </Form>
                                )
                            }
                        </Formik>

                    </Box>
                </DialogContent>
            </Dialog>

            <Dialog open={openHistorialPagos} maxWidth={'md'} fullWidth>
                <DialogTitle>
                    <Typography variant={'h5'}>Historial de Pagos</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tipo Pago</TableCell>
                                    <TableCell>Fecha de Pago</TableCell>
                                    <TableCell>Autorizacion</TableCell>
                                    <TableCell>Referencia</TableCell>
                                    <TableCell>Documento</TableCell>
                                    <TableCell>Total Pagado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paymentHistory?.map((row) => (
                                    <TableRow key={row.pagCodigo}>
                                        <TableCell component="th"
                                                   scope={'row'}> {row.tipoPago!.tpaNombre ?? ''} </TableCell>
                                        <TableCell component="th"
                                                   scope={'row'}> {moment(row.pagFecha!).format('DD/MM/YYYY HH:mm:ss')} </TableCell>
                                        <TableCell component="th"
                                                   scope={'row'}> {row.pagNumeroAutorizacion!} </TableCell>
                                        <TableCell component="th" scope={'row'}> {row.pagReferencia!} </TableCell>
                                        <TableCell component="th" scope={'row'}> {row.pagDocumentoPago!} </TableCell>
                                        <TableCell component="th"
                                                   scope={'row'}> {Utilities.formatCurrency(row.pagTotal!)} </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                    <Box className={'button-container'} sx={{mt: 2}}>
                        <Button
                            variant={'contained'}
                            type={'button'}
                            onClick={() => setOpenHistorialPagos(false)}
                            id="cancel-button"
                        >
                            Cerrar
                            <Backspace sx={{marginLeft: '5px', color: "white", height: "18px"}}/>
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};
