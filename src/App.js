import { useState, useEffect } from "react";
import { Container, Typography, Button, Fab, useTheme, useMediaQuery,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import TaskDialog from "./TaskDialog";
import TaskTable from "./TaskTable";

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editTask, setEditTask] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(function () {
    let savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
    setIsLoaded(true);
   }, []);
  useEffect(function () {
    if (!isLoaded) {
      return;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isLoaded]);
  function showMessage(message) {
    Swal.fire({ toast: true, position: "top-end", icon: "success", title: message, showConfirmButton: false, timer: 1800, });
  }
  function addTask(task) {
    let newTasks = [...tasks];
    newTasks.push(task);
    setTasks(newTasks);
    showMessage("Task Added Successfully");
  }
  function deleteTask(index) {
    Swal.fire({ title: "Are you sure?", text: "You won't be able to undo this.", icon: "warning", showCancelButton: true, confirmButtonText: "Delete", cancelButtonText: "Cancel", }).then(function (result) {
      if (result.isConfirmed) {
        let newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
        showMessage("Task Deleted Successfully");
      }
 });
  }
  function openEdit(index) {
    setEditIndex(index);
    setEditTask(tasks[index]);
    setOpen(true);
  }
  function updateTask(task) {
    let newTasks = [...tasks];
    newTasks[editIndex] = task;
    setTasks(newTasks);
    setEditIndex(-1);
    setEditTask(null);
    showMessage("Task Updated Successfully");
  }
  function moveUp(index) {
    if (index === 0) {
      return;
    }
    let newTasks = [...tasks];
    let temp = newTasks[index];
    newTasks[index] = newTasks[index - 1];
    newTasks[index - 1] = temp;
    setTasks(newTasks);
  }
  function moveDown(index) {
    if (index === tasks.length - 1) {
      return;
    }
    let newTasks = [...tasks];
    let temp = newTasks[index];
    newTasks[index] = newTasks[index + 1];
    newTasks[index + 1] = temp;
    setTasks(newTasks);
  }
  function closeDialog() {
    setOpen(false);
    setEditIndex(-1);
    setEditTask(null);
  }
  return (
    <Container sx={{ mt: 4, mb: 10 }}>
      <Typography variant="h4" align="center" gutterBottom > Nihita's ToDo List</Typography>
      {!isMobile && (
        <Button variant="contained" startIcon={<AddIcon />} onClick={function () { setOpen(true); }} > Add Task </Button>
      )}
      <TaskTable tasks={tasks} deleteTask={deleteTask} openEdit={openEdit} moveUp={moveUp} moveDown={moveDown} isMobile={isMobile} />
      <TaskDialog open={open} handleClose={closeDialog} addTask={addTask} updateTask={updateTask} editTask={editTask} />
      {isMobile && (
        <Fab
          color="primary"
          sx={{ position: "fixed", bottom: 20, right: 20, }}
          onClick={function () {
            setOpen(true);
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </Container>
  );
}
export default App;