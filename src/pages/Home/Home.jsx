import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";
import Person from "../../assets/person.avif";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import WeatherData from "../../components/WeatherData";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../db/firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const Home = ({ user, isAuthenticated, tasks }) => {
  const [task, setTask] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [newUpdate, setNewUpdate] = useState("");

  const navigate = useNavigate();

  const memoizedNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    const getUser = async () => {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          memoizedNavigate("/");
        } else {
          memoizedNavigate("/login");
        }
      });
    };
    getUser();
  }, [memoizedNavigate]);

  const HandleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        memoizedNavigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleUpdate = async (e) => {
    e.preventDefault();
    const taskRef = doc(db, "tasks", `${updateId}`);
    await updateDoc(taskRef, {
      task: newUpdate,
    });
  };

  const HandleUpdateData = async (id, oldTask) => {
    setUpdate(true);
    setUpdateId(id);
    setNewUpdate(oldTask);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), {
        task: task,
        userId: user?.uid,
      });
      setTask("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const HandleDeleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", `${id}`));
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Loading />
      ) : (
        <div className="Home">
          <div className="content">
            <div className="left">
              <div className="person">
                <div>
                  <div className="user">
                    <img src={Person} alt="profile" />
                    <div>
                      <h2>{user?.displayName}</h2>
                      <p>{user?.email}</p>
                    </div>
                  </div>
                  <div className="logout">
                    <p onClick={HandleSignOut}>Logout</p>
                  </div>
                </div>
              </div>
              <div className="weather">
                <WeatherData />
              </div>
            </div>
            <div className="right">
              <h2>What Activities do you have today?</h2>
              <div className="todo_input">
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
                {console.log(tasks)}
                <div className="todo_items">
                  {tasks.map((task) => (
                    <div className="item" key={task?.id}>
                      <p>{task?.data?.task}</p>
                      <div className="operations">
                        <div
                          className="delete"
                          onClick={() => HandleDeleteTask(task?.id)}
                        >
                          <MdDelete />
                        </div>
                        <div
                          className="edit"
                          onClick={() =>
                            HandleUpdateData(task?.id, task?.data?.task)
                          }
                        >
                          <BiEdit />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Home);
