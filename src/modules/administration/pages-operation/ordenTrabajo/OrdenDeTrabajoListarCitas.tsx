import {TitleComponent} from '../../components';
import {QueryContentLayout} from '../../../../layout';
import {useCitaListStore, useCitaStore, useTallerListStore} from '../../../../hooks';
import {useEffect, useState} from 'react';
import moment from 'moment';
import {Dialog, DialogContent, DialogTitle, MenuItem, Typography} from '@mui/material';
import {FormLayout} from '../../../../layout/FormLayout.tsx';
import {CustomDatePicker, CustomInputText, CustomSelect} from '../../../../components/form';
import {OrdenTrabajoCreate, ordenTrabajoStore} from '../../../../hooks/ordenTrabajo/ordenTrabajoStore.ts';
import {crearOrdenValidations} from './validations/formulariosValidations.ts';

const tableHeaders = ['Codigo', 'Fecha Cita', 'Descripción', 'Duración Estimada (min)', 'Atendida', 'Vehiculo'];


export const OrdenDeTrabajoListarCitas = () => {

    const {content, findAll} = useCitaListStore(false);
    const {findById, citaValue} = useCitaStore();
    const {content: talleresContent, findAll: findAllTalleres } = useTallerListStore();
    const {save} = ordenTrabajoStore();
    const [parsedContent, setParsedContent] = useState<any[]>([]);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        findAll('', true);
        findAllTalleres();
    }, []);

    useEffect(() => {
        if (!content || content.length === 0) {
            setParsedContent([]);
            return;
        }

        setParsedContent(
            content.map((item) => ({
                ...item,
                placa: item.vehiculo ? item.vehiculo.vehPlaca : 'No disponible',
                fechaCita: moment(item.ctaFechaHora).format('DD/MM/YYYY'),
                estado: item.ctaConfirmacion
            }))
        );
    }, [content]);

    const handleUpdate = async (code) => {
        setOpenDialog(true);
        await findById(code);
    }

    const handleOnSubmit = async (formikValues) => {
        setOpenDialog(false);
        const body: OrdenTrabajoCreate = {
            ...formikValues,
            ortFechaEntrega: formikValues.ortFechaEntrega,
            ctaCodigo: citaValue.ctaCodigo,
        }
        await save(body);
        await findAll(undefined, true);
    }

    return (
        <>
            <TitleComponent title={'Creacion de Ordenes de Trabajo'}/>

            <QueryContentLayout
                revertStatus={true}
                contentClassName={'query-content-without-searchbar'}
                tableHeaders={tableHeaders}
                tableBody={parsedContent}
                properties={['ctaCodigo', 'fechaCita', 'ctaDescripcion', 'ctaDuracionEstimadaMin', 'estado', 'placa']}
                useAdd={false}
                onUpdate={handleUpdate}
                useDelete={false}
                idField={'ctaCodigo'}
            />

            <Dialog open={openDialog} maxWidth={'lg'} fullWidth>
                <DialogTitle id="alert-dialog-title" >
                    <Typography variant={'h5'}>CREAR</Typography>
                </DialogTitle>
                <DialogContent>
                    <FormLayout
                        useHeigth={false}
                        initialValues={{
                            detalleEstadoPrevio: '',
                            diasGarantia: 1,
                            tallCodigo: 0,
                            ortFechaEntrega: moment().add('days', 1)
                        }}
                        validationSchema={crearOrdenValidations}
                        onSubmit={handleOnSubmit}
                        onCancel={() => setOpenDialog(false)}
                    >
                        <CustomInputText xs={1.5} label={'Vehiculo'} name={'vehiculo'} value={citaValue.vehiculo?.vehPlaca} disabled/>
                        <CustomInputText xs={3} label={'Cliente'} name={'cliente'} value={`${citaValue.vehiculo?.cliente?.cliNombres} ${citaValue.vehiculo?.cliente?.cliApellidos}`} disabled/>
                        <CustomInputText xs={1.5} label={'Dias de garantia*'} name={'diasGarantia'} />
                        <CustomSelect xs={3} label={'Taller*'} name={'tallCodigo'}>
                            {talleresContent.map(t => (
                                <MenuItem key={t.tllCodigo} value={t.tllCodigo}>
                                    {t.tllNombre}
                                </MenuItem>
                            ))}
                        </CustomSelect>
                        <CustomDatePicker
                            xs={3}
                            label={'Fecha estimada de entrega*'}
                            name={'ortFechaEntrega'}
                            minDate={moment().add('days', 1)}
                        />
                        <CustomInputText label={'Detalle de estado previo*'} name={'detalleEstadoPrevio'} xs={12} />
                    </FormLayout>
                </DialogContent>
            </Dialog>
        </>
    );
};
