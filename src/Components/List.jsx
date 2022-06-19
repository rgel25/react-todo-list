import React from "react";

export default function List(props) {
  const [showEditFields, setShowEditFields] = React.useState({
    id: "",
    show: false,
  });
  const [editTask, setEditTask] = React.useState({
    id: "",
    taskName: "",
    taskDate: "",
    taskCompleted: false,
  });
  function taskCompleted(e) {
    props.handleEditTaskCompleted(e.target.closest(".list--task").dataset.id);
  }

  function formatDate(date) {
    // prettier-ignore
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const toFormat = new Date(date);
    const formatedDate = `${
      month[toFormat.getMonth()]
    } ${toFormat.getDate()}, ${toFormat.getFullYear()}`;
    const standardDate = new Date(date);
    const calcDaysPassed = (date1, date2) =>
      Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
    const daysPassed = calcDaysPassed(new Date(), standardDate);

    if (daysPassed > 2) return formatedDate;
    if (daysPassed === 1) return "Tomorrow";
    if (daysPassed === 0) return "Today";
    if (daysPassed === -1) return "Yesterday";
    if (daysPassed >= -7) return `${Math.abs(daysPassed)} days ago`;
    else {
      return formatedDate;
    }
  }

  function renderEditFields(e, taskName, taskDate) {
    const id = e.target.closest(".list--task").dataset.id;
    setShowEditFields((prevShowEditFields) => ({
      id: id,
      show: !prevShowEditFields.show,
    }));
    const date = new Date(taskDate);
    setEditTask((editTask) => ({
      ...editTask,
      id: id,
      taskName: taskName,
      taskDate: date.toISOString().split("T")[0],
    }));
  }

  function editCancel() {
    setShowEditFields({
      id: "",
      show: false,
    });
    setEditTask({
      id: "",
      taskName: "",
      taskDate: "",
      taskCompleted: false,
    });
  }

  function handleEditChange(e) {
    const id = e.target.closest(".list--task").dataset.id;
    const { name, value } = e.target;
    setEditTask((editTask) => ({
      ...editTask,
      id: id,
      [name]: value,
    }));
  }

  function editTaskBody(e) {
    e.preventDefault();
    props.handleEditTaskBody(editTask.id, editTask.taskName, editTask.taskDate);
    editCancel();
  }

  function deleteTask(e) {
    props.handleDeleteTask(e.target.closest(".list--task").dataset.id);
  }

  const tasksElements = props.tasks.map((task) => (
    <li
      key={task.id}
      data-id={task.id}
      className={`list--task ${
        task.taskCompleted ? "list--task--completed" : ""
      }`}
    >
      <form onSubmit={editTaskBody} className="list--form">
        <div className="round">
          <input
            id={task.id}
            className="list--checkbox"
            type="checkbox"
            name="taskCompleted"
            onChange={taskCompleted}
            checked={task.taskCompleted}
          />
          <label htmlFor={task.id}></label>
        </div>
        <div className="list--body">
          {showEditFields.show && task.id === showEditFields.id ? (
            <input
              id="task--name"
              type="text"
              name="taskName"
              value={editTask.taskName}
              onChange={handleEditChange}
            />
          ) : (
            <p>{task.taskName}</p>
          )}
          {showEditFields.show && task.id === showEditFields.id ? (
            <input
              type="date"
              name="taskDate"
              value={editTask.taskDate}
              onChange={handleEditChange}
            />
          ) : (
            <p className="list--date">{formatDate(task.taskDate)}</p>
          )}
        </div>
        <div className="list--actions">
          {showEditFields.show && task.id === showEditFields.id ? (
            <>
              <button type="submit" className="list--save">
                Save
              </button>
              <span onClick={editCancel}>Cancel</span>
            </>
          ) : (
            !task.taskCompleted && (
              <span
                onClick={(e) =>
                  renderEditFields(e, task.taskName, task.taskDate)
                }
              >
                <i className="fa-solid fa-pencil"></i>
              </span>
            )
          )}
          <span onClick={deleteTask}>
            <i className="fa-solid fa-xmark list--delete"></i>
          </span>
        </div>
      </form>
    </li>
  ));

  return <ul className="task--list">{tasksElements.reverse()}</ul>;
}
