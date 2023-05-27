import React, { useState, useEffect, useCallback } from "react";
import Logo from "../../assets/Logo.png";
import Or from "../../assets/or.png";
import { NavLink } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../db/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          memoizedNavigate("/signup");
        }
      });
    };
    getUser();
  }, [memoizedNavigate]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        memoizedNavigate("/", { userCredential });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div className="Login">
      <div className="Login_middle">
        <div className="login_in">
          <img src={Logo} className="logo" alt="Todo_logo" />
          <h2 className="title">Register</h2>
          <div className="form_input">
            <form onSubmit={HandleSubmit}>
              <input
                type="email"
                className="input_entry"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="input_entry"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn">
                Sign Up
              </button>
            </form>
            <p className="text_size no_account">
              Already have an account?{" "}
              <NavLink className="SignUp_link" to="/Login">
                Login
              </NavLink>
            </p>
            <div className="Line_divide">
              <img src={Or} alt="Todo_logo" />
            </div>
            {/* <p className="text_size or">or</p> */}
          </div>
          <p className="text_size login_with">Create an account with</p>
          <div className="social_login">
            <div className="google">
              <p className="text_size">
                <FcGoogle />
              </p>
            </div>
            <div className="facebook">
              <p className="text_size">
                <FaFacebookF />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(SignUp);
