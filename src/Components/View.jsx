import React from "react";

export default function View(props) {
  function changeView(e) {
    props.handleView(e.target.dataset.view);
  }
  return (
    <div className="view--wrapper">
      <div className="views">
        <span
          className={`view ${props.view === "all" && "view--active"}`}
          data-view="all"
          onClick={changeView}
        >
          All
        </span>
        <span
          className={`view ${props.view === "active" && "view--active"}`}
          data-view="active"
          onClick={changeView}
        >
          Active
        </span>
        <span
          className={`view ${props.view === "completed" && "view--active"}`}
          data-view="completed"
          onClick={changeView}
        >
          Completed
        </span>
      </div>
    </div>
  );
}
