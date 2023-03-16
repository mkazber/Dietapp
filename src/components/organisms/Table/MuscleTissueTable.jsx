import React, { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import parse from 'html-react-parser';
import { Title } from '../../atoms/Title/Title';
import { UsersContext } from '../../../providers/UsersProvider';

const BasicTable = ({ valueTable }) => {
  const { currentUser } = useContext(UsersContext);

  const getMuscleTissueState = muscleTissue => {
    if (currentUser.gender === 'male') {
      return getMuscleTissueStateForMale(muscleTissue);
    } else {
      return getMuscleTissueStateForFemale(muscleTissue);
    }
  };

  const getMuscleTissueStateForMale = muscleTissue => {
    if (muscleTissue < 65) {
      return '<span style="color: red;">Alarm</span>';
    } else if (muscleTissue >= 65 && muscleTissue < 70) {
      return '<span style="color: orange;">Niski</span>';
    } else if (muscleTissue >= 70 && muscleTissue < 80) {
      return '<span style="color: blue;">Optymalny</span>';
    } else if (muscleTissue >= 80) {
      return '<span style="color: green;">Wysoki</span>';
    } else {
      return '<span style="color: black;">Poza zakresem</span>';
    }
  };

  const getMuscleTissueStateForFemale = muscleTissue => {
    if (muscleTissue < 60) {
      return '<span style="color: red;">Alarm</span>';
    } else if (muscleTissue >= 60 && muscleTissue < 65) {
      return '<span style="color: orange;">Niski</span>';
    } else if (muscleTissue >= 65 && muscleTissue < 75) {
      return '<span style="color: blue;">Optymalny</span>';
    } else if (muscleTissue >= 75) {
      return '<span style="color: green;">Wysoki</span>';
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
              <TableCell align="left">Płeć</TableCell>
              <TableCell align="left">Ilość tkanki</TableCell>
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
                  <TableCell align="left">{currentUser.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}</TableCell>
                  <TableCell align="left">{valueTable.muscleTissue}%</TableCell>
                  <TableCell align="left">{valueTable.date}</TableCell>
                  <TableCell align="left">{parse(getMuscleTissueState(valueTable.muscleTissue))}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default BasicTable;
