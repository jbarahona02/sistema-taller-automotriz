import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setOpenDialog} from '../../../../store/modules/administration/report/reportSlice.ts';
import {useReportsStore} from '../../../../hooks';

export const DialogReport = () => {

    const {url, title} = useParams();
    const { handleDownloadReport } = useReportsStore();
    const report = useSelector(state => state.reportSlice);
    const dispatch = useDispatch();

    const handleCloseDialog = () => {
        dispatch(setOpenDialog(false));
    }

    const handleDownload = async () => {
        await handleDownloadReport(url, title);
        dispatch(setOpenDialog(false));
    }

    return (
        <Dialog
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            open={report.openDialog}
        >
            <DialogTitle id="alert-dialog-title">
                {`Reporte ${title}`}
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cerrar</Button>
                <Button onClick={handleDownload} autoFocus> Descargar </Button>
            </DialogActions>
        </Dialog>
    );
};
