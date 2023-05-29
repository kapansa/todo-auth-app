import React from "react";
import Person from "../assets/person.avif";
import { BiEdit } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const UserDetails = ({ userDetails, HandleSignOut, HandleUserEdit }) => {
  return (
    <div className="person">
      <div>
        <div className="user">
          <div>
            {userDetails?.photoURL !== null ? (
              <img src={`${userDetails?.photoURL}`} alt="profile" />
            ) : (
              <img src={Person} alt="profile" />
            )}
          </div>
          <div>
            <h2>{userDetails?.displayName}</h2>
            <p>{userDetails?.email}</p>
          </div>
        </div>
        <div className="profile_edit">
          <div className="logout">
            <p onClick={HandleSignOut}>Logout</p>
          </div>
          <div className="logout">
            <NavLink to="/user/edit">
              <p onClick={HandleUserEdit}>
                <BiEdit /> Edit Name
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
