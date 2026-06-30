import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem,} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function TaskDialog(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("Medium");
  const [nameError, setNameError] = useState("");
  useEffect(function () {
    if (props.editTask) {
      setName(props.editTask.name);
      setDescription(props.editTask.description);
      setPriority(props.editTask.priority);
      if (props.editTask.date !== "") {
        setDate(dayjs(props.editTask.date, "DD/MM/YYYY"));
      } else {
        setDate(null);
      }
    } else {
      setName("");
      setDescription("");
      setDate(null);
      setPriority("Medium");
    }
    setNameError("");
    }, [props.editTask, props.open]);
  function saveTask() {
    if (name.trim() === "") {
      setNameError("Task Name is required");
      return;
    }
    let task = { name: name, description: description, date: date ? date.format("DD/MM/YYYY") : "", priority: priority, };
    if (props.editTask) {
      props.updateTask(task);
    } else {
      props.addTask(task);
    }
    props.handleClose();
  }
  return (
    <Dialog open={props.open} onClose={props.handleClose} fullWidth >
      <DialogTitle> {props.editTask ? "Edit Task" : "Add New Task"} </DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="normal" label="Task Name" value={name} error={nameError !== ""} helperText={nameError}
            onChange={function (event) {
            setName(event.target.value);
            if (event.target.value.trim() !== "") {
              setNameError("");
            }
          }} />
        <TextField fullWidth margin="normal" multiline rows={3} label="Description" value={description} onChange={function (event) { setDescription(event.target.value); }} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Select Date" format="DD/MM/YYYY" value={date}
            onChange={function (newDate) {
              setDate(newDate);
            }}
            sx={{ width: "100%", mt: 2, }} />
        </LocalizationProvider>
        <TextField select fullWidth margin="normal" label="Priority" value={priority} onChange={function (event) { setPriority(event.target.value); }} >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}> Cancel </Button>
        <Button variant="contained" onClick={saveTask} > {props.editTask ? "Update" : "Save"}      </Button>
      </DialogActions>
    </Dialog>
  );
}
export default TaskDialog;