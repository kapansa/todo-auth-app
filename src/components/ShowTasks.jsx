import React from "react";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

const ShowTasks = ({ tasks, HandleDeleteTask, HandleUpdateData }) => {
  return (
    <div className="todo_items">
      <div className="scroll-view-content">
        {tasks.map((task) => (
          <div className="item" key={task?.id}>
            <p>{task?.task}</p>
            <div className="operations">
              <div
                className="delete"
                onClick={() => HandleDeleteTask(task?.id)}
              >
                <MdDelete />
              </div>
              <div
                className="edit"
                onClick={() => HandleUpdateData(task?.id, task?.task)}
              >
                <BiEdit />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowTasks;
