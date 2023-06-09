import React, { useState, useEffect, useCallback } from "react";
import Logo from "../../assets/Logo.png";
import Or from "../../assets/or.png";
import { NavLink } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import {
  auth,
  googleProvider,
  facebookProvider,
  githubProvider,
} from "../../db/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import IntroText from "../../components/IntroText";
import Todo from "../../assets/todo.svg";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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
          setLoading(false);
          memoizedNavigate("/");
        } else {
          setLoading(false);
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

  const HandleGoogleSignUp = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        memoizedNavigate("/", { user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const HandleFacebookSignUp = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        memoizedNavigate("/", { user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const HandleGithubSignUp = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        memoizedNavigate("/", { user });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="Login">
          <div className="Login_middle">
            <IntroText
              imgLogo={Todo}
              text="Register for the ultimate Todo App"
              subtitle="our web-based todo app is the ultimate task management tool. With the ability to organize your tasks in one place, get up-to-date weather data for your city and other cities, and login using various means, our app is designed to make your life easier."
            />
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
                  <div className="password_show">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input_entry"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <div
                      className="eye_icon"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </div>
                  </div>
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
                <div className="google" onClick={HandleGoogleSignUp}>
                  <p className="text_size">
                    <FcGoogle />
                  </p>
                </div>
                <div className="facebook" onClick={HandleFacebookSignUp}>
                  <p className="text_size">
                    <FaFacebookF />
                  </p>
                </div>
                <div className="facebook" onClick={HandleGithubSignUp}>
                  <p className="text_size">
                    <BsGithub />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(SignUp);
