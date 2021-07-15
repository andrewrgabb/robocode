import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

import { Ranking } from "../../transport/comp";
import moment from "moment";

interface Row {
  displayName: string;
  elo: string;
  submissionDateNo: string;
  name: string;
}

const columns = [
  { id: "rank", label: "Rank", minWidth: 40 },
  { id: "displayName", label: "Name", minWidth: 40 },
  { id: "elo", label: "ELO Rating", minWidth: 40 },
  { id: "submissionDateTime", label: "Date / Time Submitted", minWidth: 40 },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: "800px",
  },
  container: {
    maxHeight: 600,
  },
  minispan:{
    fontSize: "0.8em",
    color: "grey"
  }
});

interface DisplayProps {
  leaderboard: Ranking[] | null;
}

const rowsPerPage: number = 10;

const LeaderboardTable: FC<DisplayProps> = (props) => {
  const { leaderboard } = props;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  return null === leaderboard ? null : (
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
            {leaderboard
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: Row, index: number) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {
                      <TableCell key={`${index}_0`} align={"left"}>
                        {page * rowsPerPage + (index + 1)}
                      </TableCell>
                    }
                    {
                      <TableCell key={`${index}_1`} align={"left"}>
                        <span>{row.displayName}</span>
                        {row.name != row.displayName ? <span className={classes.minispan}>{row.name}</span> : ""}
                      </TableCell>
                    }
                    {
                      <TableCell key={`${index}_2`} align={"left"}>
                        {row.elo}
                      </TableCell>
                    }
                    {
                      <TableCell key={`${index}_3`} align={"left"}>
                        {"-" === row.submissionDateNo
                          ? "-"
                          : moment(row.submissionDateNo).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                      </TableCell>
                    }
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={leaderboard.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
      />
    </Paper>
  );
};

export default LeaderboardTable;
