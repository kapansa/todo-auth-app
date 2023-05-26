import React from "react";
import "./Login.css";
import Logo from "../../assets/Logo.png";
import Or from "../../assets/or.png";
import { NavLink } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  return (
    <div className="Login">
      <div className="Login_middle">
        <div className="login_in">
          <img src={Logo} className="logo" alt="Todo_logo" />
          <h2 className="title">Login</h2>
          <div className="form_input">
            <input type="email" className="input_entry" placeholder="email" />
            <input
              type="password"
              className="input_entry"
              placeholder="password"
            />
            <button className="btn">Login</button>
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

export default Login;
