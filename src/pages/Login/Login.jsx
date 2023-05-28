import React, { useState, useEffect, useCallback } from "react";
import "./Login.css";
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
  signInWithEmailAndPassword,
  onAuthStateChanged,
  // signInWithPopup,
  signInWithRedirect
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

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
        }
      });
    };
    getUser();
  }, [memoizedNavigate]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setErrorMessage(null);
        memoizedNavigate("/", { userCredential });
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (error.code === "auth/user-not-found") {
          setErrorMessage("User was not found.");
        } else if (error.code === "auth/wrong-password") {
          setErrorMessage("The password is incorrect.");
        } else {
          setErrorMessage(
            "an error occurred while logging you in. Please try again."
          );
        }
        console.log(errorMessage);
      });
  };

  const HandleGoogleSignUp = () => {
    signInWithRedirect(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        memoizedNavigate("/", { user });
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          setErrorMessage(
            "An account already exists with the same email address but different credentials"
          );
        } else {
          setErrorMessage(
            "an error occurred while logging you in. Please try again."
          );
        }
        console.log(errorMessage);
      });
  };

  const HandleFacebookSignUp = () => {
    signInWithRedirect(auth, facebookProvider)
      .then((result) => {
        const user = result.user;
        memoizedNavigate("/", { user });
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          setErrorMessage(
            "An account already exists with the same email address but different credentials"
          );
        } else {
          setErrorMessage(
            "an error occurred while logging you in. Please try again."
          );
        }
        console.log(errorMessage);
      });
  };

  const HandleGithubSignUp = () => {
    signInWithRedirect(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        memoizedNavigate("/", { user });
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential") {
          setErrorMessage(
            "An account already exists with the same email address but different credentials"
          );
        } else {
          setErrorMessage(
            "an error occurred while logging you in. Please try again."
          );
        }
        console.log(errorMessage);
      });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="Login">
          <div className="Login_middle">
            <div className="login_in">
              <img src={Logo} className="logo" alt="Todo_logo" />
              <h2 className="title">Login</h2>
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
                  {errorMessage && (
                    <p className="error_message">{errorMessage}</p>
                  )}
                  <button type="submit" className="btn">
                    Login
                  </button>
                </form>
                <p className="text_size no_account">
                  Don't have an account?{" "}
                  <NavLink className="SignUp_link" to="/SignUp">
                    Sign Up
                  </NavLink>
                </p>
                <div className="Line_divide">
                  <img src={Or} alt="Todo_logo" />
                </div>
                {/* <p className="text_size or">or</p> */}
              </div>
              <p className="text_size login_with">Login with</p>
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

export default React.memo(Login);
