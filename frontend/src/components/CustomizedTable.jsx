import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2e2e2e'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#686868',
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:hover': {
    backgroundColor: theme.palette.action.selected, // or use a custom color like "#f5f5f5"
    cursor: 'pointer', // optional: change cursor to pointer
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function CustomizedTable({ cols, rows}) {
  return (
    <TableContainer sx={{ overflow: 'auto', width: '100%', height: '100%'}}>
      <Table sx={{ width: '100%'}} aria-label="customized table">
        <TableHead>
        {cols}
        </TableHead>
        <TableBody>
        {rows}
        </TableBody>
      </Table>
    </TableContainer>
  );
}