import React, { useCallback, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../db/firebase";
import Logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [empty, setEmpty] = useState(false);

  const HandleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (email.trim() === "") {
        setEmpty(true);
      } else {
        sendPasswordResetEmail(auth, email.trim())
          .then(() => {
            setSuccess(true);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    },
    [email]
  );
  return (
    <div>
      {success ? (
        <div className="Login">
          <div className="Login_middle">
            <div className="login_in">
              <h2 className="title">Check Your Email</h2>
              <p>
                A reset link has been sent to <span>{email}</span>
              </p>
              <NavLink className="reset" to="/login">Login</NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="Login">
          <div className="Login_middle">
            <div className="login_in">
              <img src={Logo} className="logo" alt="Todo_logo" />
              <h2 className="title">Reset Password</h2>
              <div className="form_input">
                <form onSubmit={HandleSubmit}>
                  <input
                    type="email"
                    className="input_entry"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {empty && <p>PLease enter a valid email!</p>}
                  <button type="submit" className="btn">
                    Reset Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
