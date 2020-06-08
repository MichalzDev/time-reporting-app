import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function SimpleTable({reports, redirect}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Projekt</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Godziny</TableCell>
            <TableCell align="right">Akcja</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.map((row) => (
            <TableRow key={row.report_who}>
              <TableCell component="th" scope="row">
                {row.report_who}
              </TableCell>
              <TableCell align="right">{row.report_from.slice(8,10) + '-' + row.report_from.slice(0,4)}</TableCell>
              <TableCell align="right">{row.report_hours}</TableCell>
              <TableCell align="right"><button onClick={() => redirect('/reports/edit/' + row._id, row._id)}>EDYTUJ</button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}