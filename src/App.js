import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import UserEdit from "./pages/UserEdit/UserEdit";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./db/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const navigate = useNavigate();

  const memoizedNavigate = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  useEffect(() => {
    const checkUser = async () => {
      await onAuthStateChanged(auth, async (user) => {
        if (user) {
          const q = query(
            collection(db, "tasks"),
            where("userId", "==", `${user?.uid}`),
            orderBy("createdAt", "desc")
          );
          const querySnapshot = await getDocs(q);
          const filteredData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTasks(filteredData);
        }
      });
    };
    checkUser();
  }, [memoizedNavigate]);

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/user/edit" element={<UserEdit />} />
      <Route exact path="/forgotpassword" element={<ForgotPassword />} />
      <Route
        exact
        path="/"
        element={<Home tasks={tasks} setTasks={setTasks} />}
      />
    </Routes>
  );
};

export default React.memo(App);
