import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function TaskTable(props) {
  if (props.tasks.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 3 }}>
        No tasks added yet.
      </Typography>
    );
  }
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Task</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Date</b></TableCell>
            <TableCell><b>Priority</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tasks.map(function (task, index) {
            return (
              <TableRow key={index}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.date}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={function () { props.openEdit(index);}}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={function () { props.deleteTask(index);}}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="success" disabled={index === 0} onClick={function () { props.moveUp(index); }}>
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton color="secondary" disabled={index === props.tasks.length - 1} onClick={function () { props.moveDown(index); }}>
                    <ArrowDownwardIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default TaskTable;