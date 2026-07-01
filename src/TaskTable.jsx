import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Card, CardContent, Stack, Box, Chip,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function TaskTable(props) {
  if (props.tasks.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 3 }}>     No tasks added yet. </Typography>
    );
  }
  if (props.isMobile) {
  return (
    <Stack spacing={2} sx={{ mt: 3 }}>
      {props.tasks.map(function (task, index) {
        return (
          <Card key={index}>
            <CardContent>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center",}} >
                <Typography variant="h6"> {task.name} </Typography>
                <IconButton color="primary" onClick={function () { props.openEdit(index); }}>
                  <EditIcon />
                </IconButton>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} > {task.description} </Typography>
              <Typography sx={{ mt: 1 }}>
                <b>Date:</b> {task.date}
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, }} >
                <Chip
                  label={task.priority}
                  color={ task.priority === "High" ? "error" : task.priority === "Medium" ? "warning" : "success" }
               />

                <Stack direction="row" spacing={1}>
                  <IconButton color="error" onClick={function () { props.deleteTask(index); }} >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="success" disabled={index === 0} onClick={function () { props.moveUp(index); }} > <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton color="secondary" disabled={index === props.tasks.length - 1} onClick={function () { props.moveDown(index); }} >
                    <ArrowDownwardIcon />
                  </IconButton>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
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
                  <IconButton color="primary" onClick={function () { props.openEdit(index); }} >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={function () { props.deleteTask(index); }} >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton color="success" disabled={index === 0} onClick={function () { props.moveUp(index); }} >
                    <ArrowUpwardIcon />
                  </IconButton>
                  <IconButton color="secondary" disabled={index === props.tasks.length - 1} onClick={function () { props.moveDown(index); }} >
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