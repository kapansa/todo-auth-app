import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./db/firebase";
import { useNavigate } from "react-router-dom";

function App() {
  
  const [userDetails, setUserDetails] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserDetails(user);
        }
      });
    };
    checkUser();
  }, [navigate]);

  return (
    <Routes>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route
        exact
        path="/"
        element={<Home user={userDetails} />}
      />
    </Routes>
  );
}

export default App;
