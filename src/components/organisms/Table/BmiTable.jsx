import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import parse from 'html-react-parser';
import { Title } from '../../atoms/Title/Title';

const BasicTable = ({ valueTable }) => {
  const getBmiState = bmi => {
    if (bmi < 18.5) return '<span style="color: blue;">Niskie</span>';
    else if (bmi >= 18.5 && bmi < 25) return '<span style="color: green;">W normie</span>';
    else if (bmi >= 25 && bmi < 28) return '<span style="color: yellow;">Zwiększone</span>';
    else if (bmi >= 28 && bmi < 32) return '<span style="color: orange;">Wysokie</span>';
    else if (bmi >= 32) return '<span style="color: red;">Bardzo wysokie</span>';
    else return '<span style="color: black;">Poza zakresem</span>';
  };

  return (
    <div className="Table">
      <Title as="h2">Ostatnie wyniki</Title>
      <TableContainer style={{ boxShadow: '0px 13px 20px 0px #80808029' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Wzrost</TableCell>
              <TableCell align="left">Waga</TableCell>
              <TableCell align="left">Data</TableCell>
              <TableCell align="left">BMI</TableCell>
              <TableCell align="left">Stan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: 'white' }}>
            {valueTable
              .slice(0)
              .reverse()
              .map(valueTable => (
                <TableRow key={valueTable.rndId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{valueTable.height}</TableCell>
                  <TableCell align="left">{valueTable.weight}</TableCell>
                  <TableCell align="left">{valueTable.date}</TableCell>
                  <TableCell align="left">{valueTable.bmi}</TableCell>
                  <TableCell align="left">{parse(getBmiState(valueTable.bmi))}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default BasicTable;
