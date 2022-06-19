import React from "react";
import Form from "./Components/Form";
import List from "./Components/List";
import View from "./Components/View";
// import Header from "./Components/Header";

export default function App() {
  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(tasks));
  }, [tasks]);
  const [view, setView] = React.useState("all");

  function addNewTask(task) {
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  function editTaskCompleted(id) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, taskCompleted: !task.taskCompleted };
        } else return task;
      });
    });
  }

  function editTaskBody(id, taskName, taskDate) {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            taskName: taskName,
            taskDate: taskDate,
          };
        } else return task;
      });
    });
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function setListView(string) {
    setView(string);
  }

  let filteredTasks;
  if (view === "all") filteredTasks = tasks;
  if (view === "active")
    filteredTasks = tasks.filter((task) => !task.taskCompleted);
  if (view === "completed")
    filteredTasks = tasks.filter((task) => task.taskCompleted);

  return (
    <div className="container">
      <main className="app--wrapper">
        <Form handleAddNewTask={addNewTask} />
        <List
          tasks={filteredTasks}
          handleEditTaskCompleted={editTaskCompleted}
          handleEditTaskBody={editTaskBody}
          handleDeleteTask={deleteTask}
        />
        <View handleView={setListView} view={view} />
      </main>
    </div>
  );
}
