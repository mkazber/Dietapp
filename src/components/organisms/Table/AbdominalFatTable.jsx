import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import parse from 'html-react-parser';
import { Title } from '../../atoms/Title/Title';

const BasicTable = ({ valueTable }) => {
  const getAbdominalFatState = abdominalFat => {
    if (abdominalFat >= 15) {
      return '<span style="color: red;">Wysoki</span>';
    } else if (abdominalFat < 15 && abdominalFat >= 10) {
      return '<span style="color: orange;">Nadmiar</span>';
    } else if (abdominalFat >= 1 && abdominalFat <= 9) {
      return '<span style="color: green;">Optymalny</span>';
    } else {
      return '<span style="color: black;">Poza zakresem</span>';
    }
  };

  return (
    <div className="Table">
      <Title as="h2">Ostatnie wyniki</Title>
      <TableContainer style={{ boxShadow: '0rem .8125rem 1.25rem 0rem #80808029' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Poziom tłuszczu brzusznego</TableCell>
              <TableCell align="left">Data</TableCell>
              <TableCell align="left">Stan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: 'white' }}>
            {valueTable
              .slice(0)
              .reverse()
              .map(valueTable => (
                <TableRow key={valueTable.rndId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{valueTable.abdominalFat}</TableCell>
                  <TableCell align="left">{valueTable.date}</TableCell>
                  <TableCell align="left">{parse(getAbdominalFatState(valueTable.abdominalFat))}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default BasicTable;
