import React, { useState, useEffect } from "react";
import "./Home.css";
import Person from "../../assets/person.avif";
import { MdDelete } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import WeatherData from "../../components/WeatherData";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../db/firebase";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
// import Logo from "../../assets/Logo.png";

export const Home = ({ user }) => {
  const [task, setTask] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      });
    };

    getUser();
  }, [navigate, isAuthenticated]);

  const HandleSignOut = async () => {
    await signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Loading />
      ) : (
        <div className="Home">
          <div className="content">
            <div className="left">
              <div className="person">
                <div>
                  <div className="user">
                    <img src={Person} alt="profile" />
                    <div>
                      <h2>{user?.displayName}</h2>
                      <p>{user?.email}</p>
                    </div>
                  </div>
                  <div className="logout">
                    <p onClick={HandleSignOut}>Logout</p>
                  </div>
                </div>
              </div>
              <div className="weather">
                <WeatherData />
              </div>
            </div>
            <div className="right">
              <h2>What Activities do you have today?</h2>
              <div className="todo_input">
                <div>
                  <form onSubmit={HandleSubmit} className="add">
                    <input
                      type="text"
                      className="add_todo"
                      placeholder="What is your next task..."
                      onChange={(e) => setTask(e.target.value)}
                      value={task}
                    />
                    <input type="submit" className="add_btn" value="Add" />
                  </form>
                </div>
                <div className="todo_items">
                  <div className="item">
                    <p>This is a todo item number 1.</p>
                    <div className="operations">
                      <div className="delete">
                        <MdDelete />
                      </div>
                      <div className="edit">
                        <BiEdit />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <p>This is a todo item number 1.</p>
                    <div className="operations">
                      <div className="delete">
                        <MdDelete />
                      </div>
                      <div className="edit">
                        <BiEdit />
                      </div>
                    </div>
                  </div>
                  <div className="item">
                    <p>This is a todo item number 1.</p>
                    <div className="operations">
                      <div className="delete">
                        <MdDelete />
                      </div>
                      <div className="edit">
                        <BiEdit />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(Home);
