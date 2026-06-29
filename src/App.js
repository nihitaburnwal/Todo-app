import { useState, useEffect } from "react";
import { Container, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskDialog from "./TaskDialog";
import TaskTable from "./TaskTable";

function App() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editTask, setEditTask] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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

  function addTask(task) {
    let newTasks = [...tasks];
    newTasks.push(task);
    setTasks(newTasks);
  }

  function deleteTask(index) {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
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
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom> Nihita's ToDo List</Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={function () { setOpen(true); }}> Add Task</Button>
      <TaskTable tasks={tasks} deleteTask={deleteTask} openEdit={openEdit} moveUp={moveUp} moveDown={moveDown}/>
      <TaskDialog open={open} handleClose={closeDialog} addTask={addTask} updateTask={updateTask} editTask={editTask}/>
    </Container>
  );
}

export default App;