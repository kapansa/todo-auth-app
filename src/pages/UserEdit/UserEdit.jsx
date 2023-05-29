import React, { useCallback, useState } from "react";
import "./UserEdit.css";
import { updateProfile } from "firebase/auth";
import { auth } from "../../db/firebase";
import { useNavigate } from "react-router-dom";

const UserEdit = () => {
  const [displayName, setDisplayName] = useState("");
  //   const [photoURL, setPhotoURL] = useState("");

  const navigate = useNavigate();

  const HandleUserEdit = useCallback(
    async (e) => {
      e.preventDefault();
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        // photoURL: photoURL,
      })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    [displayName, navigate]
  );

  return (
    <div className="Login">
      <div className="Login_middle">
        <div className="login_in">
          <h2 className="title">Update Name</h2>
          <div className="form_input">
            <form onSubmit={HandleUserEdit}>
              <input
                type="text"
                className="input_entry"
                placeholder="Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
              {/* <input
                type="text"
                className="input_entry"
                placeholder="Photo URL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                required
              /> */}
              <button type="submit" className="btn">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(UserEdit);
