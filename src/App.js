import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./db/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

const App = () => {
  const [userDetails, setUserDetails] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          let newTasts = [];
          const q = query(
            collection(db, "tasks"),
            where("userId", "==", `${user?.uid}`)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            newTasts.push({ data: doc.data(), id: doc.id });
          });
          setTasks(newTasts);
          setIsAuthenticated(true);
          setUserDetails(user);
        }
      });
    };
    checkUser();
  }, [memoizedNavigate]);

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route
        exact
        path="/"
        element={
          <Home
            user={userDetails}
            tasks={tasks}
            isAuthenticated={isAuthenticated}
          />
        }
      />
    </Routes>
  );
}

export default React.memo(App);
