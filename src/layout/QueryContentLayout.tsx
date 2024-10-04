import {
    Box,
    Button,
    Grid,
    IconButton,
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {
    Add,
    DeleteForeverOutlined,
    DriveFileRenameOutlineOutlined,
    EditNote,
    History,
    Payment,
    RemoveRedEye
} from "@mui/icons-material";

interface Props<T> {
    tableHeaders: string[];
    tableBody: any[];
    properties: string[];
    onAdd?: () => void;
    onUpdate?: (code: any) => void;
    onDelete?: (code: any) => void;
    onView?: (body: T) => void;
    addServiceAction?: (body: T) => void;
    idField: string;
    useAdd?: boolean;
    useUpdate?: boolean;
    useDelete?: boolean;
    contentClassName?: string;
    revertStatus?: boolean;
    detail?: boolean;
    disableService?: (body: T) => boolean;
    disableUpdate?: (body: T) => boolean;
    updateTooltip?: string;
    addService?: boolean;
    payment?: boolean;
    disablePayment?: (body: T) => boolean;
    applyPayment?: (body: T) => void;
    showPaymentHistory?: boolean;
    disabledPaymentHistory?: (body: T) => boolean;
    paymentHistory?: (body?: T) => void;
}

const StyledTableCell = styled(TableCell)((_) => ({
    [`&.${tableCellClasses.root}`]: {
        fontWeight: 'bold',
        fontSize: '1rem'
    },
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#fff',
        color: '#001B40'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const QueryContentLayout = <T extends Object>({
                                                         useAdd = true,
                                                         useUpdate = true,
                                                         useDelete = true,
                                                         revertStatus = false,
                                                         detail = false,
                                                         contentClassName = 'query-content',
                                                         onAdd,
                                                         onDelete,
                                                         onUpdate,
                                                         onView,
                                                         idField,
                                                         tableHeaders,
                                                         addServiceAction,
                                                         tableBody,
                                                         properties,
                                                         updateTooltip = '',
                                                         disableService,
                                                         disableUpdate,
                                                         addService,
                                                         payment,
                                                         disablePayment,
                                                         applyPayment,
                                                         showPaymentHistory,
                                                         paymentHistory,
                                                         disabledPaymentHistory
                                                     }: Props<T>) => {
    return (
        <>
            <Grid
                container
                spacing={0}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 5,
                    p: 3,
                    mt: 2
                }}
                className={'grid-main-container'}
                style={{paddingTop: 0, borderRadius: 15}}
            >
                <Box sx={{width: '100%', paddingTop: 0}} className={contentClassName}>
                    <TableContainer component={Paper} className={'table-content-height table'}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {tableHeaders.map((tableHeader) => (
                                        <StyledTableCell align={'center'}
                                                         key={tableHeader}>{tableHeader}</StyledTableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableBody.map((body, i) => (
                                    <TableRow key={i}>
                                        {properties.map((property) => (
                                            <TableCell key={property} align={'center'} className="cells">
                                                {property === 'estado' ? (
                                                    <div className="status-container">
                                                        <div
                                                            className={!revertStatus && body[property] ? 'green-container' : 'red-container'}></div>
                                                    </div>
                                                ) : (
                                                    body[property]
                                                )}
                                            </TableCell>
                                        ))}

                                        <TableCell key="actions" align={'center'} className="cells"
                                                   hidden={!useDelete && !useUpdate}>
                                            {
                                                showPaymentHistory &&
                                                <Tooltip title={'Historial de Pagos'}>
                                                    <IconButton
                                                        disabled={disabledPaymentHistory && disabledPaymentHistory(body)}
                                                        onClick={() => paymentHistory!(body)}
                                                        sx={{color: 'bluegreen'}}
                                                    >
                                                        <History/>
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            {
                                                payment &&
                                                <Tooltip title={'Realizar pago'}>
                                                    <IconButton
                                                        onClick={() => applyPayment!(body)}
                                                        disabled={disablePayment!(body)}
                                                        sx={{color: 'limegreen'}}
                                                    >
                                                        <Payment/>
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            {
                                                addService &&
                                                <Tooltip title={'Agregar un servicio'}>
                                                    <IconButton
                                                        onClick={() => addServiceAction!(body)}
                                                        disabled={disableService!(body)}
                                                        sx={{color: 'black'}}
                                                    >
                                                        <EditNote/>
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            {
                                                useUpdate &&
                                                <Tooltip title={updateTooltip}>
                                                    <IconButton
                                                        disabled={disableUpdate ? disableUpdate(body) : false}
                                                        onClick={() => onUpdate!(body[idField])}
                                                        sx={{color: 'black'}}
                                                    >
                                                        <DriveFileRenameOutlineOutlined/>
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            {
                                                useDelete &&
                                                <IconButton
                                                    onClick={() => onDelete!(body[idField])}
                                                    sx={{color: 'red'}}
                                                >
                                                    <DeleteForeverOutlined/>
                                                </IconButton>
                                            }
                                            {
                                                detail &&
                                                <IconButton
                                                    sx={{color: 'black'}}
                                                    onClick={() => onView!(body)}
                                                >
                                                    <RemoveRedEye/>
                                                </IconButton>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                {

                    useAdd &&
                    <Button className={'button-add'} onClick={onAdd}>
                        <Add/>
                    </Button>
                }

            </Grid>
        </>
    );
};
