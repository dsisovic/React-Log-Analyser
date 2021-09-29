import Table from '@mui/material/Table';
import tableStyles from './Table.module.scss';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import { ITableProps } from './ts/models/table-props.model';

const TableComponent = (props: ITableProps) => {
    return (
        <>
            <TableContainer>
                <Table sx={{ minWidth: props.minWidth }} aria-label="table">
                    <TableHead>
                        <TableRow>
                            {props.headers.map(header => <TableCell key={header.value} align={header.alignment}>{header.value}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.rows.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {row.data.map((dataItem, dataIndex) =>
                                    <TableCell key={dataIndex} align={dataItem.alignment}>
                                        <div className={dataItem?.showImage ? tableStyles['cell__image'] : ''} >
                                            {dataItem.showImage &&
                                                <img src={require(`../../images/flags/${dataItem.imageValue.toLowerCase()}.png`).default}
                                                    alt={dataItem.imageValue} />}

                                            {dataItem[`row-${dataIndex}`]}
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TableComponent;
