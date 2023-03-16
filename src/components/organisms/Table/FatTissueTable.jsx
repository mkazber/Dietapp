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

  const getFatTissueState = fatTissue => {
    if (currentUser.gender === 'male') {
      return getFatTissueStateForMale(fatTissue);
    } else {
      return getFatTissueStateForFemale(fatTissue);
    }
  };

  const getFatTissueStateForMale = fatTissue => {
    const age = new Date().getFullYear() - currentUser.year;

    if (age >= 20 && age <= 24) {
      if (fatTissue < 10.8) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 10.8 && fatTissue < 14.9) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 14.9 && fatTissue < 19) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 19) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 25 && age <= 29) {
      if (fatTissue < 12.8) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 12.8 && fatTissue < 16.5) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 16.5 && fatTissue < 20.3) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 20.3) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 30 && age <= 34) {
      if (fatTissue < 14.5) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 14.5 && fatTissue < 18) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 18 && fatTissue < 21.5) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 21.5) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 35 && age <= 39) {
      if (fatTissue < 16.1) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 16.1 && fatTissue < 19.3) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 19.3 && fatTissue < 22.6) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 22.6) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 40 && age <= 44) {
      if (fatTissue < 17.5) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 17.5 && fatTissue < 20.5) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 20.5 && fatTissue < 23.6) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 23.6) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 45 && age <= 49) {
      if (fatTissue < 18.6) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 18.6 && fatTissue < 21.5) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 21.5 && fatTissue < 24.5) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 24.5) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 50 && age <= 54) {
      if (fatTissue < 19.2) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 19.2 && fatTissue < 22.1) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 22.1 && fatTissue < 25.1) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 25.1) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 55 && age <= 59) {
      if (fatTissue < 19.8) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 19.8 && fatTissue < 22.7) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 22.7 && fatTissue < 25.6) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 25.6) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 60) {
      if (fatTissue < 20.2) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 20.2 && fatTissue < 23.3) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 23.3 && fatTissue < 26.2) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 26.2) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else {
      return '<span style="color: black;">Poza zakresem</span>';
    }
  };

  const getFatTissueStateForFemale = fatTissue => {
    const age = new Date().getFullYear() - currentUser.year;

    if (age >= 20 && age <= 24) {
      if (fatTissue < 18.2) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 18.2 && fatTissue < 22.1) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 22.1 && fatTissue < 25) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 25) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 25 && age <= 29) {
      if (fatTissue < 18.9) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 18.9 && fatTissue < 22.4) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 22.4 && fatTissue < 25.4) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 25.4) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 30 && age <= 34) {
      if (fatTissue < 18.7) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 18.7 && fatTissue < 22.7) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 22.7 && fatTissue < 26.4) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 26.4) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 35 && age <= 39) {
      if (fatTissue < 21.1) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 21.1 && fatTissue < 24) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 24 && fatTissue < 27.7) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 27.7) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 40 && age <= 44) {
      if (fatTissue < 22.6) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 22.6 && fatTissue < 25.6) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 25.6 && fatTissue < 29.3) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 29.3) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 45 && age <= 49) {
      if (fatTissue < 24.3) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 24.3 && fatTissue < 27.3) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 27.3 && fatTissue < 30.9) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 30.9) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 50 && age <= 54) {
      if (fatTissue < 25.2) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 25.2 && fatTissue < 28.2) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 28.2 && fatTissue < 31.8) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 31.8) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 55 && age <= 59) {
      if (fatTissue < 26.6) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 26.6 && fatTissue < 29.7) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 29.7 && fatTissue < 33.1) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 33.1) {
        return '<span style="color: red;">Alarm</span>';
      } else {
        return '<span style="color: black;">Poza zakresem</span>';
      }
    } else if (age >= 60) {
      if (fatTissue < 27.6) {
        return '<span style="color: green;">Niski</span>';
      } else if (fatTissue >= 27.6 && fatTissue < 30.7) {
        return '<span style="color: blue;">W normie</span>';
      } else if (fatTissue >= 30.7 && fatTissue < 34) {
        return '<span style="color: orange;">Nadmiar</span>';
      } else if (fatTissue >= 34) {
        return '<span style="color: red;">Alarm</span>';
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
              <TableCell align="left">Wiek</TableCell>
              <TableCell align="left">Płeć</TableCell>
              <TableCell align="left">Data</TableCell>
              <TableCell align="left">Ilość tkanki</TableCell>
              <TableCell align="left">Stan</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: 'white' }}>
            {valueTable
              .slice(0)
              .reverse()
              .map(valueTable => (
                <TableRow key={valueTable.rndId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{new Date().getFullYear() - currentUser.year}</TableCell>
                  <TableCell align="left">{currentUser.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}</TableCell>
                  <TableCell align="left">{valueTable.date}</TableCell>
                  <TableCell align="left">{valueTable.fatTissue}%</TableCell>
                  <TableCell align="left">{parse(getFatTissueState(valueTable.fatTissue))}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default BasicTable;
