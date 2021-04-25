import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import {
    Ranking,
} from "../../transport/comp";

const columns = [
  { id: 'name', label: 'Name', minWidth: 120 },
  { id: 'elo', label: 'ELO Rating', minWidth: 40 },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: '800px',
  },
  container: {
    maxHeight: 440,
  },
});

interface DisplayProps {
    leaderboard: Ranking[] | null;
}

const LeaderboardTable: FC<DisplayProps> = (props) => {

    const {leaderboard} = props;

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        (null === leaderboard)
        ? null :
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboard.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                        <TableCell key={column.id}>
                                            {value}
                                        </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={leaderboard.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
  );
}

export default LeaderboardTable;