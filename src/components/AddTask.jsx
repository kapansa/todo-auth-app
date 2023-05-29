import React from "react";

const AddTask = ({
  update,
  HandleUpdate,
  newUpdate,
  setNewUpdate,
  HandleSubmit,
  setTask,
  task,
}) => {
  return (
    <div>
      {update ? (
        <form onSubmit={HandleUpdate} className="add">
          <input
            type="text"
            className="add_todo"
            placeholder="What is your next task..."
            onChange={(e) => setNewUpdate(e.target.value)}
            value={newUpdate}
            required
          />
          <input type="submit" className="add_btn" value="Update" />
        </form>
      ) : (
        <form onSubmit={HandleSubmit} className="add">
          <input
            type="text"
            className="add_todo"
            placeholder="What is your next task..."
            onChange={(e) => setTask(e.target.value)}
            value={task}
            required
          />
          <input type="submit" className="add_btn" value="Add" />
        </form>
      )}
    </div>
  );
};

export default AddTask;
