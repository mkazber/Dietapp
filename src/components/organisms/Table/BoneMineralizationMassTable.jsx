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

  const getBoneMineralizationMassState = (boneMineralizationMass, weight) => {
    if (currentUser.gender === 'male') {
      return getBoneMineralizationMassStateForMale(boneMineralizationMass, weight);
    } else {
      return getBoneMineralizationMassStateForFemale(boneMineralizationMass, weight);
    }
  };

  const getBoneMineralizationMassStateForMale = (boneMineralizationMass, weight) => {
    if (weight < 65) {
      if (boneMineralizationMass < 2.65) {
        return '<span style="color: green;">Prawidłowy</span>';
      } else if (boneMineralizationMass >= 2.65) {
        return '<span style="color: red;">Nieprawidłowy</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (weight >= 65 && weight < 95) {
      if (boneMineralizationMass < 3.29) {
        return '<span style="color: green;">Prawidłowy</span>';
      } else if (boneMineralizationMass >= 3.29) {
        return '<span style="color: red;">Nieprawidłowy</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (weight > 95) {
      if (boneMineralizationMass < 3.69) {
        return '<span style="color: green;">Prawidłowy</span>';
      } else if (boneMineralizationMass >= 3.69) {
        return '<span style="color: red;">Nieprawidłowy</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else {
      return '<span style="color: black;">Poza zakresem</span>';
    }
  };

  const getBoneMineralizationMassStateForFemale = (boneMineralizationMass, weight) => {
    if (weight < 50) {
      if (boneMineralizationMass < 1.95) {
        return '<span style="color: green;">Prawidłowy</span>';
      } else if (boneMineralizationMass >= 1.95) {
        return '<span style="color: red;">Nieprawidłowy</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (weight >= 50 && weight < 75) {
      if (boneMineralizationMass < 2.4) {
        return '<span style="color: green;">Prawidłowy</span>';
      } else if (boneMineralizationMass >= 2.4) {
        return '<span style="color: red;">Nieprawidłowy</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (weight > 75) {
      if (boneMineralizationMass < 2.95) {
        return '<span style="color: green;">Prawidłowy</span>';
      } else if (boneMineralizationMass >= 2.95) {
        return '<span style="color: red;">Nieprawidłowy</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
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
              <TableCell align="left">Poziom mineralizacji kostnej</TableCell>
              <TableCell align="left">Waga</TableCell>
              <TableCell align="left">Data</TableCell>
              <TableCell align="left">Stan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: 'white' }}>
            {valueTable
              .slice(0)
              .reverse()
              .map(value => (
                <TableRow key={valueTable.rndId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{currentUser.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}</TableCell>
                  <TableCell align="left">{value.boneMineralizationMass}kg</TableCell>
                  <TableCell align="left">{value.weight}kg</TableCell>
                  <TableCell align="left">{value.date}</TableCell>
                  <TableCell align="left">
                    {parse(getBoneMineralizationMassState(value.boneMineralizationMass, value.weight))}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default BasicTable;
