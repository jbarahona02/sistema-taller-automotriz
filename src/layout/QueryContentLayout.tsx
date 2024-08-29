import {
    Box,
    Button,
    Grid,
    IconButton, Pagination,
    Paper, styled,
    Table,
    TableBody,
    TableCell, tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { RemoveRedEyeOutlined, DriveFileRenameOutlineOutlined, DeleteForeverOutlined } from "@mui/icons-material";

interface Props {
    tableHeaders: string[];
    tableBody: any[];
    properties: string[];
    onAdd: () => void;
    onUpdate: (code: number) => void;
    onDelete: (code: number) => void;
    idField: string;
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

export const QueryContentLayout = ({ onAdd, onDelete, onUpdate, idField, tableHeaders, tableBody, properties }: Props) => {

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
                style={{ paddingTop: 0, borderRadius: 15 }}
            >
                <Box sx={{ width: '100%', paddingTop: 0 }} className={'query-content'}>
                    <TableContainer component={Paper} className={'table-content-height table'}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {
                                        tableHeaders.map((tableHeader) => (
                                            <StyledTableCell align={'center'} key={tableHeader}>{tableHeader}</StyledTableCell>
                                        ))
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    tableBody.map((body, i) => (
                                        <TableRow key={i}>
                                            {
                                                properties.map((propertie) => (

                                                    <TableCell key={propertie} align={'center'} className="cells">{body[propertie]}</TableCell>
                                                ))
                                            }

                                            {

                                                body['estado'] && <TableCell key="status" align={'center'}>
                                                    <div className="status-container">
                                                        <div className={body['estado'] ? 'green-container' : 'red-container'}>

                                                        </div>
                                                    </div>
                                                </TableCell>
                                            }

                                            <TableCell key="actions" align={'center'} className="cells">
                                                <IconButton
                                                    onClick={() => onUpdate(body[idField])}
                                                    style={{ color: 'black' }}
                                                >
                                                    <DriveFileRenameOutlineOutlined />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => onDelete(body[idField])}
                                                    style={{ color: 'red' }}
                                                >
                                                    <DeleteForeverOutlined />
                                                </IconButton>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Button className={'button-add'} onClick={onAdd}>
                    <Add />
                </Button>
            </Grid>
        </>
    )
}
