import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";
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
import ShowTasks from "../../components/ShowTasks";
import AddTask from "../../components/AddTask";
import UserDetails from "../../components/UserDetails";

const Home = ({ tasks, setTasks }) => {
  const [task, setTask] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [newUpdate, setNewUpdate] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          setUserDetails(user);
          setIsAuthenticated(true);
          // memoizedNavigate("/");
        } else {
          memoizedNavigate("/login");
        }
      });
    };
    getUser();
  }, [memoizedNavigate]);

  const HandleSignOut = useCallback(async () => {
    await signOut(auth)
      .then(() => {
        setTask("");
        setUpdate(false);
        setUpdateId("");
        setNewUpdate("");
        setUserDetails({});
        setIsAuthenticated(false);
        setTasks([]);
        memoizedNavigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setTasks, memoizedNavigate]);

  const HandleUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      const taskRef = doc(db, "tasks", `${updateId}`);
      await updateDoc(taskRef, {
        task: newUpdate,
      });
      const updatedTasks = tasks.map((task) => {
        if (task.id === updateId) {
          return { ...task, task: newUpdate };
        }
        return task;
      });
      setTasks(updatedTasks);
      setTask("");
      setNewUpdate("");
      setUpdate(false);
    },
    [newUpdate, tasks, setTasks, updateId]
  );

  const HandleUpdateData = useCallback(async (id, oldTask) => {
    setUpdate(true);
    setUpdateId(id);
    setNewUpdate(oldTask);
  }, []);

  const HandleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const newTask = {
          task: task,
          userId: userDetails?.uid,
        };
        const doc = await addDoc(collection(db, "tasks"), newTask);
        setTasks([{ ...newTask, id: doc.id }, ...tasks]);
        setTask("");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    [tasks, setTasks, task, userDetails?.uid]
  );

  const HandleDeleteTask = useCallback(
    async (id) => {
      await deleteDoc(doc(db, "tasks", `${id}`));
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
    },
    [setTasks, tasks]
  );

  return (
    <div>
      {!isAuthenticated ? (
        <Loading />
      ) : (
        <div className="Home">
          <div className="content">
            <div className="left">
              <UserDetails
                userDetails={userDetails}
                HandleSignOut={HandleSignOut}
              />
              <WeatherData />
            </div>
            <div className="right">
              <h2>What Activities do you have today?</h2>
              <div className="todo_input">
                <AddTask
                  update={update}
                  HandleUpdate={HandleUpdate}
                  newUpdate={newUpdate}
                  setNewUpdate={setNewUpdate}
                  HandleSubmit={HandleSubmit}
                  setTask={setTask}
                  task={task}
                />
                <ShowTasks
                  tasks={tasks}
                  HandleDeleteTask={HandleDeleteTask}
                  HandleUpdateData={HandleUpdateData}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Home);
