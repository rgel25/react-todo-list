import React from "react";
import { nanoid } from "nanoid";

export default function Form(props) {
  const [addDateInput, setAddDateInput] = React.useState(false);
  const [newTask, setNewTask] = React.useState({
    id: nanoid(),
    taskName: "",
    taskDate: "",
    taskCompleted: false,
  });

  function toggleDateInput(e) {
    e.preventDefault();
    setAddDateInput((prevAddDateInput) => !prevAddDateInput);
    addDateInput &&
      setNewTask((prevNewTask) => ({
        ...prevNewTask,
        taskDate: "",
      }));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNewTask((prevNewTask) => ({
      ...prevNewTask,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!newTask.taskDate) newTask.taskDate = Date.now();
    props.handleAddNewTask(newTask);
    setNewTask({
      id: nanoid(),
      taskName: "",
      taskDate: "",
      taskCompleted: false,
    });
    setAddDateInput(false);
  }

  function formatDate(date) {
    // prettier-ignore
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const toFormat = new Date(date);
    const formatedDate = `${
      month[toFormat.getMonth()]
    } ${toFormat.getDate()}, ${toFormat.getFullYear()}`;
    return formatedDate;
  }

  return (
    <section className="form--wrapper">
      <form className="form form--new--task" onSubmit={handleSubmit}>
        <input
          className="input--task"
          type="text"
          autoComplete="off"
          placeholder="Enter task here"
          onChange={handleChange}
          name="taskName"
          value={newTask.taskName}
        />
        <div className="form--date">
          <a className="add--date" href="/" onClick={toggleDateInput}>
            {addDateInput ? "Remove" : "Add"} Date
          </a>
          {addDateInput ? (
            <input
              type="date"
              onChange={handleChange}
              name="taskDate"
              value={newTask.taskDate}
            />
          ) : (
            <span>{formatDate(Date.now())}</span>
          )}
        </div>
        <button type="submit" className="btn--submit--task">
          Add Task
        </button>
      </form>
    </section>
  );
}
